import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STAR_FRAGMENT, STAR_VERTEX } from './shaders';

/** Interactive hero star: 26k shader-driven points, ring, drag and pointer wake. */
export default function DeadStar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch (error) {
      console.warn('The Dead Star could not initialize WebGL.', error);
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.SphereGeometry(0.985, 64, 64);
    const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x050506 });
    group.add(new THREE.Mesh(coreGeometry, coreMaterial));

    const count = 26000;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
      seeds[i] = Math.random();
    }

    const shellGeometry = new THREE.BufferGeometry();
    shellGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    shellGeometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector3(0, 0, 1) },
      uPush: { value: 0 },
      uSize: { value: 2.2 },
      uWhite: { value: new THREE.Color('#fafafa') },
      uGlow: { value: new THREE.Color('#b8c6d9') },
    };

    const shellMaterial = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: STAR_VERTEX,
      fragmentShader: STAR_FRAGMENT,
    });
    group.add(new THREE.Points(shellGeometry, shellMaterial));

    const ringGeometry = new THREE.TorusGeometry(1.62, 0.0016, 6, 320);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xb8c6d9,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.set(Math.PI / 2 - 0.34, 0, 0.12);
    group.add(ring);

    const ndc = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const sphere = new THREE.Sphere(new THREE.Vector3(), 1);
    const hit = new THREE.Vector3();
    const inverseQuaternion = new THREE.Quaternion();

    let push = 0;
    let dragging = false;
    let lastX = 0;
    let spin = 0.0012;
    let tiltX = 0;
    let tiltY = 0;

    function toObject() {
      raycaster.setFromCamera(ndc, camera);
      sphere.center.copy(group.position);
      if (!raycaster.ray.intersectSphere(sphere, hit)) {
        raycaster.ray.closestPointToPoint(group.position, hit);
      }
      uniforms.uPointer.value
        .copy(hit)
        .sub(group.position)
        .normalize()
        .applyQuaternion(inverseQuaternion.copy(group.quaternion).invert());
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      ndc.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      tiltY = ndc.x * 0.22;
      tiltX = ndc.y * 0.16;
      push = Math.min(push + 0.14, 1);
      toObject();

      if (dragging) {
        spin += (event.clientX - lastX) * 0.00018;
        lastX = event.clientX;
      }
    }

    function onPointerDown(event: PointerEvent) {
      dragging = true;
      lastX = event.clientX;
      canvas!.style.cursor = 'grabbing';
      canvas!.setPointerCapture(event.pointerId);
    }

    function onPointerUp() {
      dragging = false;
      canvas!.style.cursor = 'crosshair';
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;

      const wide = rect.width > 880;
      group.position.set(wide ? 1.35 : 0, wide ? 0.1 : -0.55, 0);
      camera.position.z = wide ? 4.2 : 5.4;
      uniforms.uSize.value = wide ? 2.2 : 1.9;
      camera.updateProjectionMatrix();
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.style.cursor = 'crosshair';
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', resize);
    resize();

    let frame = 0;
    const clock = new THREE.Clock();

    function loop() {
      frame = window.requestAnimationFrame(loop);
      if (document.hidden) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      if (!reducedMotion) {
        uniforms.uTime.value += dt;
        spin += (0.0012 - spin) * (1 - Math.exp(-1.2 * dt));
        group.rotation.y += spin * dt * 60;
        ring.rotation.z -= 0.0006 * dt * 60;
      }

      push *= Math.exp(-3.7 * dt);
      uniforms.uPush.value += (push - uniforms.uPush.value) * (1 - Math.exp(-7.65 * dt));
      const cameraEasing = 1 - Math.exp(-2.76 * dt);
      camera.position.x += (tiltY * 1.1 - camera.position.x) * cameraEasing;
      camera.position.y += (tiltX * 0.9 - camera.position.y) * cameraEasing;
      camera.lookAt(group.position.x * 0.55, group.position.y, 0);
      renderer.render(scene, camera);
    }

    loop();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      scene.remove(group);
      coreGeometry.dispose();
      coreMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="star-canvas" aria-hidden="true" />;
}
