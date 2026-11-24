#!/usr/bin/env node
// Prepara las imágenes de la landing /paginas-web a partir de las capturas de
// las demos (estudio de video del monorepo: apps/video/public/<rubro>/<slug>/web/portada.jpg).
//
//   node scripts/webs-assets.mjs [--origen <ruta a apps/video/public>]
//
// Deja en public/images/webs/:
//   atlas-<n>.webp   todas las portadas en mosaicos de 2048 (para el mandala 3D)
//   destacadas/<slug>.webp   las elegidas, más grandes (para el carrusel)
//   portada-home.webp   el fondo del slide del home
// y src/app/(single-pages)/paginas-web/webs.json con el índice.
//
// Las capturas traen arriba la franja de la demo («DEMO $740 $449»): se recorta.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const arg = (n) => {
  const i = process.argv.indexOf(`--${n}`)
  return i >= 0 ? process.argv[i + 1] : undefined
}
const ORIGEN = arg('origen') ?? path.join(process.env.HOME, 'projects/vektor/monorepo/apps/video/public')
const SALIDA = path.join(RAIZ, 'public/images/webs')
const INDICE = path.join(RAIZ, 'src/app/(single-pages)/paginas-web/webs.json')

const FRANJA = 80 // alto de la franja de demo en las capturas (a 2x)
const ANCHO = 780
const ALTO = Math.round((ANCHO * 16) / 9) // 1387: una pantalla de teléfono

// Mosaico: 10 × 6 = 60 por atlas, a 204 × 341 (9:16 aprox.).
const ATLAS = 2048
const COL = 10
const FIL = 6
const TW = Math.floor(ATLAS / COL)
const TH = Math.floor(ATLAS / FIL)

const RUBROS = {
  concesionarios: 'Concesionarios',
  opticas: 'Ópticas',
  floristerias: 'Floristerías',
  odontologia: 'Odontología',
  tecnologia: 'Tecnología',
}

// Las del carrusel: variedad de estilos y rubros, elegidas a ojo.
const DESTACADAS = [
  'concesionarios/3bmotor',
  'floristerias/laflorindaa',
  'opticas/optica-dayglass',
  'concesionarios/apmaquinas',
  'floristerias/clavelleoficial',
  'concesionarios/autos-8va-estrel',
  'opticas/optica-zay',
  'concesionarios/kadi-valencia',
  'floristerias/applerose-ccs',
  'odontologia/clinica-odontolo',
  'concesionarios/toyolandia',
  'opticas/optica-francia',
  'concesionarios/anthocars1800',
  'floristerias/detallesyfloresccs',
  'concesionarios/blindadora-luxur',
  'opticas/optica-lunettes',
  'concesionarios/goatmotorsve',
  'floristerias/floresccs',
  'tecnologia/servicio-tecnico',
  'concesionarios/autoalvarez',
  'opticas/opticas-optiahorro',
  'concesionarios/carlos-la-maquin',
  'odontologia/centro-odontolog',
  'concesionarios/leonardobrigati',
]

function portadas() {
  const lista = []
  for (const rubro of Object.keys(RUBROS)) {
    const dir = path.join(ORIGEN, rubro)
    if (!fs.existsSync(dir)) continue
    for (const slug of fs.readdirSync(dir).sort()) {
      const archivo = path.join(dir, slug, 'web/portada.jpg')
      if (fs.existsSync(archivo)) lista.push({ rubro, slug, archivo })
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
  const todas = intercalar(portadas())
  if (!todas.length) throw new Error(`No hay portadas en ${ORIGEN}`)
  console.log(`${todas.length} portadas`)

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

  // Destacadas
  const destacadas = []
  for (const id of DESTACADAS) {
    const p = todas.find((x) => `${x.rubro}/${x.slug}`.startsWith(id))
    if (!p) {
      console.warn(`  sin captura: ${id}`)
      continue
    }
    const nombre = `${p.slug}.webp`
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

  const conteo = Object.fromEntries(Object.keys(RUBROS).map((r) => [r, todas.filter((x) => x.rubro === r).length]))
  fs.mkdirSync(path.dirname(INDICE), { recursive: true })
  fs.writeFileSync(
    INDICE,
    JSON.stringify({ total: todas.length, atlas: { tamano: ATLAS, columnas: COL, filas: FIL, cantidad: Math.ceil(todas.length / porAtlas) }, rubros: RUBROS, conteo, webs: indice, destacadas }, null, 1)
  )
  console.log('Listo.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
