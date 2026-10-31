"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { buildLinks, buildShapes } from "./shapes";

const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute vec3 aIntel;
  attribute vec3 aInsight;
  attribute vec3 aColor;
  attribute vec4 aMeta;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float delay = aMeta.x * 0.35;
    float t1 = smoothstep(0.0, 1.0, clamp((uProgress - delay) / 0.65, 0.0, 1.0));
    float t2 = smoothstep(0.0, 1.0, clamp((uProgress - 1.0 - delay) / 0.65, 0.0, 1.0));

    vec3 data = position;
    float flow = aMeta.z * (1.0 - t1);
    data.x = mix(data.x, mod(data.x + uTime * 0.45 + 4.2, 8.4) - 4.2, aMeta.z);

    vec3 pos = mix(mix(data, aIntel, t1), aInsight, t2);
    float drift = 0.035 * (1.0 + (1.0 - t2) * 1.5);
    pos += vec3(
      sin(uTime * 0.7 + aMeta.w),
      cos(uTime * 0.6 + aMeta.w * 1.3),
      sin(uTime * 0.5 + aMeta.w * 0.7)
    ) * drift;

    vec4 world = modelMatrix * vec4(pos, 1.0);
    vec2 away = world.xy - uMouse.xy;
    float dist = length(away);
    float force = smoothstep(1.1, 0.0, dist);
    world.xy += normalize(away + 0.0001) * force * 0.5;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aMeta.y * uPixelRatio * (1.0 / -mv.z) * (1.0 + t2 * 0.25);

    vColor = aColor;
    float edge = mix(1.0, smoothstep(4.2, 3.4, abs(data.x)), flow);
    vAlpha = edge * (0.55 + 0.45 * t2 + 0.25 * t1);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.15, d) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

function Particles({ count, progressRef }) {
  const group = useRef(null);
  const material = useRef(null);
  const links = useRef(null);
  const smooth = useRef(0);
  const spin = useRef(0);
  const snap = useRef(null);
  const { viewport, pointer, gl } = useThree();

  const { geometry, linkGeometry } = useMemo(() => {
    const shapes = buildShapes(count);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(shapes.data, 3));
    geo.setAttribute("aIntel", new THREE.BufferAttribute(shapes.intel, 3));
    geo.setAttribute("aInsight", new THREE.BufferAttribute(shapes.insight, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(shapes.colors, 3));
    geo.setAttribute("aMeta", new THREE.BufferAttribute(shapes.meta, 4));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(buildLinks(shapes.intel), 3));
    return { geometry: geo, linkGeometry: lineGeo };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uSize: { value: 26 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.75) },
    }),
    [gl],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      linkGeometry.dispose();
    },
    [geometry, linkGeometry],
  );

  useFrame((state, delta) => {
    const target = progressRef.current * 2;
    smooth.current += (target - smooth.current) * Math.min(1, delta * 4);
    const progress = smooth.current;
    const u = material.current.uniforms;
    u.uProgress.value = progress;
    u.uTime.value = state.clock.elapsedTime;
    u.uMouse.value.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0);

    const settle = THREE.MathUtils.clamp(progress - 1, 0, 1);
    spin.current += delta * 0.16 * (1 - settle);
    if (settle > 0 && snap.current === null) {
      snap.current = Math.ceil(spin.current / (Math.PI * 2)) * Math.PI * 2;
    }
    if (settle === 0) snap.current = null;
    const rotationY =
      snap.current === null
        ? spin.current
        : THREE.MathUtils.lerp(spin.current, snap.current, settle) + Math.sin(state.clock.elapsedTime * 0.5) * 0.12 * settle;

    const g = group.current;
    g.rotation.y = rotationY + pointer.x * 0.18;
    g.rotation.x = -pointer.y * 0.12;

    const linkOpacity = THREE.MathUtils.clamp(progress, 0, 1) * (1 - settle);
    links.current.material.opacity = linkOpacity * 0.28;
    links.current.visible = linkOpacity > 0.01;
  });

  return (
    <group ref={group}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
        />
      </points>
      <lineSegments ref={links} geometry={linkGeometry}>
        <lineBasicMaterial color="#e94f1c" transparent opacity={0} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function ParticleField({ progressRef, active, onReady, eventSource }) {
  const count = useMemo(() => (typeof window !== "undefined" && window.innerWidth < 768 ? 6000 : 12000), []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      onCreated={() => onReady?.()}
      eventSource={eventSource}
      eventPrefix="client"
    >
      <Particles count={count} progressRef={progressRef} />
    </Canvas>
  );
}
