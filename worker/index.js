// Worker de Cloudflare: sirve los videos de /media con soporte de peticiones parciales (Range).
// Safari e iPhone solo reproducen un video si el servidor responde 206 con el trozo pedido.
export default {
  async fetch(request, env) {
    const respuesta = await env.ASSETS.fetch(request)
    const rango = request.headers.get('Range')
    if (respuesta.status !== 200) return respuesta

    if (!rango) {
      const encabezados = new Headers(respuesta.headers)
      encabezados.set('Accept-Ranges', 'bytes')
      return new Response(respuesta.body, { status: 200, headers: encabezados })
    }

    const partes = /^bytes=(\d*)-(\d*)$/.exec(rango.trim())
    if (!partes || (partes[1] === '' && partes[2] === '')) return respuesta

    const datos = await respuesta.arrayBuffer()
    const total = datos.byteLength
    let inicio
    let fin
    if (partes[1] === '') {
      inicio = Math.max(total - Number(partes[2]), 0)
      fin = total - 1
    } else {
      inicio = Number(partes[1])
      fin = partes[2] === '' ? total - 1 : Math.min(Number(partes[2]), total - 1)
    }

    if (inicio >= total || inicio > fin) {
      return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${total}` } })
    }

    const encabezados = new Headers(respuesta.headers)
    encabezados.set('Accept-Ranges', 'bytes')
    encabezados.set('Content-Range', `bytes ${inicio}-${fin}/${total}`)
    encabezados.set('Content-Length', String(fin - inicio + 1))
    return new Response(datos.slice(inicio, fin + 1), { status: 206, headers: encabezados })
  },
}
