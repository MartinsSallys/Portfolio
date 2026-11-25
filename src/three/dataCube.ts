import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { setup } from './setup';

export function dataCube(el: HTMLElement, options: {
  entries: readonly { face: number; position: readonly [number, number, number] }[];
  onSelect: (index: number) => void;
  onHover: (index: number | null, x: number, y: number) => void;
  onAnchor: (x: number, y: number) => void;
  onFace?: (face: number) => void;
}) {
  const { s, c, r, lr, resize } = setup(el, 30);
  c.position.set(0, 0, 17);
  c.lookAt(0, 0, 0);
  s.add(new THREE.HemisphereLight(0xf5f9ff, 0x48567f, 1.6));
  const rim = new THREE.DirectionalLight(0xaacfff, 2.1);
  rim.position.set(-4, 3, -2);
  s.add(rim);
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(6, 10, 4);
  s.add(light);

  let seed = 11;
  const random = () => (seed = seed * 16807 % 2147483647) / 2147483647;
  const slots = options.entries.map(entry => entry.position);
  // Reserve the first instance IDs for entries; all remaining IDs are occluders.
  const rest = slots.map(([x, y, z]) => new THREE.Vector3(x, y, z).multiplyScalar(.62));
  for (let x = -3; x <= 3; x++) for (let y = -3; y <= 3; y++) for (let z = -3; z <= 3; z++) {
    if (Math.max(Math.abs(x), Math.abs(y), Math.abs(z)) !== 3) continue;
    if (slots.some(([a, b, c]) => x === a && y === b && z === c)) continue;
    if (random() > .18) rest.push(new THREE.Vector3(x, y, z).multiplyScalar(.62));
  }
  const shellCount = rest.length;
  for (let i = 0; i < 14; i++) {
    const a = i * Math.PI / 7;
    rest.push(new THREE.Vector3(Math.cos(a) * 4.1, Math.sin(a) * 3.7, -1 - random() * 2));
  }
  const material = new THREE.MeshStandardMaterial({ roughness: .32, metalness: .18 });
  const blocks = new THREE.InstancedMesh(new RoundedBoxGeometry(.51, .51, .51, 1, .055), material, rest.length);
  blocks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  blocks.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8);
  const pose = new THREE.Object3D(), color = new THREE.Color();
  const palette = rest.map((_, i) => new THREE.Color(i < slots.length ? [0x254aff, 0x2462f6, 0x3543e6][i%3] : [0xc7d6ef, 0xa6bfde, 0xe0e8f5][i%3]));
  rest.forEach((p, i) => {
    pose.position.copy(p);
    pose.updateMatrix();
    blocks.setMatrixAt(i, pose.matrix);
    blocks.setColorAt(i, palette[i]);
  });
  s.add(blocks);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.4, .015, 8, 160), new THREE.MeshBasicMaterial({ color: 0x2b50ff }));
  ring.rotation.x = Math.PI / 2.3;
  s.add(ring);

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const targets = [blocks, ring];
  function pick(clientX: number, clientY: number) {
    const box = el.getBoundingClientRect();
    const u = (clientX - box.left) / box.width, v = (clientY - box.top) / box.height;
    let index: number | null = null;
    if (u >= 0 && u <= 1 && v >= 0 && v <= 1) {
      ray.setFromCamera(ndc.set(2*u-1, 1-2*v), c);
      const id = ray.intersectObjects(targets, false)[0]?.instanceId;
      if (id !== undefined && id < slots.length) index = id;
    }
    return { index, x: u * el.clientWidth, y: v * el.clientHeight };
  }
  let pointer: PointerEvent | null = null, hover: ReturnType<typeof pick> | null = null;
  function updateHover() {
    const next = pointer ? pick(pointer.clientX, pointer.clientY) : null;
    if (hover?.index === next?.index && hover?.x === next?.x && hover?.y === next?.y) return;
    const x = next?.x ?? hover?.x ?? 0, y = next?.y ?? hover?.y ?? 0;
    hover = next;
    el.style.cursor = press?.drag ? 'grabbing' : next?.index != null ? 'pointer' : 'grab';
    options.onHover(next?.index ?? null, x, y);
  }

  let selected: number | null = null, visible = false, frame = 0, last = 0, time = 0;
  let pitch = .28, yaw = -.4, face = 0, disposed = false;
  const anchor = new THREE.Vector3(), matrix = new THREE.Matrix4();
  const parallax = new THREE.Vector2();
  const angles = [[0,0], [0,-Math.PI/2], [0,Math.PI], [0,Math.PI/2], [Math.PI/2,0], [-Math.PI/2,0]];
  const normals = [[0,0,1],[1,0,0],[0,0,-1],[-1,0,0],[0,1,0],[0,-1,0]].map(([x,y,z]) => new THREE.Vector3(x,y,z));
  blocks.rotation.set(pitch, yaw, 0);
  const aim = new THREE.Quaternion(), euler = new THREE.Euler();
  const view = c.position.clone().normalize();
  const plane = new THREE.Plane(view, -2), cursor = new THREE.Vector3(), delta = new THREE.Vector3();
  const pull = rest.map(() => new THREE.Vector3());
  const emphasis = new Float32Array(rest.length);
  function schedule() {
    if (!disposed && !frame && visible && !document.hidden) frame = requestAnimationFrame(draw);
  }
  function draw(now: number) {
    frame = 0;
    if (!visible || document.hidden) return;
    if (!motion.matches && last && now - last < 32) { schedule(); return; }
    const dt = last ? Math.min((now-last)/1000, .08) : 0;
    last = now;
    time = motion.matches ? 0 : time + dt;
    aim.setFromEuler(euler.set(pitch + parallax.y, yaw + parallax.x, 0));
    blocks.quaternion.slerp(aim, motion.matches || press?.drag ? 1 : 1-Math.exp(-8*dt));
    const direction = delta.copy(view).applyQuaternion(aim.copy(blocks.quaternion).invert());
    let front = 0;
    for (let i=1; i<6; i++) if (normals[i].dot(direction) > normals[front].dot(direction)) front = i;
    if (face !== front+1) {
      face = front+1;
      options.onFace?.(face);
      if (disposed) return;
    }
    blocks.scale.setScalar(1.04 + .035*Math.sin(time*1.2));
    const blend = motion.matches ? 1 : 1-Math.exp(-8*dt);
    if (pointer && !motion.matches) {
      const box = el.getBoundingClientRect();
      ray.setFromCamera(ndc.set(2*(pointer.clientX-box.left)/box.width-1, 1-2*(pointer.clientY-box.top)/box.height), c);
      ray.ray.intersectPlane(plane, cursor);
      blocks.worldToLocal(cursor);
    }
    for (let i = 0; i < rest.length; i++) {
      const phase = time*.65 + i;
      const peripheral = i >= shellCount;
      const active = selected === i || hover?.index === i;
      emphasis[i] += (Number(active)-emphasis[i])*blend;
      pose.position.copy(rest[i]);
      pose.position.y += (peripheral ? .23 : .035)*Math.sin(phase);
      pose.position.x += (peripheral ? .17 : .035)*Math.cos(phase*.8);
      pose.position.z += .04*Math.sin(phase*1.3);
      if (pointer && !motion.matches) {
        delta.subVectors(cursor, rest[i]);
        delta.multiplyScalar(.48/(1 + delta.lengthSq()));
      } else delta.setScalar(0);
      pull[i].lerp(delta, blend);
      pose.position.add(pull[i]).addScaledVector(rest[i], emphasis[i]*.09);
      if (peripheral) pose.rotation.set(phase*.3, phase*.4, i);
      else pose.rotation.set(.035*Math.sin(phase), .045*Math.cos(phase), 0);
      pose.scale.setScalar(peripheral ? .58 + .15*Math.sin(i) : 1 + emphasis[i]*.14);
      color.copy(palette[i]).multiplyScalar((selected !== null || hover?.index != null) && !active ? .52 : 1 + emphasis[i]*.48);
      blocks.setColorAt(i, color);
      pose.updateMatrix();
      blocks.setMatrixAt(i, pose.matrix);
    }
    blocks.instanceMatrix.needsUpdate = true;
    blocks.instanceColor!.needsUpdate = true;
    ring.rotation.z = .05*Math.sin(time*.42);
    r.render(s, c);
    if (selected !== null) {
      blocks.getMatrixAt(selected, matrix);
      anchor.setFromMatrixPosition(matrix).applyMatrix4(blocks.matrixWorld).project(c);
      options.onAnchor((1+anchor.x)*el.clientWidth/2, (1-anchor.y)*el.clientHeight/2);
    }
    const previousHover = hover?.index;
    updateHover();
    if (!motion.matches || (pointer && hover?.index !== previousHover)) schedule();
  }
  function select(index: number | null) {
    selected = index !== null && Number.isInteger(index) && index >= 0 && index < slots.length ? index : null;
    schedule();
  }
  function orient(face: number) {
    if (!Number.isInteger(face) || !angles[face-1]) return;
    [pitch, yaw] = angles[face-1];
    parallax.set(0, 0);
    schedule();
  }
  const events = new AbortController(), listener = { signal: events.signal };
  const oldCursor = el.style.cursor, oldTouch = el.style.touchAction;
  el.style.touchAction = 'pan-y pinch-zoom';
  el.style.cursor = 'grab';
  let press: { id: number; x: number; y: number; pitch: number; yaw: number; drag: boolean; index: number | null } | null = null;
  let pendingClick: number | null = null;
  el.addEventListener('pointerdown', e => {
    pendingClick = null;
    if (!e.isPrimary || e.button !== 0) return;
    const { index } = pick(e.clientX, e.clientY);
    press = { id: e.pointerId, x: e.clientX, y: e.clientY, index, pitch, yaw, drag: false };
    el.setPointerCapture(e.pointerId);
  }, listener);
  el.addEventListener('pointermove', e => {
    if (press?.id === e.pointerId) {
      const dx = e.clientX-press.x, dy = e.clientY-press.y;
      if (press.drag || Math.hypot(dx,dy)>6) {
        press.drag = true;
        yaw = press.yaw + dx*.012;
        pitch = THREE.MathUtils.clamp(press.pitch + dy*.012, -Math.PI/2, Math.PI/2);
        pointer = null; updateHover(); schedule(); return;
      }
    }
    if (e.pointerType !== 'touch') {
      pointer = e;
      if (!motion.matches && selected === null) {
        const box = el.getBoundingClientRect();
        parallax.set(((e.clientX-box.left)/box.width-.5)*.15, ((e.clientY-box.top)/box.height-.5)*.1);
      }
      schedule();
    }
  }, listener);
  el.addEventListener('pointerup', e => {
    const p = press;
    if (p?.id !== e.pointerId) return;
    press = null;
    el.style.cursor = 'grab';
    if (p.drag || p.index === null || Math.hypot(e.clientX-p.x, e.clientY-p.y) > 6) return;
    if (pick(e.clientX, e.clientY).index === p.index) pendingClick = p.index;
  }, listener);
  // Wait for click so a touch release cannot activate the newly opened card.
  el.addEventListener('click', () => {
    if (pendingClick === null) return;
    const index = pendingClick;
    pendingClick = null;
    options.onSelect(index);
  }, listener);
  el.addEventListener('lostpointercapture', e => { if (press?.id === e.pointerId) press = null; }, listener);
  el.addEventListener('pointercancel', () => { press = pointer = null; updateHover(); schedule(); }, listener);
  el.addEventListener('pointerleave', () => { pointer = null; parallax.set(0,0); updateHover(); schedule(); }, listener);
  function sync() {
    cancelAnimationFrame(frame);
    frame = last = 0;
    if (!visible || document.hidden) { press = pointer = null; updateHover(); }
    schedule();
  }
  motion.addEventListener('change', sync, listener);
  document.addEventListener('visibilitychange', sync, listener);
  const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  intersection.observe(el);
  function fit() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    if (r.getPixelRatio() !== ratio) r.setPixelRatio(ratio);
    resize(false);
    schedule();
  }
  const size = new ResizeObserver(fit);
  size.observe(el);
  window.addEventListener('resize', fit, listener);
  function dispose() {
    if (disposed) return;
    disposed = true;
    events.abort(); intersection.disconnect(); size.disconnect(); cancelAnimationFrame(frame);
    if (press && el.hasPointerCapture(press.id)) el.releasePointerCapture(press.id);
    pointer = press = null; updateHover();
    blocks.dispose(); blocks.geometry.dispose(); material.dispose();
    ring.geometry.dispose(); ring.material.dispose();
    r.dispose(); r.domElement.remove(); lr.domElement.remove();
    el.style.cursor = oldCursor; el.style.touchAction = oldTouch;
  }
  r.domElement.addEventListener('webglcontextlost', dispose, listener);
  return { select, orient, dispose };
}
