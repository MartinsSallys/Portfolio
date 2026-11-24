import * as THREE from 'three';
import { drawCode, drawDocs } from './draws';

export function canvasTex(
  w: number,
  h: number,
  draw: (g: CanvasRenderingContext2D, w: number, h: number) => void,
): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d')!, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export function docs(): THREE.CanvasTexture {
  return canvasTex(1600, 1000, drawDocs);
}

export function code(): THREE.CanvasTexture {
  return canvasTex(1600, 1000, drawCode);
}
