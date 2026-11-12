"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ACCENT, CAM_Y, GLOBE_CSS_PX, GLOBE_EASE, HEAD_Y, ORBIT_R, SKIN, VIEW_POS, VIEW_TARGET } from "./AngleGlobe.constants";

const PROFILE = [
  [0.001, 0],
  [0.34, 0],
  [0.29, 0.3],
  [0.33, 0.52],
  [0.4, 0.64],
  [0.34, 0.73],
  [0.14, 0.8],
  [0.085, 0.84],
  [0.085, 0.9],
  [0.001, 0.9],
];

const withEdges = (mesh: THREE.Mesh) => {
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 25), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22 }));
  mesh.add(edges);
  return mesh;
};

const buildDummy = (material: THREE.Material) => {
  const dummy = new THREE.Group();
  const bust = withEdges(new THREE.Mesh(new THREE.LatheGeometry(PROFILE.map(([x, y]) => new THREE.Vector2(x, y)), 10), material));
  bust.scale.set(1, 1, 0.72);
  const head = withEdges(new THREE.Mesh(new THREE.IcosahedronGeometry(0.17, 1), material));
  head.position.y = HEAD_Y;
  head.scale.set(0.92, 1.12, 1);
  dummy.add(bust, head);
  return dummy;
};

const buildFloor = () => {
  const floor = new THREE.Group();
  const grid = new THREE.GridHelper(4, 16, 0x8a8a90, 0x4a4a50);
  (Array.isArray(grid.material) ? grid.material : [grid.material]).forEach((m) => Object.assign(m, { transparent: true, opacity: 0.8 }));
  const axis = (from: THREE.Vector3, to: THREE.Vector3, color: number) => new THREE.Line(new THREE.BufferGeometry().setFromPoints([from, to]), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.85 }));
  floor.add(grid, axis(new THREE.Vector3(-2, 0.002, 0), new THREE.Vector3(2, 0.002, 0), 0xff4d5e), axis(new THREE.Vector3(0, 0.002, -2), new THREE.Vector3(0, 0.002, 2), 0x4d8dff));
  const ring = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(Array.from({ length: 129 }, (_, k) => new THREE.Vector3(Math.sin((k / 128) * Math.PI * 2) * ORBIT_R, 0.004, Math.cos((k / 128) * Math.PI * 2) * ORBIT_R))),
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 }),
  );
  floor.add(ring);
  return floor;
};

const buildCamera = () => {
  const d = 0.42;
  const w = 0.2;
  const h = 0.14;
  const apex = new THREE.Vector3(0, 0, 0);
  const c = [new THREE.Vector3(-w, h, -d), new THREE.Vector3(w, h, -d), new THREE.Vector3(w, -h, -d), new THREE.Vector3(-w, -h, -d)];
  const up = [new THREE.Vector3(-w * 0.55, h + 0.03, -d), new THREE.Vector3(0, h + 0.13, -d), new THREE.Vector3(w * 0.55, h + 0.03, -d)];
  const pts = [apex, c[0], apex, c[1], apex, c[2], apex, c[3], c[0], c[1], c[1], c[2], c[2], c[3], c[3], c[0], up[0], up[1], up[1], up[2], up[2], up[0]];
  const cam = new THREE.Group();
  cam.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: ACCENT })));
  const lens = new THREE.Mesh(new THREE.PlaneGeometry(w * 2, h * 2), new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false }));
  lens.position.z = -d;
  cam.add(lens);
  return cam;
};

export function useAngleGlobe(angles: number[], active: number, onPick: (i: number) => void) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const target = useRef((angles[active] * Math.PI) / 180);
  const current = useRef(active);
  const pickRef = useRef(onPick);

  useEffect(() => {
    target.current = (angles[active] * Math.PI) / 180;
    current.current = active;
  }, [angles, active]);

  useEffect(() => {
    pickRef.current = onPick;
  }, [onPick]);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setSize(GLOBE_CSS_PX, GLOBE_CSS_PX, false);
    const scene = new THREE.Scene();
    const view = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    view.position.set(...VIEW_POS);
    view.lookAt(...VIEW_TARGET);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x2a2c30, 1.4));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(2.5, 4, 2);
    scene.add(key);

    scene.add(buildFloor());
    scene.add(buildDummy(new THREE.MeshStandardMaterial({ color: SKIN, roughness: 0.7, flatShading: true })));

    const tickMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const tickOn = new THREE.MeshBasicMaterial({ color: ACCENT });
    const ticks = angles.map((deg) => {
      const a = (deg * Math.PI) / 180;
      const tick = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 12), tickMat);
      tick.position.set(Math.sin(a) * ORBIT_R, 0.004, Math.cos(a) * ORBIT_R);
      scene.add(tick);
      return tick;
    });

    const cam = buildCamera();
    scene.add(cam);
    const guide = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), new THREE.LineDashedMaterial({ color: ACCENT, dashSize: 0.05, gapSize: 0.05, transparent: true, opacity: 0.6 }));
    scene.add(guide);
    const look = new THREE.Vector3(0, HEAD_Y - 0.15, 0);

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let yaw = target.current;
    let raf = 0;
    let visible = false;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const gap = target.current - yaw;
      yaw += (gap - Math.PI * 2 * Math.round(gap / (Math.PI * 2))) * (still ? 1 : GLOBE_EASE);
      cam.position.set(Math.sin(yaw) * ORBIT_R, CAM_Y, Math.cos(yaw) * ORBIT_R);
      cam.lookAt(look);
      cam.rotateY(Math.PI);
      guide.geometry.setFromPoints([new THREE.Vector3(cam.position.x, 0.004, cam.position.z), cam.position.clone()]);
      guide.computeLineDistances();
      ticks.forEach((t, i) => {
        t.material = i === current.current ? tickOn : tickMat;
      });
      renderer.render(scene, view);
    };
    raf = requestAnimationFrame(frame);

    const ray = new THREE.Raycaster();
    const onClick = (e: MouseEvent) => {
      const box = el.getBoundingClientRect();
      ray.setFromCamera(new THREE.Vector2(((e.clientX - box.left) / box.width) * 2 - 1, -((e.clientY - box.top) / box.height) * 2 + 1), view);
      let best = -1;
      let dist = 0.34;
      ticks.forEach((t, i) => {
        const dd = ray.ray.distanceToPoint(t.position);
        if (dd < dist) {
          dist = dd;
          best = i;
        }
      });
      if (best >= 0) pickRef.current(best);
    };
    el.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("click", onClick);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Line) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
    };
  }, [angles]);

  return { canvas };
}
