// Colores de los tiros en la demo: los mismos del plano operativo del software.
export const COLORES = {
  alivio: { relleno: '#ffffff', borde: '#0f172a' },
  rainura: { relleno: '#ffffff', borde: '#0f172a' },
  zapatera: { relleno: '#2563eb', borde: '#1e3a8a' },
  corona: { relleno: '#dc2626', borde: '#7f1d1d' },
  caja: { relleno: '#16a34a', borde: '#14532d' },
  auxiliar: { relleno: '#16a34a', borde: '#14532d' },
}

// Los auxiliares en la línea de la corona se dibujan como corona, igual que en el software.
export function colorTiro(t, altoLabor) {
  if (t.tipo === 'auxiliar' && t.y >= altoLabor / 2 - 0.05) return COLORES.corona
  return COLORES[t.tipo] || COLORES.auxiliar
}

export const NOMBRES = {
  alivio: 'Tiro de alivio',
  rainura: 'Rainura',
  zapatera: 'Zapatera',
  corona: 'Corona',
  caja: 'Caja',
  auxiliar: 'Auxiliar',
}
