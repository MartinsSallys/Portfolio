import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { code, docs } from './canvases';

export interface ProjectSpec {
  monitor: string;
  laptop: string;
  phone?: string;
  labels?: [string, [number, number, number]][];
}

export interface StageCtl {
  set(i: number): void;
  jump(i: number): void;
}

type ScreenSource = string | (() => { image: CanvasImageSource });

const img = (src: string) =>
  new Promise<HTMLImageElement>((r, reject) => {
    const i = new Image();
    i.onload = () => r(i);
    i.onerror = () => reject(new Error("Imagem indisponível: " + src));
    i.src = src;
  });

function ctex(c: HTMLCanvasElement): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 16;
  return t;
}

async function screenTex(src: ScreenSource, aspect: number): Promise<THREE.CanvasTexture> {
  const W = 2048, H = Math.round(W / aspect);
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d')!;
  let im: CanvasImageSource & { width: number; height: number };
  if (typeof src === 'string') im = await img(src);
  else im = src().image as CanvasImageSource & { width: number; height: number };
  const tmp = document.createElement('canvas');
  tmp.width = im.width;
  tmp.height = im.height;
  const tg = tmp.getContext('2d')!;
  tg.drawImage(im, 0, 0);
  const p = tg.getImageData(4, im.height - 4, 1, 1).data;
  g.fillStyle = `rgb(${p[0]},${p[1]},${p[2]})`;
  g.fillRect(0, 0, W, H);
  const h = (W * im.height) / im.width;
  g.drawImage(im, 0, 0, W, h);
  return ctex(c);
}

function rplane(w: number, h: number, r: number): THREE.ShapeGeometry {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const geo = new THREE.ShapeGeometry(s, 10);
  const p = geo.attributes.position, uv = geo.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + w / 2) / w, (p.getY(i) + h / 2) / h);
  return geo;
}

let SHEEN: THREE.CanvasTexture | null = null;
let KEYS: THREE.CanvasTexture | null = null;
let AO: THREE.CanvasTexture | null = null;

function sheen(): THREE.CanvasTexture {
  if (SHEEN) return SHEEN;
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d')!;
  const gr = g.createLinearGradient(0, 0, 512, 512);
  gr.addColorStop(0, 'rgba(255,255,255,.22)');
  gr.addColorStop(0.38, 'rgba(255,255,255,.05)');
  gr.addColorStop(0.4, 'rgba(255,255,255,0)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, 512, 512);
  return (SHEEN = ctex(c));
}

function keys(): THREE.CanvasTexture {
  if (KEYS) return KEYS;
  const c = document.createElement('canvas');
  c.width = 1400;
  c.height = 950;
  const g = c.getContext('2d')!;
  const rr = (x: number, y: number, w: number, h: number, r: number) => {
    g.beginPath();
    g.roundRect(x, y, w, h, r);
    g.fill();
  };
  g.fillStyle = 'rgba(0,0,0,.10)';
  rr(90, 40, 1220, 520, 18);
  const kw = 80, gap = 10;
  g.fillStyle = '#1d1d1f';
  for (let row = 0; row < 6; row++) {
    const hh = row == 0 ? 40 : 68;
    let x = 108;
    const n = row == 0 ? 14 : row == 5 ? 0 : 13;
    if (row == 5) {
      [[108, 90], [208, 90], [308, 100], [418, 480], [908, 100], [1018, 90], [1118, 170]]
        .forEach(([xx, ww]) => rr(xx, 58 + 5 * 80, ww, 68, 10));
      continue;
    }
    for (let k = 0; k < n; k++) {
      const w = row == 0 ? (1184 - 13 * gap) / 14 : kw + (k == n - 1 && row > 0 ? 1184 - (13 * kw + 12 * gap) : 0);
      rr(x, row == 0 ? 58 : 58 + 40 + gap + (row - 1) * 80, w, hh, 10);
      x += w + gap;
    }
  }
  g.fillStyle = 'rgba(0,0,0,.05)';
  rr(450, 610, 500, 300, 22);
  g.strokeStyle = 'rgba(0,0,0,.14)';
  g.lineWidth = 3;
  g.beginPath();
  g.roundRect(450, 610, 500, 300, 22);
  g.stroke();
  return (KEYS = ctex(c));
}

function ao(): THREE.CanvasTexture {
  if (AO) return AO;
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  const r = g.createRadialGradient(128, 128, 20, 128, 128, 128);
  r.addColorStop(0, 'rgba(0,0,0,.45)');
  r.addColorStop(0.6, 'rgba(0,0,0,.12)');
  r.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 256, 256);
  return (AO = ctex(c));
}

const ALU = () => new THREE.MeshPhysicalMaterial({ color: 0xd9dadc, metalness: 1, roughness: 0.34, envMapIntensity: 1.1 });
const GLASS = () => new THREE.MeshPhysicalMaterial({ color: 0x050505, roughness: 0.08, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05 });

function screenStack(t: THREE.Texture, w: number, h: number, z: number, bw: number, bh: number, br: number): THREE.Group {
  const g = new THREE.Group();
  const b = new THREE.Mesh(rplane(bw, bh, br), GLASS());
  b.position.z = z;
  g.add(b);
  const s = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, toneMapped: false }));
  s.position.z = z + 0.002;
  g.add(s);
  const sh = new THREE.Mesh(new THREE.PlaneGeometry(bw, bh), new THREE.MeshBasicMaterial({ map: sheen(), transparent: true, depthWrite: false, toneMapped: false }));
  sh.position.z = z + 0.004;
  g.add(sh);
  return g;
}

function contact(w: number, d: number): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: ao(), transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.003;
  return m;
}

export async function laptop(src: ScreenSource, W = 4): Promise<THREE.Group> {
  const g = new THREE.Group(), D = W * 0.69, bh = 0.11;
  const t = await screenTex(src, 1.6);
  const base = new THREE.Mesh(new RoundedBoxGeometry(W, bh, D, 4, 0.045), ALU());
  base.position.y = bh / 2;
  base.castShadow = true;
  g.add(base);
  const deck = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.97, D * 0.95), new THREE.MeshStandardMaterial({ map: keys(), transparent: true, roughness: 0.6 }));
  deck.rotation.x = -Math.PI / 2;
  deck.position.set(0, bh + 0.002, 0);
  g.add(deck);
  const H = W * 0.655, lid = new THREE.Group();
  lid.position.set(0, bh, -D / 2 + 0.03);
  lid.rotation.x = -0.27;
  g.add(lid);
  const shell = new THREE.Mesh(new RoundedBoxGeometry(W, H, 0.06, 4, 0.04), ALU());
  shell.position.set(0, H / 2 + 0.01, -0.03);
  shell.castShadow = true;
  lid.add(shell);
  const sw = W * 0.95, shh = sw / 1.6;
  const st = screenStack(t, sw, shh, 0, W * 0.985, H * 0.975, 0.07);
  st.position.y = H / 2 + 0.01;
  st.children[1].position.y = H * 0.012;
  lid.add(st);
  g.add(contact(W * 1.5, D * 1.6));
  return g;
}

export async function monitor(src: ScreenSource, W = 5.6): Promise<THREE.Group> {
  const g = new THREE.Group(), Hs = W / (16 / 9);
  const t = await screenTex(src, 16 / 9);
  const ph = Hs + 0.2, pw = W + 0.2, py = 1.35 + ph / 2;
  const panel = new THREE.Mesh(new RoundedBoxGeometry(pw, ph, 0.11, 4, 0.05), ALU());
  panel.position.set(0, py, 0);
  panel.castShadow = true;
  g.add(panel);
  const st = screenStack(t, W, Hs, 0.056, pw - 0.04, ph - 0.04, 0.05);
  st.position.y = py;
  g.add(st);
  const neck = new THREE.Mesh(new THREE.BoxGeometry(W * 0.17, py - 0.1, 0.05), ALU());
  neck.position.set(0, (py - 0.1) / 2 + 0.03, -0.32);
  neck.rotation.x = 0.12;
  neck.castShadow = true;
  g.add(neck);
  const foot = new THREE.Mesh(new RoundedBoxGeometry(W * 0.26, 0.045, 1.25, 3, 0.02), ALU());
  foot.position.set(0, 0.023, -0.3);
  foot.castShadow = true;
  g.add(foot);
  g.add(contact(W * 0.55, 1.9));
  return g;
}

export async function phone(src: ScreenSource, H = 2.3): Promise<THREE.Group> {
  const g = new THREE.Group(), W = H * 0.49, D = 0.09;
  const t = await screenTex(src, 390 / 844);
  const body = new THREE.Group();
  body.position.set(0, 0.06, 0);
  body.rotation.x = -0.16;
  g.add(body);
  const shell = new THREE.Mesh(new RoundedBoxGeometry(W, H, D, 6, 0.16), ALU());
  shell.position.y = H / 2;
  shell.castShadow = true;
  body.add(shell);
  const sw = W * 0.92, sh = (sw * 844) / 390;
  const st = screenStack(t, sw, Math.min(sh, H * 0.955), D / 2 + 0.001, W * 0.965, H * 0.975, 0.14);
  st.position.y = H / 2;
  body.add(st);
  (st.children[1] as THREE.Mesh).geometry = rplane(sw, Math.min(sh, H * 0.955), 0.11);
  const isl = new THREE.Mesh(rplane(W * 0.3, 0.085, 0.042), new THREE.MeshBasicMaterial({ color: 0x050505 }));
  isl.position.set(0, H * 0.955, D / 2 + 0.008);
  body.add(isl);
  const foot = new THREE.Mesh(new RoundedBoxGeometry(W * 0.9, 0.06, 0.75, 3, 0.025), ALU());
  foot.position.set(0, 0.03, -0.18);
  foot.castShadow = true;
  g.add(foot);
  const lip = new THREE.Mesh(new RoundedBoxGeometry(W * 0.9, 0.14, 0.06, 3, 0.025), ALU());
  lip.position.set(0, 0.09, 0.16);
  g.add(lip);
  const back = new THREE.Mesh(new RoundedBoxGeometry(W * 0.5, H * 0.55, 0.05, 3, 0.02), ALU());
  back.position.set(0, H * 0.26, -0.32);
  back.rotation.x = -0.3;
  back.castShadow = true;
  g.add(back);
  g.add(contact(W * 1.6, 1.4));
  return g;
}

function stageLabel(h: string): CSS2DObject {
  const d = document.createElement('div');
  d.className = 'lbl';
  d.innerHTML = h;
  return new CSS2DObject(d);
}

function stageSetup(el: HTMLElement) {
  const w = el.clientWidth, h = el.clientHeight;
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  r.setPixelRatio(Math.min(devicePixelRatio, 2));
  r.setSize(w, h);
  r.toneMapping = THREE.ACESFilmicToneMapping;
  r.toneMappingExposure = 1.05;
  r.shadowMap.enabled = true;
  r.shadowMap.type = THREE.PCFSoftShadowMap;
  el.appendChild(r.domElement);
  const lr = new CSS2DRenderer();
  lr.setSize(w, h);
  Object.assign(lr.domElement.style, { position: 'absolute', top: '0', left: '0', pointerEvents: 'none' });
  el.appendChild(lr.domElement);
  const s = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(r);
  s.environment = pm.fromScene(new RoomEnvironment(r), 0.04).texture;
  const c = new THREE.PerspectiveCamera(28, w / h, 0.1, 100);
  s.add(new THREE.HemisphereLight(0xffffff, 0xe8e6df, 0.6));
  const dl = new THREE.DirectionalLight(0xffffff, 1.6);
  dl.position.set(2, 14, 5);
  dl.castShadow = true;
  dl.shadow.mapSize.set(2048, 2048);
  dl.shadow.radius = 8;
  dl.shadow.bias = -0.0004;
  Object.assign(dl.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 40 });
  s.add(dl);
  const gr = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShadowMaterial({ opacity: 0.07 }));
  gr.rotation.x = -Math.PI / 2;
  gr.receiveShadow = true;
  s.add(gr);
  const go = () => { r.render(s, c); lr.render(s, c); };
  return { r, lr, s, c, go };
}

function resolve(src: string): ScreenSource {
  if (src === 'code()') return code;
  if (src === 'docs()') return docs;
  return src;
}

export async function stage(el: HTMLElement, projects: ProjectSpec[], opts: { reduced?: boolean } = {}): Promise<StageCtl> {
  await document.fonts.load('600 52px Inter');
  await document.fonts.load('32px "JetBrains Mono"');
  const { s, c, go, r, lr } = stageSetup(el);
  const root = new THREE.Group();
  s.add(root);
  const G: { g: THREE.Group; lbls: HTMLElement[] }[] = [];
  for (const p of projects) {
    const g = new THREE.Group(), lbls: HTMLElement[] = [], inn = new THREE.Group();
    g.add(inn);
    const m = await monitor(resolve(p.monitor), 5.0);
    m.position.set(-1.05, 0, -1.1);
    m.rotation.y = 0.2;
    inn.add(m);
    const l = await laptop(resolve(p.laptop), 3.5);
    l.position.set(1.75, 0, 1.35);
    l.rotation.y = -0.42;
    inn.add(l);
    if (p.phone) {
      const ph = await phone(resolve(p.phone), 2.3);
      ph.position.set(-2.55, 0, 2.5);
      ph.rotation.y = 0.32;
      inn.add(ph);
      inn.scale.setScalar(0.82);
      inn.position.set(0.75, 0, 0);
    }
    (p.labels || []).forEach(([h, pos]) => {
      const o = stageLabel(h);
      o.position.set(...pos);
      inn.add(o);
      lbls.push(o.element);
    });
    root.add(g);
    G.push({ g, lbls });
  }

  const reduced = opts.reduced ?? false;
  let cur = 0, tgt = 0, mx = 0, tx = 0;

  function apply() {
    G.forEach(({ g, lbls }, i) => {
      const d = i - cur, ad = Math.abs(d);
      g.position.set(d * 12, 0, -ad * 3);
      g.rotation.y = -d * 0.6;
      g.visible = ad < 0.98;
      lbls.forEach((e) => (e.style.opacity = String(Math.max(0, 1 - ad * 3))));
    });
    root.rotation.y = mx * 0.18;
    go();
  }

  c.position.set(0.8, 3.6, 17.2);
  c.lookAt(0.45, 1.95, 0);
  apply();

  // loop: pausa fora da viewport; renderiza só quando há mudança
  let raf = 0, visible = true, last = performance.now();
  function loop(now: number) {
    raf = 0;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const k = 1 - Math.exp(-dt * 5);
    const dc = tgt - cur, dm = tx - mx;
    if (Math.abs(dc) > 0.0001 || Math.abs(dm) > 0.0001) {
      cur += dc * k;
      mx += dm * k;
      if (Math.abs(tgt - cur) < 0.001) cur = tgt;
      apply();
    }
    if (visible) raf = requestAnimationFrame(loop);
  }
  function start() {
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }
  }
  const io = new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting);
    if (visible) start();
  });
  io.observe(el);
  start();

  if (!reduced) {
    el.addEventListener('pointermove', (e) => {
      const b = el.getBoundingClientRect();
      tx = (e.clientX - b.left) / b.width - 0.5;
    });
    el.addEventListener('pointerleave', () => {
      tx = 0;
    });
  }

  const resize = () => {
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;
    c.aspect = w / h;
    c.updateProjectionMatrix();
    r.setSize(w, h);
    lr.setSize(w, h);
    apply();
  };
  new ResizeObserver(resize).observe(el);

  return {
    set(i) {
      tgt = i;
      if (reduced) { cur = i; apply(); }
    },
    jump(i) {
      cur = tgt = i;
      apply();
    },
  };
}
