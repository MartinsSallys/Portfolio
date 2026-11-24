import * as THREE from 'three';
import { setup, label } from './setup';

function rng(seed: number): () => number {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

export interface DataCubeOptions {
  cube: number;
  line: number;
  accent: number;
  labels?: [string, [number, number, number]][];
}

export function dataCube(el: HTMLElement, o: DataCubeOptions): void {
  const { s, c, go, resize } = setup(el, 30);
  c.position.set(10, 8, 12);
  c.lookAt(0, 0, 0);
  s.add(new THREE.AmbientLight(0xffffff, 1));
  const dl = new THREE.DirectionalLight(0xffffff, 2);
  dl.position.set(6, 10, 4);
  s.add(dl);
  const rnd = rng(11);
  const N = 7, g = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const grp = new THREE.Group();
  const pieces: { mesh: THREE.Mesh; rest: THREE.Vector3 }[] = [];
  const edgeGeometry = new THREE.EdgesGeometry(g);
  const edgeMaterial = new THREE.LineBasicMaterial({ color: o.line });
  const base = new THREE.MeshStandardMaterial({ color: o.cube, roughness: 0.35, metalness: 0.1 });
  const acc = new THREE.MeshStandardMaterial({ color: o.accent, emissive: o.accent, emissiveIntensity: 0.25 });
  for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) for (let z = 0; z < N; z++) {
    const edge = [x, y, z].some((v) => v === 0 || v === N - 1);
    if (!edge) continue;
    const r = rnd();
    if (r < 0.18) continue;
    const m = new THREE.Mesh(g, r > 0.9 ? acc : base);
    const off = r > 0.84 ? 0.35 : 0;
    m.position.set((x - 3) * 0.62, (y - 3) * 0.62 + off, (z - 3) * 0.62);
    grp.add(m);
    const e = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    m.add(e);
    pieces.push({ mesh: m, rest: m.position.clone() });
  }
  for (let i = 0; i < 14; i++) {
    const m = new THREE.Mesh(g, rnd() > 0.5 ? acc : base);
    m.position.set((rnd() - 0.5) * 9, (rnd() - 0.2) * 6, (rnd() - 0.5) * 9);
    m.rotation.set(rnd() * 3, rnd() * 3, 0);
    m.scale.setScalar(0.5 + rnd() * 0.6);
    s.add(m);
  }
  grp.rotation.set(0.15, 0.5, 0);
  s.add(grp);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.015, 8, 160), new THREE.MeshBasicMaterial({ color: o.accent }));
  ring.rotation.x = Math.PI / 2.3;
  s.add(ring);
  (o.labels || []).forEach(([t, p]) => {
    const l = label(t);
    l.position.set(...p);
    s.add(l);
  });
  const hero = el.parentElement!;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let target = 0, closure = 0, tilt = 0, phase = 0;
  let frame = 0, last = 0, visible = false;
  function draw(now: number) {
    frame = 0;
    if (!visible || document.hidden || motion.matches) return;
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    phase += dt;
    const blend = 1 - Math.exp(-6 * dt);
    closure += (target - closure) * blend;
    grp.rotation.y += (0.5 + Math.sin(phase * 0.38) * 0.14 + tilt * closure * 0.32 - grp.rotation.y) * blend;
    const spacing = 1.1 + 0.04 * Math.sin(phase * 1.2) - 0.32 * closure;
    for (const { mesh, rest } of pieces) mesh.position.copy(rest).multiplyScalar(spacing);
    go();
    frame = requestAnimationFrame(draw);
  }
  function sync() {
    cancelAnimationFrame(frame);
    last = 0;
    if (motion.matches) {
      grp.rotation.y = 0.5;
      for (const { mesh, rest } of pieces) mesh.position.copy(rest);
      go();
    } else if (visible && !document.hidden) frame = requestAnimationFrame(draw);
  }
  hero.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width * 2 - 1;
    const y = (event.clientY - box.top) / box.height * 2 - 1;
    target = Math.max(0, 1 - Math.hypot(x, y));
    tilt = Math.max(-1, Math.min(1, x * 2));
  });
  hero.addEventListener('pointerleave', () => { target = 0; });
  motion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(el);
  go();
  new ResizeObserver(resize).observe(el);
}
