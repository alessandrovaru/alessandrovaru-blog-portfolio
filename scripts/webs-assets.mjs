#!/usr/bin/env node
// Prepara las imágenes de la landing /paginas-web a partir de las capturas de
// las PLANTILLAS BASE en todos sus estilos (las saca scripts/capturar-bases.mjs
// en capturas/<base>/). Son webs genéricas: ningún negocio real sale aquí.
//
//   node scripts/webs-assets.mjs
//
// Deja en public/images/webs/:
//   atlas-<n>.webp   todas las pantallas en mosaicos de 2048 (para el mandala 3D)
//   destacadas/<base>-<estilo>.webp   la portada de cada estilo (para el carrusel)
//   portada-home.webp   el fondo del slide del home
// y src/app/(single-pages)/paginas-web/webs.json con el índice.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ORIGEN = path.join(RAIZ, 'capturas')
const SALIDA = path.join(RAIZ, 'public/images/webs')
const INDICE = path.join(RAIZ, 'src/app/(single-pages)/paginas-web/webs.json')

const FRANJA = 0 // las capturas ya salen sin la capa de demo
const ANCHO = 780
const ALTO = Math.round((ANCHO * 16) / 9) // 1387: una pantalla de teléfono

// Mosaico: 10 × 6 = 60 por atlas, a 204 × 341 (9:16 aprox.).
const ATLAS = 2048
const COL = 10
const FIL = 6
const TW = Math.floor(ATLAS / COL)
const TH = Math.floor(ATLAS / FIL)

const RUBROS = {
  'concesionarios-base': 'Concesionarios',
  'optica-base': 'Ópticas',
  'floristeria-base': 'Floristerías',
  'perfumeria-base': 'Perfumerías',
  'suplementos-base': 'Suplementos',
  'tecnologia-base': 'Tecnología',
  'odontologia-base': 'Odontología',
  'ceramicas-base': 'Cerámicas',
  'confeccion-base': 'Confección',
}

function portadas() {
  const lista = []
  for (const rubro of Object.keys(RUBROS)) {
    const dir = path.join(ORIGEN, rubro)
    if (!fs.existsSync(dir)) continue
    for (const archivo of fs.readdirSync(dir).filter((f) => f.endsWith('.jpg')).sort()) {
      const [estilo, n] = archivo.replace('.jpg', '').split('-')
      const interior = estilo === 'catalogo' || estilo === 'ficha'
      lista.push({ rubro, slug: `${rubro.replace('-base', '')}-${estilo}-${n}`, archivo: path.join(dir, archivo), destacada: !interior && n === '0' })
    }
  }
  return lista
}

// Recorte de una pantalla, sin la franja de la demo.
async function pantalla(archivo) {
  const img = sharp(archivo)
  const { width, height } = await img.metadata()
  const escala = ANCHO / width
  const alto = Math.min(ALTO, Math.floor(height * escala) - FRANJA)
  const ancho = await sharp(archivo).resize({ width: ANCHO }).toBuffer()
  const recorte = await sharp(ancho).extract({ left: 0, top: FRANJA, width: ANCHO, height: alto }).toBuffer()
  return sharp(recorte).resize({ width: ANCHO, height: ALTO, fit: 'cover', position: 'top' })
}

// Mezcla un orden fijo (no aleatorio: el mosaico no cambia entre corridas)
// para que los rubros no salgan en bloques.
function intercalar(lista) {
  const grupos = Object.keys(RUBROS).map((r) => lista.filter((x) => x.rubro === r))
  const total = lista.length
  const salida = []
  const cuotas = grupos.map((g) => g.length / total)
  const usados = grupos.map(() => 0)
  for (let i = 0; i < total; i++) {
    let mejor = -1
    let deuda = -Infinity
    grupos.forEach((g, k) => {
      if (usados[k] >= g.length) return
      const d = cuotas[k] * (i + 1) - usados[k]
      if (d > deuda) {
        deuda = d
        mejor = k
      }
    })
    salida.push(grupos[mejor][usados[mejor]++])
  }
  return salida
}

async function main() {
  fs.mkdirSync(path.join(SALIDA, 'destacadas'), { recursive: true })
  for (const f of fs.readdirSync(SALIDA)) if (/^atlas-\d+\.webp$/.test(f)) fs.rmSync(path.join(SALIDA, f))
  const todas = intercalar(portadas())
  if (!todas.length) throw new Error(`No hay portadas en ${ORIGEN}`)
  console.log(`${todas.length} pantallas`)

  // Atlas
  const porAtlas = COL * FIL
  const indice = []
  for (let a = 0; a * porAtlas < todas.length; a++) {
    const tanda = todas.slice(a * porAtlas, (a + 1) * porAtlas)
    tanda.forEach((p, i) => indice.push({ rubro: p.rubro, atlas: a, celda: i }))
    const capas = await Promise.all(
      tanda.map(async (p, i) => {
        const input = await sharp(await (await pantalla(p.archivo)).toBuffer()).resize({ width: TW, height: TH, fit: 'cover', position: 'top' }).toBuffer()
        return { input, left: (i % COL) * TW, top: Math.floor(i / COL) * TH }
      })
    )
    await sharp({ create: { width: ATLAS, height: ATLAS, channels: 3, background: '#0b0b0b' } })
      .composite(capas)
      .webp({ quality: 60 })
      .toFile(path.join(SALIDA, `atlas-${a}.webp`))
    console.log(`atlas-${a}.webp (${tanda.length})`)
  }

  // Destacadas: la portada de cada estilo, ya intercaladas por rubro.
  for (const f of fs.readdirSync(path.join(SALIDA, 'destacadas'))) fs.rmSync(path.join(SALIDA, 'destacadas', f))
  const destacadas = []
  for (const p of todas.filter((x) => x.destacada)) {
    const nombre = `${p.slug.replace(/-0$/, '')}.webp`
    await (await pantalla(p.archivo)).webp({ quality: 74 }).toFile(path.join(SALIDA, 'destacadas', nombre))
    destacadas.push({ src: `/images/webs/destacadas/${nombre}`, rubro: p.rubro })
  }
  console.log(`${destacadas.length} destacadas`)

  // Fondo del slide del home: un mosaico inclinado de pantallas.
  const muestra = todas.filter((_, i) => i % 3 === 0).slice(0, 48)
  const w = 300
  const h = Math.round((w * 16) / 9)
  const cols = 12
  const capas = await Promise.all(
    muestra.map(async (p, i) => ({
      input: await sharp(await (await pantalla(p.archivo)).toBuffer()).resize({ width: w, height: h }).toBuffer(),
      left: (i % cols) * (w + 24) + (Math.floor(i / cols) % 2 ? w / 2 : 0),
      top: Math.floor(i / cols) * (h + 24),
    }))
  )
  const lienzo = await sharp({ create: { width: cols * (w + 24) + w, height: 4 * (h + 24), channels: 3, background: '#0b0b0b' } })
    .composite(capas)
    .png()
    .toBuffer()
  await sharp(lienzo)
    .rotate(-12, { background: '#0b0b0b' })
    .resize({ width: 2400, height: 1500, fit: 'cover' })
    .modulate({ brightness: 0.55 }) // que el texto del slide se lea encima
    .webp({ quality: 70 })
    .toFile(path.join(SALIDA, 'portada-home.webp'))

  fs.mkdirSync(path.dirname(INDICE), { recursive: true })
  fs.writeFileSync(
    INDICE,
    JSON.stringify({ atlas: { tamano: ATLAS, columnas: COL, filas: FIL, cantidad: Math.ceil(todas.length / porAtlas) }, rubros: RUBROS, webs: indice, destacadas }, null, 1)
  )
  console.log('Listo.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
