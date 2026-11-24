#!/usr/bin/env node
// Captura las PLANTILLAS BASE del monorepo (apps/clients/*-base) en todos sus
// estilos, en pantalla de teléfono, para el mandala de /paginas-web. Son webs
// genéricas, sin ningún negocio real: así la landing enseña el oficio sin
// exponer a nadie.
//
//   node scripts/capturar-bases.mjs [--monorepo ~/projects/vektor/monorepo] [--solo optica-base,floristeria-base]
//
// Por cada base: levanta su `next dev`, entra por la puerta, esconde la capa de
// demo (la misma limpieza que el revisor de diseño) y guarda en capturas/<base>/:
//   <estilo>-0..3.jpg   la portada de ese estilo, pantalla por pantalla
//   catalogo-0..1.jpg   el listado        ficha-0..1.jpg   una ficha
// capturas/ no va a git: lo que se publica son los atlas de webs-assets.mjs.

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import net from 'node:net'
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const arg = (n) => {
  const i = process.argv.indexOf(`--${n}`)
  return i >= 0 ? process.argv[i + 1] : undefined
}
const MONOREPO = path.resolve((arg('monorepo') ?? '~/projects/vektor/monorepo').replace(/^~/, os.homedir()))
const SALIDA = path.join(RAIZ, 'capturas')
const solo = arg('solo')?.split(',')

// Dónde está el listado y la ficha de cada línea (lo mismo que usa el video).
const RUTAS = {
  'concesionarios-base': { catalogo: '/vehiculos', ficha: '/vehiculo/' },
  'optica-base': { catalogo: '/monturas', ficha: '/montura/' },
  'floristeria-base': { catalogo: '/tienda', ficha: '/producto/' },
  'perfumeria-base': { catalogo: '/perfumes', ficha: '/perfume/' },
  'suplementos-base': { catalogo: '/tienda', ficha: '/producto/' },
  'tecnologia-base': { catalogo: '/tienda', ficha: '/producto/' },
  'odontologia-base': { catalogo: '/tratamientos', ficha: '/tratamiento/' },
  'ceramicas-base': { catalogo: '/tienda', ficha: '/producto/' },
  'confeccion-base': { catalogo: '/prendas', ficha: '/prenda/' },
}

// La limpieza de la capa de demo, tal cual la usa el revisor de diseño.
function capaDemo() {
  const fuente = fs.readFileSync(path.join(MONOREPO, '.claude/skills/diseno-de-demo/scripts/revisar.mjs'), 'utf8')
  const ini = fuente.indexOf('const CAPA_DEMO = `') + 'const CAPA_DEMO = `'.length
  const fin = fuente.indexOf('})();`;', ini) + '})();'.length
  return new Function('precios', 'return `' + fuente.slice(ini, fin) + '`')(['$449', '$740'])
}

function puertoLibre() {
  return new Promise((ok) => {
    const s = net.createServer().listen(0, () => {
      const { port } = s.address()
      s.close(() => ok(port))
    })
  })
}

function claveDe(carpeta) {
  const env = path.join(carpeta, '.env.local')
  if (fs.existsSync(env)) {
    const m = fs.readFileSync(env, 'utf8').match(/^[ \t]*DEMO_PASSWORD[ \t]*=[ \t]*["']?([^"'\n]*)["']?/m)
    if (m?.[1].trim()) return m[1].trim()
  }
  const acceso = path.join(carpeta, 'libs/acceso.js')
  if (fs.existsSync(acceso)) {
    const m = fs.readFileSync(acceso, 'utf8').match(/CLAVE_POR_DEFECTO\s*=\s*["'`]([^"'`]+)["'`]/)
    if (m) return m[1]
  }
  return ''
}

async function esperar(url, ms = 180000) {
  const fin = Date.now() + ms
  while (Date.now() < fin) {
    try {
      const r = await fetch(url, { redirect: 'manual' })
      if (r.status < 500) return
    } catch {}
    await new Promise((r) => setTimeout(r, 1500))
  }
  throw new Error(`No levantó: ${url}`)
}

const pausa = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  process.env.LD_LIBRARY_PATH = [path.join(os.homedir(), '.cache/wadoom-pdf/lib'), process.env.LD_LIBRARY_PATH].filter(Boolean).join(':')
  const puppeteer = createRequire(path.join(MONOREPO, 'package.json'))('puppeteer-core')
  const CHROME = process.env.CHROME_PATH ?? path.join(os.homedir(), '.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell')
  const navegador = await puppeteer.launch({ executablePath: CHROME, args: ['--no-sandbox', '--hide-scrollbars'] })
  const limpieza = capaDemo()

  const bases = fs
    .readdirSync(path.join(MONOREPO, 'apps/clients'))
    .filter((d) => d.endsWith('-base') && RUTAS[d] && (!solo || solo.includes(d)))

  for (const base of bases) {
    const carpeta = path.join(MONOREPO, 'apps/clients', base)
    const estilos = Object.keys(JSON.parse(fs.readFileSync(path.join(carpeta, 'estilos.json'), 'utf8'))).filter((k) => !k.startsWith('_'))
    const puerto = await puertoLibre()
    const url = `http://localhost:${puerto}`
    console.log(`\n${base} (${estilos.join(', ')}) en ${url}`)
    const servidor = spawn('npx', ['next', 'dev', '--turbopack', '-p', String(puerto)], { cwd: carpeta, stdio: 'ignore', detached: true })
    try {
      await esperar(url)
      // La puerta
      let cookie = ''
      const r = await fetch(`${url}/api/entrar`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ clave: claveDe(carpeta) }), redirect: 'manual' })
      if (r.ok) cookie = (r.headers.getSetCookie?.() ?? []).map((g) => g.split(';')[0]).join('; ')

      const dir = path.join(SALIDA, base)
      fs.mkdirSync(dir, { recursive: true })
      const pagina = await navegador.newPage()
      await pagina.setViewport({ width: 390, height: 693, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
      await pagina.evaluateOnNewDocument(limpieza)
      if (cookie) await pagina.setExtraHTTPHeaders({ cookie })

      async function recorrer(ruta, prefijo, pantallas) {
        await pagina.goto(url + ruta, { waitUntil: 'networkidle2', timeout: 120000 })
        await pausa(2500)
        // Que carguen las fotos perezosas y se disparen las entradas por scroll.
        const alto = await pagina.evaluate(() => document.documentElement.scrollHeight)
        for (let y = 0; y < Math.min(alto, 693 * (pantallas + 1)); y += 400) {
          await pagina.evaluate((y) => window.scrollTo(0, y), y)
          await pausa(250)
        }
        for (let i = 0; i < pantallas; i++) {
          const y = Math.round(i * 693 * 0.95)
          if (y > alto - 693 && i > 0) break
          await pagina.evaluate((y) => window.scrollTo(0, y), y)
          await pausa(1100)
          await pagina.screenshot({ path: path.join(dir, `${prefijo}-${i}.jpg`), type: 'jpeg', quality: 86 })
        }
      }

      for (const estilo of estilos) {
        try {
          await recorrer(`/?estilo=${estilo}`, estilo, 4)
          console.log(`  ${estilo} ✓`)
        } catch (e) {
          console.log(`  ${estilo} ✗ ${e.message}`)
        }
      }
      try {
        await recorrer(RUTAS[base].catalogo, 'catalogo', 2)
        const enlace = await pagina.evaluate((f) => document.querySelector(`a[href^="${f}"]`)?.getAttribute('href'), RUTAS[base].ficha)
        if (enlace) await recorrer(enlace, 'ficha', 2)
        console.log(`  catálogo${enlace ? ' y ficha' : ''} ✓`)
      } catch (e) {
        console.log(`  catálogo ✗ ${e.message}`)
      }
      await pagina.close()
    } catch (e) {
      console.log(`  ✗ ${e.message}`)
    } finally {
      try {
        process.kill(-servidor.pid, 'SIGTERM')
      } catch {}
      await pausa(1500)
    }
  }
  await navegador.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
