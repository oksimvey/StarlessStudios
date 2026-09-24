import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DUST_FRAGMENT, DUST_VERTEX } from './shaders';

/** The fixed, subtle background particle field from the original page. */
export default function GlobalDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch (error) {
      console.warn('Background particles could not initialize WebGL.', error);
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.z = 8;

    const count = 1500;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.random() * 7.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const flatten = 0.58;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * flatten;
      positions[i * 3 + 2] = radius * Math.cos(phi);
      seeds[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: 1.65 },
    };
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms,
      vertexShader: DUST_VERTEX,
      fragmentShader: DUST_FRAGMENT,
    });

    const dust = new THREE.Points(geometry, material);
    dust.rotation.x = -0.08;
    dust.rotation.z = 0.04;
    scene.add(dust);

    function resize() {
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    let frame = 0;
    const clock = new THREE.Clock();

    function loop() {
      frame = window.requestAnimationFrame(loop);
      if (document.hidden) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      if (!reducedMotion) {
        uniforms.uTime.value += dt;
        dust.rotation.y += dt * 0.012;
        dust.rotation.x += dt * 0.0015;
      }
      renderer.render(scene, camera);
    }

    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      scene.remove(dust);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="dust-canvas" aria-hidden="true" />;
}
