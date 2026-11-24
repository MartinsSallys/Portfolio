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
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(g), new THREE.LineBasicMaterial({ color: o.line }));
    e.position.copy(m.position);
    grp.add(e);
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
  go();
  new ResizeObserver(resize).observe(el);
}
