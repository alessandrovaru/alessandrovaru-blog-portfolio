// La escena 3D de /paginas-web: las webs hechas, como un mandala.
//
// Cada web es una tarjeta (un plano instanciado) que lee su captura de un atlas.
// Tres formaciones viven en atributos y se mezclan en el vertex shader, así que
// la CPU solo mueve unos pocos uniforms por cuadro:
//   caos     → la nube del principio, mientras cargan las imágenes
//   mandala  → anillos concéntricos que giran (la entrada y el hero)
//   cilindro → filas que giran en sentidos opuestos (el archivo, con el scroll)

import * as THREE from 'three'

const VERTEX = /* glsl */ `
  attribute vec3 aCaos;
  attribute vec4 aMand;   // x, y, giro de la tarjeta, escala
  attribute vec4 aCil;    // ángulo, y, fila, escala
  attribute vec3 aTile;   // atlas, columna, fila
  attribute float aOrden; // 0..1

  uniform float uLoaded;
  uniform float uMix1;
  uniform float uMix2;
  uniform float uSpin;
  uniform float uTurn;
  uniform float uTime;
  uniform float uR;

  varying vec2 vUv;
  varying float vLuz;
  varying vec3 vTile;

  mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

  void main() {
    vUv = uv;
    vTile = aTile;
    float aparece = smoothstep(aOrden, aOrden + 0.08, uLoaded);
    vec3 p = position * aparece;

    // caos: flota
    vec3 pc = p * 0.55;
    pc.xy = rot(aCaos.x * 0.7 + uTime * 0.05) * pc.xy;
    pc += aCaos + vec3(sin(uTime * 0.6 + aOrden * 40.0), cos(uTime * 0.5 + aOrden * 30.0), 0.0) * 0.18;

    // mandala: la tarjeta apunta hacia afuera y el anillo gira
    vec3 pm = p * aMand.w;
    pm.xy = rot(aMand.z) * pm.xy;
    pm.xy += aMand.xy;
    float anillo = length(aMand.xy);
    pm.xy = rot(uSpin * (mod(floor(anillo), 2.0) < 1.0 ? 1.0 : -0.7)) * pm.xy;

    // cilindro: cada fila gira en su sentido
    float sentido = mod(aCil.z, 2.0) < 1.0 ? 1.0 : -1.0;
    float ang = aCil.x + uTurn * sentido;
    vec3 pl = p * aCil.w;
    pl.xz = rot(-ang) * pl.xz;
    pl += vec3(sin(ang) * uR, aCil.y, cos(ang) * uR);

    vec3 pos = mix(mix(pc, pm, uMix1), pl, uMix2);

    // luz: la cara de atrás del cilindro se apaga; el mandala respira del centro afuera
    float frente = smoothstep(-uR * 0.9, uR, pl.z);
    float centro = 1.0 - smoothstep(0.0, 9.0, anillo) * 0.35;
    vLuz = mix(mix(0.55, centro, uMix1), mix(0.12, 1.0, frente), uMix2) * aparece;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const FRAGMENT = /* glsl */ `
  uniform sampler2D uA0;
  uniform sampler2D uA1;
  uniform sampler2D uA2;
  uniform sampler2D uA3;
  uniform vec4 uCelda; // ancho y alto de una celda en el atlas, columnas, filas (en px / tamaño)

  varying vec2 vUv;
  varying float vLuz;
  varying vec3 vTile;

  float esquina(vec2 uv, float r) {
    vec2 q = abs(uv - 0.5) * vec2(1.0, 1.777) - vec2(0.5, 0.888) + r;
    return length(max(q, 0.0)) - r;
  }

  void main() {
    if (vLuz <= 0.001) discard;
    if (esquina(vUv, 0.06) > 0.0) discard;
    vec2 uv = vec2(
      (vTile.y + vUv.x) * uCelda.x,
      1.0 - (vTile.z + 1.0 - vUv.y) * uCelda.y
    );
    vec4 c;
    if (vTile.x < 0.5) c = texture2D(uA0, uv);
    else if (vTile.x < 1.5) c = texture2D(uA1, uv);
    else if (vTile.x < 2.5) c = texture2D(uA2, uv);
    else c = texture2D(uA3, uv);
    float borde = smoothstep(-0.012, 0.0, esquina(vUv, 0.06));
    vec3 col = c.rgb * vLuz + vec3(0.27, 0.53, 0.35) * borde * 0.9;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`

// Un número pseudoaleatorio fijo por índice (la nube no cambia entre visitas).
const azar = (i, s = 1) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function formaciones(total) {
  // Mandala: anillos con más tarjetas cuanto más afuera.
  // Con un hueco al centro: ahí respira el titular en el teléfono.
  const mand = []
  let r = 2.8
  let k = 0
  while (mand.length < total) {
    const n = Math.min(total - mand.length, Math.round((2 * Math.PI * r) / 0.7))
    const escala = 0.5 + k * 0.07
    for (let j = 0; j < n; j++) {
      const t = (j / n) * Math.PI * 2 + (k % 2 ? Math.PI / n : 0)
      mand.push([Math.cos(t) * r, Math.sin(t) * r, t - Math.PI / 2, escala])
    }
    r += 0.62 + k * 0.12
    k++
  }

  // Cilindro: 7 filas.
  const filas = 7
  const porFila = Math.ceil(total / filas)
  const cil = []
  for (let i = 0; i < total; i++) {
    const fila = Math.floor(i / porFila)
    const j = i % porFila
    const ang = (j / porFila) * Math.PI * 2 + (fila % 2 ? Math.PI / porFila : 0)
    cil.push([ang, (fila - (filas - 1) / 2) * 2.05, fila, 1.0])
  }
  return { mand, cil, radioMandala: r }
}

export function crearEscena(lienzo, { webs, atlas, reducido }) {
  const total = webs.length
  const renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const escena = new THREE.Scene()
  const camara = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
  camara.position.set(0, 0, 20)

  const plano = new THREE.PlaneGeometry(1, 1.777, 1, 1)
  const geo = new THREE.InstancedBufferGeometry()
  geo.index = plano.index
  geo.setAttribute('position', plano.getAttribute('position'))
  geo.setAttribute('uv', plano.getAttribute('uv'))
  geo.instanceCount = total

  const { mand, cil } = formaciones(total)
  const caos = new Float32Array(total * 3)
  const aMand = new Float32Array(total * 4)
  const aCil = new Float32Array(total * 4)
  const tile = new Float32Array(total * 3)
  const orden = new Float32Array(total)
  webs.forEach((w, i) => {
    const rad = 6 + azar(i, 1) * 9
    const t = azar(i, 2) * Math.PI * 2
    caos.set([Math.cos(t) * rad, Math.sin(t) * rad * 0.62, -4 - azar(i, 3) * 10], i * 3)
    aMand.set(mand[i], i * 4)
    aCil.set(cil[i], i * 4)
    tile.set([w.atlas, w.celda % atlas.columnas, Math.floor(w.celda / atlas.columnas)], i * 3)
    // Aparecen por atlas (es lo que va llegando), y dentro de cada uno en desorden.
    orden[i] = Math.min(0.999, (w.atlas + azar(i, 4) * 0.9) / atlas.cantidad)
  })
  geo.setAttribute('aCaos', new THREE.InstancedBufferAttribute(caos, 3))
  geo.setAttribute('aMand', new THREE.InstancedBufferAttribute(aMand, 4))
  geo.setAttribute('aCil', new THREE.InstancedBufferAttribute(aCil, 4))
  geo.setAttribute('aTile', new THREE.InstancedBufferAttribute(tile, 3))
  geo.setAttribute('aOrden', new THREE.InstancedBufferAttribute(orden, 1))

  const vacio = new THREE.DataTexture(new Uint8Array([11, 11, 11, 255]), 1, 1)
  vacio.needsUpdate = true
  const uniforms = {
    uA0: { value: vacio },
    uA1: { value: vacio },
    uA2: { value: vacio },
    uA3: { value: vacio },
    uCelda: { value: new THREE.Vector4(Math.floor(atlas.tamano / atlas.columnas) / atlas.tamano, Math.floor(atlas.tamano / atlas.filas) / atlas.tamano, 0, 0) },
    uLoaded: { value: 0 },
    uMix1: { value: reducido ? 1 : 0 },
    uMix2: { value: 0 },
    uSpin: { value: 0 },
    uTurn: { value: 0 },
    uTime: { value: 0 },
    uR: { value: 6.2 },
  }
  const material = new THREE.ShaderMaterial({ vertexShader: VERTEX, fragmentShader: FRAGMENT, uniforms, side: THREE.DoubleSide })
  const malla = new THREE.Mesh(geo, material)
  malla.frustumCulled = false
  const grupo = new THREE.Group()
  grupo.add(malla)
  escena.add(grupo)

  // Carga real: cada atlas que llega enciende sus tarjetas.
  const cargador = new THREE.TextureLoader()
  let llegados = 0
  const cargas = atlas.urls.map(
    (url, i) =>
      new Promise((resolver) => {
        cargador.load(
          url,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace
            tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
            tex.generateMipmaps = true
            uniforms[`uA${i}`].value = tex
            llegados++
            resolver()
          },
          undefined,
          () => {
            llegados++
            resolver()
          }
        )
      })
  )

  // Puntero: inclina el conjunto; arrastrar gira el cilindro.
  const puntero = { x: 0, y: 0, tx: 0, ty: 0 }
  let arrastre = null
  let inercia = 0
  let turnoExtra = 0
  const alMover = (e) => {
    puntero.tx = (e.clientX / window.innerWidth) * 2 - 1
    puntero.ty = (e.clientY / window.innerHeight) * 2 - 1
    if (arrastre !== null) {
      const dx = e.clientX - arrastre
      arrastre = e.clientX
      inercia = dx * 0.004
      turnoExtra += inercia
    }
  }
  const alBajar = (e) => {
    if (uniforms.uMix2.value > 0.5) arrastre = e.clientX
  }
  const alSoltar = () => {
    arrastre = null
  }
  window.addEventListener('pointermove', alMover, { passive: true })
  lienzo.addEventListener('pointerdown', alBajar)
  window.addEventListener('pointerup', alSoltar)

  function medir() {
    const w = lienzo.clientWidth
    const h = lienzo.clientHeight
    renderer.setSize(w, h, false)
    camara.aspect = w / h
    // En vertical el mandala se aleja para que quepa a lo ancho.
    camara.position.z = camara.aspect < 1 ? (20 / Math.max(camara.aspect, 0.45)) * 0.62 : 20
    camara.updateProjectionMatrix()
  }
  medir()
  const observador = new ResizeObserver(medir)
  observador.observe(lienzo)

  const estado = { scroll: 0, cargaMostrada: 0, activo: true, visible: true }
  const reloj = new THREE.Clock()
  let marco = 0

  function cuadro() {
    marco = requestAnimationFrame(cuadro)
    if (!estado.visible) return
    const dt = Math.min(reloj.getDelta(), 0.05)
    const t = reloj.elapsedTime
    uniforms.uTime.value = t
    uniforms.uLoaded.value += ((llegados / atlas.urls.length) * 1.08 - uniforms.uLoaded.value) * Math.min(1, dt * 2.2)

    if (!reducido) {
      uniforms.uSpin.value += dt * 0.06
      inercia *= 0.94
      if (arrastre === null) turnoExtra += inercia
      puntero.x += (puntero.tx - puntero.x) * 0.05
      puntero.y += (puntero.ty - puntero.y) * 0.05
      const s = estado.scroll
      uniforms.uMix2.value = smooth(0.08, 0.5, s)
      uniforms.uTurn.value = s * Math.PI * 1.3 + turnoExtra + t * 0.03 * uniforms.uMix2.value
      // El mandala se aparta del titular: a la derecha en la computadora, arriba
      // y más chico en el teléfono. El cilindro vuelve al centro.
      const m2 = uniforms.uMix2.value
      const vertical = camara.aspect < 1
      grupo.rotation.x = puntero.y * 0.12 + m2 * 0.18
      grupo.rotation.y = puntero.x * 0.18 * (1 - m2 * 0.6)
      grupo.position.x = (vertical ? 0 : 4.2) * (1 - m2)
      grupo.position.y = (vertical ? 3.1 : 0) * (1 - m2) - m2 * 0.4
      grupo.scale.setScalar(vertical ? 0.62 + 0.38 * m2 : 1)
    }
    renderer.render(escena, camara)
  }
  cuadro()

  return {
    cargas: Promise.all(cargas),
    uniforms,
    progreso: () => llegados / atlas.urls.length,
    ponerScroll(s) {
      estado.scroll = s
    },
    visible(v) {
      estado.visible = v
    },
    destruir() {
      cancelAnimationFrame(marco)
      observador.disconnect()
      window.removeEventListener('pointermove', alMover)
      lienzo.removeEventListener('pointerdown', alBajar)
      window.removeEventListener('pointerup', alSoltar)
      geo.dispose()
      material.dispose()
      for (let i = 0; i < 4; i++) uniforms[`uA${i}`].value.dispose?.()
      renderer.dispose()
    },
  }
}

function smooth(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
