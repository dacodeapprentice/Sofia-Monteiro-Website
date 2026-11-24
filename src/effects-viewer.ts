import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface EffectViewerInstance {
  loadEffect: (effectType: string, effectId: string) => void;
  toggleWireframe: () => boolean;
  resetView: () => void;
  toggleAutoRotate: () => boolean;
  resize: () => void;
  dispose: () => void;
}

interface BuiltEffect {
  group: THREE.Group;
  update: (elapsedTime: number) => void;
  dispose: () => void;
}

function buildParticlePoints(
  count: number,
  colorHex: number,
  size: number,
  spreadFn: (i: number) => [number, number, number]
): { points: THREE.Points; basePositions: Float32Array } {
  const positions = new Float32Array(count * 3);
  const basePositions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const [x, y, z] = spreadFn(i);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    basePositions[i * 3] = x;
    basePositions[i * 3 + 1] = y;
    basePositions[i * 3 + 2] = z;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: colorHex,
    size,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geo, mat);
  return { points, basePositions };
}

/**
 * Procedural Real-Time Shader & VFX Builders
 */
export function buildEffect(type: string): BuiltEffect {
  const group = new THREE.Group();
  const shaderMaterials: THREE.ShaderMaterial[] = [];
  const otherMaterials: THREE.Material[] = [];
  const updaters: Array<(t: number) => void> = [];

  switch (type) {
    case 'water': {
      // Stylized Water & Foam Shader Block
      const waterMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uDeepColor: { value: new THREE.Color(0x0369a1) },
          uShallowColor: { value: new THREE.Color(0x22d3ee) },
          uFoamColor: { value: new THREE.Color(0xf0f9ff) },
        },
        vertexShader: `
          uniform float uTime;
          varying vec2 vUv;
          varying float vWave;
          varying vec3 vNormalDir;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float w1 = sin(pos.x * 3.5 + uTime * 2.2) * 0.08;
            float w2 = cos(pos.z * 4.0 + uTime * 1.8) * 0.07;
            float w3 = sin((pos.x + pos.z) * 5.0 - uTime * 2.6) * 0.04;
            float wave = w1 + w2 + w3;
            pos.y += wave;
            vWave = wave;
            vNormalDir = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uDeepColor;
          uniform vec3 uShallowColor;
          uniform vec3 uFoamColor;
          varying vec2 vUv;
          varying float vWave;
          varying vec3 vNormalDir;

          float causticPattern(vec2 uv, float t) {
            vec2 p = uv * 8.0;
            float c1 = sin(p.x + sin(p.y + t)) + cos(p.y + cos(p.x - t));
            float c2 = sin((p.x - p.y) * 1.4 - t * 1.3);
            return smoothstep(1.1, 1.9, abs(c1 + c2 * 0.5));
          }

          void main() {
            float heightMix = smoothstep(-0.12, 0.14, vWave);
            vec3 col = mix(uDeepColor, uShallowColor, heightMix);

            // Animated caustic highlights
            float caustics = causticPattern(vUv, uTime * 1.4);
            col += vec3(0.18, 0.45, 0.55) * caustics;

            // Stylized shore & crest foam
            float edgeDist = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)) * 2.0;
            float shoreFoam = smoothstep(0.84, 0.96, edgeDist + sin(vUv.x * 24.0 + uTime * 3.0) * 0.03);
            float crestFoam = smoothstep(0.10, 0.16, vWave);
            float foam = clamp(shoreFoam + crestFoam * 0.75, 0.0, 1.0);

            col = mix(col, uFoamColor, foam);
            gl_FragColor = vec4(col, 0.92);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
      });
      shaderMaterials.push(waterMat);

      const waterGeo = new THREE.PlaneGeometry(2.4, 2.4, 48, 48);
      waterGeo.rotateX(-Math.PI / 2);
      const waterMesh = new THREE.Mesh(waterGeo, waterMat);
      waterMesh.position.y = 0.25;
      group.add(waterMesh);

      // Stylized stone basin rim & glowing submerged orb
      const rimMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.75, metalness: 0.15 });
      const orbMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0ea5e9,
        emissiveIntensity: 0.9,
        roughness: 0.2,
      });
      otherMaterials.push(rimMat, orbMat);

      const basinFloor = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.18, 2.55), rimMat);
      basinFloor.position.y = -0.35;
      group.add(basinFloor);

      const orb = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 1), orbMat);
      orb.position.set(0, -0.05, 0);
      group.add(orb);

      updaters.push((t) => {
        orb.rotation.y = t * 0.9;
        orb.position.y = -0.05 + Math.sin(t * 2.0) * 0.06;
      });
      break;
    }

    case 'sparks': {
      // Subsurface Emissive Spark Particles
      const crystalMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uCoreColor: { value: new THREE.Color(0xf472b6) },
          uRimColor: { value: new THREE.Color(0x22d3ee) },
        },
        vertexShader: `
          varying vec3 vNormalView;
          varying vec3 vViewPos;
          void main() {
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            vViewPos = -mvPos.xyz;
            vNormalView = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uCoreColor;
          uniform vec3 uRimColor;
          varying vec3 vNormalView;
          varying vec3 vViewPos;
          void main() {
            vec3 n = normalize(vNormalView);
            vec3 v = normalize(vViewPos);
            float fresnel = pow(1.0 - max(dot(n, v), 0.0), 2.2);
            float pulse = 0.75 + 0.25 * sin(uTime * 3.0);
            vec3 col = mix(uCoreColor * 0.75, uRimColor * 1.4, fresnel) * pulse;
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      });
      shaderMaterials.push(crystalMat);

      const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.62, 0), crystalMat);
      crystal.scale.set(0.85, 1.45, 0.85);
      group.add(crystal);

      const { points: pinkSparks, basePositions: pinkBase } = buildParticlePoints(140, 0xf472b6, 0.09, (i) => {
        const angle = (i / 140) * Math.PI * 10;
        const radius = 0.75 + (i % 7) * 0.14;
        const y = ((i % 20) - 10) * 0.12;
        return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
      });
      const { points: cyanSparks, basePositions: cyanBase } = buildParticlePoints(90, 0x22d3ee, 0.075, (i) => {
        const angle = (i / 90) * Math.PI * 8 + 1.2;
        const radius = 0.9 + (i % 5) * 0.15;
        const y = ((i % 15) - 7) * 0.14;
        return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
      });
      otherMaterials.push(pinkSparks.material as THREE.Material, cyanSparks.material as THREE.Material);
      group.add(pinkSparks, cyanSparks);

      updaters.push((t) => {
        crystal.rotation.y = t * 0.7;
        crystal.position.y = Math.sin(t * 2.0) * 0.08;

        const posA = pinkSparks.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < posA.count; i++) {
          const bx = pinkBase[i * 3];
          const by = pinkBase[i * 3 + 1];
          const bz = pinkBase[i * 3 + 2];
          const rot = t * (0.6 + (i % 4) * 0.15);
          const nx = bx * Math.cos(rot) - bz * Math.sin(rot);
          const nz = bx * Math.sin(rot) + bz * Math.cos(rot);
          const ny = ((by + t * 0.45 + 1.2) % 2.4) - 1.2;
          posA.setXYZ(i, nx, ny, nz);
        }
        posA.needsUpdate = true;

        const posB = cyanSparks.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < posB.count; i++) {
          const bx = cyanBase[i * 3];
          const by = cyanBase[i * 3 + 1];
          const bz = cyanBase[i * 3 + 2];
          const rot = -t * (0.5 + (i % 3) * 0.18);
          const nx = bx * Math.cos(rot) - bz * Math.sin(rot);
          const nz = bx * Math.sin(rot) + bz * Math.cos(rot);
          const ny = by + Math.sin(t * 2.2 + i) * 0.15;
          posB.setXYZ(i, nx, ny, nz);
        }
        posB.needsUpdate = true;
      });
      break;
    }

    case 'edgewear': {
      // Procedural Weathering & Edge Wear Node
      const wearMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPaintColor: { value: new THREE.Color(0x1e293b) },
          uWearColor: { value: new THREE.Color(0xe2e8f0) },
          uRustColor: { value: new THREE.Color(0xf43f5e) },
        },
        vertexShader: `
          varying vec3 vLocalPos;
          varying vec3 vNormalView;
          varying vec3 vObjNormal;
          void main() {
            vLocalPos = position;
            vObjNormal = normal;
            vNormalView = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uPaintColor;
          uniform vec3 uWearColor;
          uniform vec3 uRustColor;
          varying vec3 vLocalPos;
          varying vec3 vNormalView;
          varying vec3 vObjNormal;

          float hash(vec3 p) {
            return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
          }

          float noise3(vec3 p) {
            vec3 i = floor(p);
            vec3 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(
              mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                  mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
              mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                  mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
              f.z
            );
          }

          void main() {
            vec3 absP = abs(vLocalPos);
            float maxCoord = max(absP.x, max(absP.y, absP.z));
            float secCoord = max(min(absP.x, absP.y), min(max(absP.x, absP.y), absP.z));
            float edgeDist = abs(maxCoord - secCoord);
            float n = noise3(vLocalPos * 6.5 + vec3(sin(uTime * 0.4) * 0.2));
            float edgeMask = 1.0 - smoothstep(0.02, 0.16 + n * 0.12, edgeDist);

            // Cavity grime / accent
            float grime = smoothstep(0.42, 0.72, noise3(vLocalPos * 4.0));
            vec3 lightDir = normalize(vec3(0.5, 0.8, 0.6));
            float diffuse = max(dot(normalize(vNormalView), lightDir), 0.25);

            vec3 base = mix(uPaintColor, uRustColor * 0.45, grime * 0.55);
            vec3 col = mix(base, uWearColor, edgeMask) * diffuse;
            col += uWearColor * edgeMask * 0.25;
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      });
      shaderMaterials.push(wearMat);

      const coreBox = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.15, 1.15, 8, 8, 8), wearMat);
      group.add(coreBox);

      const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.42, 0.12, 96, 16), wearMat);
      torusKnot.position.set(0, 0.92, 0);
      torusKnot.scale.setScalar(0.65);
      group.add(torusKnot);

      updaters.push((t) => {
        torusKnot.rotation.y = t * 0.6;
        torusKnot.rotation.x = Math.sin(t * 0.5) * 0.25;
      });
      break;
    }

    case 'forcefield': {
      // Holographic Hex Forcefield Shield
      const shieldMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color(0xec4899) },
          uColorB: { value: new THREE.Color(0x22d3ee) },
        },
        vertexShader: `
          varying vec3 vNormalView;
          varying vec3 vViewPos;
          varying vec3 vWorldPos;
          void main() {
            vWorldPos = position;
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            vViewPos = -mvPos.xyz;
            vNormalView = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying vec3 vNormalView;
          varying vec3 vViewPos;
          varying vec3 vWorldPos;

          void main() {
            vec3 n = normalize(vNormalView);
            vec3 v = normalize(vViewPos);
            float fresnel = pow(1.0 - abs(dot(n, v)), 2.0);

            float gridA = abs(sin(vWorldPos.y * 14.0 - uTime * 3.5));
            float scanline = smoothstep(0.85, 1.0, gridA);

            float hexPattern = smoothstep(0.75, 0.95, abs(sin(vWorldPos.x * 12.0 + vWorldPos.z * 8.0) * cos(vWorldPos.y * 12.0)));
            vec3 col = mix(uColorB, uColorA, 0.5 + 0.5 * sin(vWorldPos.y * 3.0 - uTime * 2.0));
            float alpha = clamp(fresnel * 0.9 + scanline * 0.45 + hexPattern * 0.2, 0.12, 0.95);
            gl_FragColor = vec4(col * (1.0 + scanline * 0.6), alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      shaderMaterials.push(shieldMat);

      const shieldSphere = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 3), shieldMat);
      group.add(shieldSphere);

      const emitterMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.25 });
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xf472b6,
        emissive: 0xec4899,
        emissiveIntensity: 1.1,
      });
      otherMaterials.push(emitterMat, ringMat);

      const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.32, 1), emitterMat);
      group.add(core);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.025, 12, 48), ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      updaters.push((t) => {
        core.rotation.y = -t * 1.1;
        ring.rotation.z = t * 0.8;
        ring.rotation.x = Math.PI / 2 + Math.sin(t * 1.4) * 0.25;
      });
      break;
    }

    case 'portal': {
      // Arcane Portal Energy Vortex
      const vortexMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uInnerColor: { value: new THREE.Color(0xf472b6) },
          uOuterColor: { value: new THREE.Color(0x6366f1) },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uInnerColor;
          uniform vec3 uOuterColor;
          varying vec2 vUv;

          void main() {
            vec2 p = (vUv - 0.5) * 2.0;
            float r = length(p);
            if (r > 1.0) discard;
            float a = atan(p.y, p.x);
            float swirl = sin(a * 5.0 + r * 12.0 - uTime * 5.0) * 0.5 + 0.5;
            float rings = sin(r * 16.0 - uTime * 4.5) * 0.5 + 0.5;
            float intensity = mix(swirl, rings, 0.45);
            vec3 col = mix(uInnerColor * 1.4, uOuterColor, r);
            col += vec3(0.4, 0.9, 1.0) * smoothstep(0.75, 1.0, intensity) * (1.0 - r * 0.6);
            float alpha = smoothstep(1.0, 0.72, r) * (0.65 + 0.35 * intensity);
            gl_FragColor = vec4(col, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      shaderMaterials.push(vortexMat);

      const disc = new THREE.Mesh(new THREE.CircleGeometry(0.95, 48), vortexMat);
      group.add(disc);

      const frameMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85, roughness: 0.3 });
      const runeMat = new THREE.MeshStandardMaterial({
        color: 0xf472b6,
        emissive: 0xec4899,
        emissiveIntensity: 1.2,
      });
      otherMaterials.push(frameMat, runeMat);

      const arch = new THREE.Mesh(new THREE.TorusGeometry(1.02, 0.1, 14, 48), frameMat);
      group.add(arch);

      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI * 2) / 6;
        const rune = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 0), runeMat);
        rune.position.set(Math.cos(ang) * 1.02, Math.sin(ang) * 1.02, 0.08);
        group.add(rune);
      }

      const { points: motes, basePositions } = buildParticlePoints(80, 0xf9a8d4, 0.07, (i) => {
        const ang = (i / 80) * Math.PI * 6;
        const rad = 0.25 + (i % 10) * 0.08;
        return [Math.cos(ang) * rad, Math.sin(ang) * rad, ((i % 7) - 3) * 0.12];
      });
      otherMaterials.push(motes.material as THREE.Material);
      group.add(motes);

      updaters.push((t) => {
        const pos = motes.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < pos.count; i++) {
          const bx = basePositions[i * 3];
          const by = basePositions[i * 3 + 1];
          const bz = basePositions[i * 3 + 2];
          const ang = t * 1.6;
          pos.setXYZ(
            i,
            bx * Math.cos(ang) - by * Math.sin(ang),
            bx * Math.sin(ang) + by * Math.cos(ang),
            bz + Math.sin(t * 2.5 + i) * 0.14
          );
        }
        pos.needsUpdate = true;
      });
      break;
    }

    case 'toon': {
      // Cel-Shaded Toon Rim Shader
      const toonMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uBaseColor: { value: new THREE.Color(0xec4899) },
          uMidColor: { value: new THREE.Color(0x9d174d) },
          uShadowColor: { value: new THREE.Color(0x3b0764) },
          uRimColor: { value: new THREE.Color(0x67e8f9) },
        },
        vertexShader: `
          varying vec3 vNormalView;
          varying vec3 vViewPos;
          void main() {
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            vViewPos = -mvPos.xyz;
            vNormalView = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uBaseColor;
          uniform vec3 uMidColor;
          uniform vec3 uShadowColor;
          uniform vec3 uRimColor;
          varying vec3 vNormalView;
          varying vec3 vViewPos;

          void main() {
            vec3 n = normalize(vNormalView);
            vec3 v = normalize(vViewPos);
            vec3 lightDir = normalize(vec3(sin(uTime * 0.8), 0.7, cos(uTime * 0.8)));

            float ndl = dot(n, lightDir);
            vec3 band = ndl > 0.45 ? uBaseColor : (ndl > 0.0 ? uMidColor : uShadowColor);

            float fresnel = pow(1.0 - max(dot(n, v), 0.0), 3.0);
            float rimStep = smoothstep(0.35, 0.45, fresnel);
            vec3 col = mix(band, uRimColor, rimStep);

            // Stylized specular cel dot
            vec3 halfVec = normalize(lightDir + v);
            float spec = step(0.92, dot(n, halfVec));
            col += vec3(1.0) * spec * 0.65;

            gl_FragColor = vec4(col, 1.0);
          }
        `,
      });
      shaderMaterials.push(toonMat);

      const outlineMat = new THREE.MeshBasicMaterial({ color: 0x020617, side: THREE.BackSide });
      otherMaterials.push(outlineMat);

      const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.62, 0.22, 128, 24), toonMat);
      const outline = new THREE.Mesh(new THREE.TorusKnotGeometry(0.62, 0.245, 128, 24), outlineMat);
      group.add(knot, outline);

      updaters.push((t) => {
        group.rotation.y = t * 0.55;
      });
      break;
    }

    case 'fire': {
      // Stylized Ember & Fire Plume VFX
      const flameMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uHotColor: { value: new THREE.Color(0xfef08a) },
          uMidColor: { value: new THREE.Color(0xf97316) },
          uTipColor: { value: new THREE.Color(0xec4899) },
        },
        vertexShader: `
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float sway = sin(pos.y * 4.5 - uTime * 6.0) * 0.12 * uv.y;
            pos.x += sway;
            pos.z += cos(pos.y * 3.8 - uTime * 5.0) * 0.08 * uv.y;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uHotColor;
          uniform vec3 uMidColor;
          uniform vec3 uTipColor;
          varying vec2 vUv;

          void main() {
            float flicker = sin(vUv.y * 10.0 - uTime * 8.0 + sin(vUv.x * 12.0)) * 0.5 + 0.5;
            float shape = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.15, vUv.y);
            float mask = shape * (0.55 + 0.45 * flicker);
            if (mask < 0.15) discard;

            vec3 col = mix(uHotColor, uMidColor, smoothstep(0.0, 0.55, vUv.y));
            col = mix(col, uTipColor, smoothstep(0.55, 0.95, vUv.y));
            gl_FragColor = vec4(col * 1.35, clamp(mask * 1.2, 0.0, 0.95));
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      shaderMaterials.push(flameMat);

      const outerFlame = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.7, 24, 20, true), flameMat);
      outerFlame.position.y = 0.2;
      const innerFlame = new THREE.Mesh(new THREE.ConeGeometry(0.38, 1.2, 20, 16, true), flameMat);
      innerFlame.position.y = 0.05;
      group.add(outerFlame, innerFlame);

      const brazierMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.35 });
      otherMaterials.push(brazierMat);
      const brazier = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.5, 0.35, 10), brazierMat);
      brazier.position.y = -0.68;
      group.add(brazier);

      const { points: embers, basePositions } = buildParticlePoints(75, 0xfb923c, 0.08, (i) => {
        const ang = i * 0.9;
        const rad = 0.18 + (i % 6) * 0.09;
        return [Math.cos(ang) * rad, (i % 15) * 0.12 - 0.3, Math.sin(ang) * rad];
      });
      otherMaterials.push(embers.material as THREE.Material);
      group.add(embers);

      updaters.push((t) => {
        const pos = embers.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < pos.count; i++) {
          const bx = basePositions[i * 3];
          const by = basePositions[i * 3 + 1];
          const bz = basePositions[i * 3 + 2];
          const rise = ((by + t * (0.7 + (i % 4) * 0.15) + 0.5) % 2.1) - 0.5;
          pos.setXYZ(i, bx + Math.sin(t * 3.0 + i) * 0.12, rise, bz + Math.cos(t * 2.5 + i) * 0.12);
        }
        pos.needsUpdate = true;
      });
      break;
    }

    case 'dissolve':
    default: {
      // Triplanar Dissolve & Burn Edge Shader
      const dissolveMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uSurfaceColor: { value: new THREE.Color(0x1e293b) },
          uEdgeColor: { value: new THREE.Color(0xf43f5e) },
          uGlowColor: { value: new THREE.Color(0xfde047) },
        },
        vertexShader: `
          varying vec3 vLocalPos;
          varying vec3 vNormalView;
          void main() {
            vLocalPos = position;
            vNormalView = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uSurfaceColor;
          uniform vec3 uEdgeColor;
          uniform vec3 uGlowColor;
          varying vec3 vLocalPos;
          varying vec3 vNormalView;

          float triNoise(vec3 p) {
            return (sin(p.x * 5.0) * cos(p.y * 5.0) + sin(p.z * 6.0) * 0.5) * 0.5 + 0.5;
          }

          void main() {
            float n = triNoise(vLocalPos * 1.4);
            float threshold = 0.45 + 0.35 * sin(uTime * 1.5);
            if (n < threshold) discard;

            float edgeBand = 1.0 - smoothstep(threshold, threshold + 0.09, n);
            vec3 lightDir = normalize(vec3(0.6, 0.8, 0.5));
            float diff = max(dot(normalize(vNormalView), lightDir), 0.25);

            vec3 base = uSurfaceColor * diff;
            vec3 burn = mix(uEdgeColor, uGlowColor, edgeBand);
            vec3 col = mix(base, burn * 1.6, edgeBand);

            gl_FragColor = vec4(col, 1.0);
          }
        `,
        side: THREE.DoubleSide,
      });
      shaderMaterials.push(dissolveMat);

      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xf43f5e,
        emissive: 0xec4899,
        emissiveIntensity: 1.1,
      });
      otherMaterials.push(coreMat);

      const outerShell = new THREE.Mesh(new THREE.IcosahedronGeometry(0.92, 2), dissolveMat);
      const innerCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), coreMat);
      group.add(outerShell, innerCore);

      updaters.push((t) => {
        outerShell.rotation.y = t * 0.45;
        innerCore.rotation.y = -t * 1.1;
        innerCore.rotation.x = t * 0.6;
      });
      break;
    }
  }

  return {
    group,
    update(elapsedTime: number) {
      shaderMaterials.forEach((mat) => {
        if (mat.uniforms.uTime) mat.uniforms.uTime.value = elapsedTime;
      });
      updaters.forEach((fn) => fn(elapsedTime));
    },
    dispose() {
      group.traverse((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
          child.geometry.dispose();
        }
      });
      shaderMaterials.forEach((mat) => mat.dispose());
      otherMaterials.forEach((mat) => mat.dispose());
    },
  };
}

// Global Thumbnail Generator & Cache for Effects
const thumbnailCache = new Map<string, string>();
let offscreenCanvas: HTMLCanvasElement | null = null;
let offscreenRenderer: THREE.WebGLRenderer | null = null;
let offscreenScene: THREE.Scene | null = null;
let offscreenCamera: THREE.PerspectiveCamera | null = null;

export function generateEffectThumbnail(effectType: string, width = 280, height = 210): string {
  if (typeof window === 'undefined') return '';
  if (thumbnailCache.has(effectType)) return thumbnailCache.get(effectType)!;

  try {
    if (!offscreenCanvas) {
      offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = width;
      offscreenCanvas.height = height;

      offscreenRenderer = new THREE.WebGLRenderer({
        canvas: offscreenCanvas,
        antialias: true,
        preserveDrawingBuffer: true,
        alpha: false,
      });
      offscreenRenderer.setSize(width, height);
      offscreenRenderer.setPixelRatio(1);
      offscreenRenderer.toneMapping = THREE.ACESFilmicToneMapping;
      offscreenRenderer.toneMappingExposure = 1.2;

      offscreenScene = new THREE.Scene();
      offscreenScene.background = new THREE.Color(0x090710);

      offscreenCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);

      const hemi = new THREE.HemisphereLight(0xf9a8d4, 0x0f172a, 0.9);
      offscreenScene.add(hemi);

      const mainLight = new THREE.DirectionalLight(0xffffff, 2.1);
      mainLight.position.set(4, 7, 5);
      offscreenScene.add(mainLight);

      const rimLight = new THREE.DirectionalLight(0xec4899, 2.0);
      rimLight.position.set(-5, 3, -5);
      offscreenScene.add(rimLight);

      const fillLight = new THREE.DirectionalLight(0x22d3ee, 1.0);
      fillLight.position.set(3, -2, -3);
      offscreenScene.add(fillLight);
    }

    if (!offscreenScene || !offscreenRenderer || !offscreenCamera) return '';

    const toRemove: THREE.Object3D[] = [];
    offscreenScene.children.forEach((child) => {
      if (child instanceof THREE.Group) toRemove.push(child);
    });
    toRemove.forEach((obj) => offscreenScene?.remove(obj));

    const built = buildEffect(effectType);
    built.update(1.65);
    offscreenScene.add(built.group);

    const box = new THREE.Box3().setFromObject(built.group);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    built.group.position.x = -center.x;
    built.group.position.y = -center.y + size.y * 0.05;
    built.group.position.z = -center.z;

    const maxDim = Math.max(size.x, size.y, size.z, 1.5);
    const fov = offscreenCamera.fov * (Math.PI / 180);
    const dist = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.5;

    offscreenCamera.position.set(dist * 0.72, dist * 0.52, dist * 0.92);
    offscreenCamera.lookAt(0, 0, 0);

    offscreenRenderer.render(offscreenScene, offscreenCamera);
    const dataUrl = offscreenCanvas.toDataURL('image/webp', 0.85);

    offscreenScene.remove(built.group);
    built.dispose();

    if (dataUrl && dataUrl.startsWith('data:image')) {
      thumbnailCache.set(effectType, dataUrl);
      return dataUrl;
    }
  } catch (err) {
    console.warn('[effects-viewer] Could not generate offscreen thumbnail for', effectType, err);
  }

  return '';
}

export function getEffectThumbnailUrl(effectType: string, staticUrl?: string): string {
  const generated = generateEffectThumbnail(effectType);
  if (generated) return generated;
  return staticUrl || '/assets/models/drone.jpg';
}

/**
 * Main Interactive Three.js Effect Viewer Controller
 */
export function initEffectViewer(container: HTMLElement): EffectViewerInstance {
  const width = container.clientWidth || 600;
  const height = container.clientHeight || 450;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x090710);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(3, 2.2, 4);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = true;
  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.minDistance = 1.4;
  controls.maxDistance = 12;
  controls.maxPolarAngle = Math.PI * 0.85;
  controls.target.set(0, 0, 0);

  const hemiLight = new THREE.HemisphereLight(0xf9a8d4, 0x0f172a, 0.85);
  scene.add(hemiLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
  mainLight.position.set(5, 8, 5);
  scene.add(mainLight);

  const rimLight = new THREE.DirectionalLight(0xec4899, 1.9);
  rimLight.position.set(-6, 3, -6);
  scene.add(rimLight);

  const fillLight = new THREE.DirectionalLight(0x22d3ee, 1.0);
  fillLight.position.set(4, -2, -3);
  scene.add(fillLight);

  // Pink-tinted Ground Pedestal Grid
  const gridHelper = new THREE.GridHelper(8, 16, 0xdb2777, 0x500724);
  gridHelper.position.y = -1.05;
  (gridHelper.material as THREE.Material).opacity = 0.38;
  (gridHelper.material as THREE.Material).transparent = true;
  scene.add(gridHelper);

  const shadowGeo = new THREE.CircleGeometry(1.7, 32);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x030208,
    transparent: true,
    opacity: 0.65,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -1.04;
  scene.add(shadowMesh);

  let currentEffect: BuiltEffect | null = null;
  let isWireframe = false;
  let isAutoRotate = false;
  let animFrameId: number | null = null;
  const clock = new THREE.Clock();
  const defaultCamPos = new THREE.Vector3(3, 2.2, 4);

  function applyWireframeState(group: THREE.Group, wireframe: boolean) {
    group.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => {
            if ('wireframe' in m) (m as THREE.MeshBasicMaterial).wireframe = wireframe;
          });
        } else if ('wireframe' in child.material) {
          (child.material as THREE.MeshBasicMaterial).wireframe = wireframe;
        }
      }
    });
  }

  function animate() {
    animFrameId = requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    if (currentEffect) {
      currentEffect.update(elapsed);
      if (isAutoRotate) {
        currentEffect.group.rotation.y += 0.01;
      }
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  return {
    loadEffect(effectType: string, _effectId: string) {
      if (currentEffect) {
        scene.remove(currentEffect.group);
        currentEffect.dispose();
        currentEffect = null;
      }

      const built = buildEffect(effectType);
      currentEffect = built;
      scene.add(built.group);

      if (isWireframe) {
        applyWireframeState(built.group, true);
      }

      const box = new THREE.Box3().setFromObject(built.group);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      built.group.position.x = -center.x;
      built.group.position.y = -center.y + size.y * 0.08;
      built.group.position.z = -center.z;

      const maxDim = Math.max(size.x, size.y, size.z, 1.4);
      const fov = camera.fov * (Math.PI / 180);
      const cameraDistance = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.55;

      defaultCamPos.set(cameraDistance * 0.72, cameraDistance * 0.52, cameraDistance * 0.92);
      camera.position.copy(defaultCamPos);
      controls.target.set(0, 0, 0);
      controls.update();
    },

    toggleWireframe() {
      isWireframe = !isWireframe;
      if (currentEffect) {
        applyWireframeState(currentEffect.group, isWireframe);
      }
      return isWireframe;
    },

    resetView() {
      camera.position.copy(defaultCamPos);
      controls.target.set(0, 0, 0);
      if (currentEffect) {
        currentEffect.group.rotation.set(0, 0, 0);
      }
      controls.update();
    },

    toggleAutoRotate() {
      isAutoRotate = !isAutoRotate;
      return isAutoRotate;
    },

    resize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    },

    dispose() {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      controls.dispose();

      if (currentEffect) {
        scene.remove(currentEffect.group);
        currentEffect.dispose();
        currentEffect = null;
      }

      gridHelper.geometry.dispose();
      (gridHelper.material as THREE.Material).dispose();
      shadowGeo.dispose();
      shadowMat.dispose();

      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    },
  };
}
