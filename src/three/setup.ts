import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export interface Setup {
  r: THREE.WebGLRenderer;
  lr: CSS2DRenderer;
  s: THREE.Scene;
  c: THREE.PerspectiveCamera;
  go: () => void;
  resize: (render?: boolean) => void;
}

export function setup(el: HTMLElement, fov = 35): Setup {
  const w = el.clientWidth, h = el.clientHeight;
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  r.setPixelRatio(Math.min(devicePixelRatio, 2));
  r.setSize(w, h);
  el.appendChild(r.domElement);
  const lr = new CSS2DRenderer();
  lr.setSize(w, h);
  Object.assign(lr.domElement.style, { position: 'absolute', top: '0', left: '0', pointerEvents: 'none' });
  el.appendChild(lr.domElement);
  const s = new THREE.Scene(), c = new THREE.PerspectiveCamera(fov, w / h, 0.1, 100);
  const go = () => { r.render(s, c); lr.render(s, c); };
  const resize = (render = true) => {
    const w2 = el.clientWidth, h2 = el.clientHeight;
    if (!w2 || !h2) return;
    c.aspect = w2 / h2;
    c.updateProjectionMatrix();
    r.setSize(w2, h2);
    lr.setSize(w2, h2);
    if (render) go();
  };
  return { r, lr, s, c, go, resize };
}

export function label(html: string, cls = 'lbl'): CSS2DObject {
  const d = document.createElement('div');
  d.className = cls;
  d.innerHTML = html;
  return new CSS2DObject(d);
}
