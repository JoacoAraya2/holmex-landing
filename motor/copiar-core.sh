#!/usr/bin/env bash
# Copia el núcleo de cálculo desde Holmex-RS y compila el motor de la demo.
# Uso: ./motor/copiar-core.sh /ruta/a/Holmex-RS
set -euo pipefail
origen="$1/src-tauri/src/core"
dir="$(cd "$(dirname "$0")" && pwd)"
rm -rf "$dir/core" && cp -r "$origen" "$dir/core"
echo '// Las pruebas del núcleo se ejecutan en el repositorio Holmex-RS.' > "$dir/core/tests.rs"
cd "$dir"
cargo test --release --lib pruebas
cargo build --release --target wasm32-unknown-unknown
cp target/wasm32-unknown-unknown/release/holmex_demo_motor.wasm ../worker/motor.wasm
echo 'Listo: worker/motor.wasm actualizado.'
