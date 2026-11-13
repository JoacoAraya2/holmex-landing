# Copia el núcleo de cálculo desde el repositorio Holmex-RS y compila el motor de la demo.
# Uso (PowerShell, desde la carpeta holmex-landing):
#   .\motor\copiar-core.ps1 -HolmexRS "C:\ruta\a\Holmex-RS"
# Requiere Rust con el destino WebAssembly:  rustup target add wasm32-unknown-unknown
param([Parameter(Mandatory = $true)][string]$HolmexRS)
$ErrorActionPreference = 'Stop'
$origen = Join-Path $HolmexRS 'src-tauri\src\core'
if (-not (Test-Path $origen)) { throw "No encuentro $origen" }
$destino = Join-Path $PSScriptRoot 'core'
if (Test-Path $destino) { Remove-Item $destino -Recurse -Force }
Copy-Item $origen $destino -Recurse
# Las pruebas del núcleo dependen del programa de escritorio; se ejecutan en Holmex-RS.
Set-Content (Join-Path $destino 'tests.rs') '// Las pruebas del núcleo se ejecutan en el repositorio Holmex-RS.'
Push-Location $PSScriptRoot
cargo test --release --lib pruebas
cargo build --release --target wasm32-unknown-unknown
Pop-Location
Copy-Item (Join-Path $PSScriptRoot 'target\wasm32-unknown-unknown\release\holmex_demo_motor.wasm') (Join-Path $PSScriptRoot '..\worker\motor.wasm') -Force
Write-Host 'Listo: worker\motor.wasm actualizado. Publique con: npm run build; npx wrangler deploy'
