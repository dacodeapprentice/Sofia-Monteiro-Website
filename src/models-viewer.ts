import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface ModelViewerInstance {
  loadModel: (meshType: string, modelId: string) => void;
  toggleWireframe: () => boolean;
  resetView: () => void;
  toggleAutoRotate: () => boolean;
  resize: () => void;
  dispose: () => void;
}

export interface MaterialLibrary {
  brass: THREE.MeshStandardMaterial;
  darkSteel: THREE.MeshStandardMaterial;
  brightSteel: THREE.MeshStandardMaterial;
  cyanGlow: THREE.MeshStandardMaterial;
  emeraldGlow: THREE.MeshStandardMaterial;
  rubyGlow: THREE.MeshStandardMaterial;
  oakWood: THREE.MeshStandardMaterial;
  stone: THREE.MeshStandardMaterial;
  moss: THREE.MeshStandardMaterial;
  glass: THREE.MeshPhysicalMaterial;
  whiteArmor: THREE.MeshStandardMaterial;
}

export function createMaterialLibrary(): MaterialLibrary {
  return {
    brass: new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.85,
      roughness: 0.25,
    }),
    darkSteel: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.3,
    }),
    brightSteel: new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.15,
    }),
    cyanGlow: new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x22d3ee,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.1,
    }),
    emeraldGlow: new THREE.MeshStandardMaterial({
      color: 0x059669,
      emissive: 0x10b981,
      emissiveIntensity: 1.0,
      roughness: 0.2,
    }),
    rubyGlow: new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      emissive: 0xf43f5e,
      emissiveIntensity: 1.2,
      roughness: 0.2,
    }),
    oakWood: new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.75,
      metalness: 0.05,
    }),
    stone: new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.85,
      metalness: 0.1,
    }),
    moss: new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.9,
      metalness: 0.05,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.7,
      opacity: 0.9,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
    }),
    whiteArmor: new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.5,
      roughness: 0.25,
    }),
  };
}

/**
 * Procedural Builders for each 3D model mesh
 */
export function buildMesh(type: string, mats: MaterialLibrary): THREE.Group {
  const group = new THREE.Group();

  switch (type) {
    case 'lantern': {
      // Base and top cap
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.15, 8), mats.brass);
      base.position.y = -0.7;
      group.add(base);

      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.45, 8), mats.brass);
      cap.position.y = 0.75;
      group.add(cap);

      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.04, 8, 24), mats.brass);
      ring.position.y = 1.1;
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      // 4 Vertical Pillars
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.3, 8), mats.brass);
        pillar.position.set(Math.cos(angle) * 0.45, 0, Math.sin(angle) * 0.45);
        group.add(pillar);
      }

      // Inner glowing crystal
      const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.4, 0), mats.cyanGlow);
      crystal.position.y = 0;
      group.add(crystal);

      // Orbiting crystal shards
      for (let j = 0; j < 3; j++) {
        const shardAngle = (j * 2 * Math.PI) / 3;
        const shard = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), mats.cyanGlow);
        shard.position.set(Math.cos(shardAngle) * 0.7, Math.sin(j) * 0.2, Math.sin(shardAngle) * 0.7);
        shard.rotation.set(0.4, shardAngle, 0.2);
        group.add(shard);
      }
      break;
    }

    case 'drone': {
      // Main cybernetic body
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.35, 12), mats.darkSteel);
      group.add(body);

      const topDome = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), mats.whiteArmor);
      topDome.position.y = 0.17;
      group.add(topDome);

      // Front glowing optic sensor
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), mats.cyanGlow);
      eye.position.set(0, 0.05, 0.55);
      group.add(eye);

      // 4 Outrigger thruster pods
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2 + Math.PI / 4;
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.7), mats.brightSteel);
        arm.position.set(Math.cos(angle) * 0.6, 0, Math.sin(angle) * 0.6);
        arm.rotation.y = -angle + Math.PI / 2;
        group.add(arm);

        const thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 0.3, 12), mats.darkSteel);
        thruster.position.set(Math.cos(angle) * 1.05, -0.05, Math.sin(angle) * 1.05);
        group.add(thruster);

        const thrusterGlow = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.05, 12), mats.cyanGlow);
        thrusterGlow.position.set(Math.cos(angle) * 1.05, -0.19, Math.sin(angle) * 1.05);
        group.add(thrusterGlow);
      }
      break;
    }

    case 'chest': {
      // Base box
      const chestBase = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.7, 0.9), mats.oakWood);
      chestBase.position.y = -0.15;
      group.add(chestBase);

      // Arched lid
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.4, 16, 1, false, 0, Math.PI), mats.oakWood);
      lid.rotation.z = Math.PI / 2;
      lid.position.set(0, 0.2, 0);
      group.add(lid);

      // Metal reinforcement straps
      [-0.45, 0.45].forEach(x => {
        const strap = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.74, 0.94), mats.brass);
        strap.position.set(x, -0.15, 0);
        group.add(strap);
      });

      // Center front lock clasp
      const lock = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 0.1), mats.brass);
      lock.position.set(0, 0.05, 0.47);
      group.add(lock);

      const rune = new THREE.Mesh(new THREE.OctahedronGeometry(0.08, 0), mats.cyanGlow);
      rune.position.set(0, 0.05, 0.53);
      group.add(rune);
      break;
    }

    case 'shrine': {
      // Floating crag island rock
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(1.0, 1), mats.stone);
      rock.scale.set(1.4, 0.7, 1.2);
      rock.position.y = -0.5;
      group.add(rock);

      // Moss top cap
      const mossCap = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.1, 0.25, 10), mats.moss);
      mossCap.position.y = -0.1;
      group.add(mossCap);

      // Stone pagoda lantern
      const pagodaBase = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 0.4), mats.stone);
      pagodaBase.position.set(0.3, 0.18, 0);
      group.add(pagodaBase);

      const pagodaFirebox = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), mats.cyanGlow);
      pagodaFirebox.position.set(0.3, 0.45, 0);
      group.add(pagodaFirebox);

      const pagodaRoof = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.25, 4), mats.stone);
      pagodaRoof.rotation.y = Math.PI / 4;
      pagodaRoof.position.set(0.3, 0.7, 0);
      group.add(pagodaRoof);

      // Miniature Bonsai Tree
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.6, 6), mats.oakWood);
      trunk.position.set(-0.4, 0.3, 0.1);
      trunk.rotation.z = -0.25;
      group.add(trunk);

      const foliage1 = new THREE.Mesh(new THREE.SphereGeometry(0.25, 6, 6), mats.moss);
      foliage1.position.set(-0.55, 0.65, 0.1);
      group.add(foliage1);
      break;
    }

    case 'terminal': {
      // Workstation plinth
      const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.15, 0.9), mats.darkSteel);
      base.position.y = -0.8;
      group.add(base);

      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.9, 0.35), mats.darkSteel);
      pillar.position.set(0, -0.3, -0.1);
      group.add(pillar);

      // Angled deck
      const deck = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.1, 0.6), mats.brightSteel);
      deck.position.set(0, 0.15, 0.2);
      deck.rotation.x = 0.2;
      group.add(deck);

      // Glowing keyboard plane
      const keys = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.35), mats.cyanGlow);
      keys.rotation.x = -Math.PI / 2 + 0.2;
      keys.position.set(0, 0.21, 0.2);
      group.add(keys);

      // Slanted main screen
      const screenBezel = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.8, 0.08), mats.darkSteel);
      screenBezel.position.set(0, 0.7, -0.2);
      screenBezel.rotation.x = -0.15;
      group.add(screenBezel);

      const screenFace = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.65), mats.cyanGlow);
      screenFace.position.set(0, 0.7, -0.15);
      screenFace.rotation.x = -0.15;
      group.add(screenFace);
      break;
    }

    case 'pillar': {
      // Base plinth
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.2, 1.1), mats.stone);
      b1.position.y = -0.9;
      group.add(b1);
      const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.2, 0.9), mats.stone);
      b2.position.y = -0.7;
      group.add(b2);

      // Column shaft
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.38, 1.6, 8), mats.stone);
      shaft.position.y = 0.2;
      group.add(shaft);

      // Capital
      const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.2, 0.9), mats.stone);
      c1.position.y = 1.1;
      group.add(c1);
      const c2 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.2, 1.1), mats.stone);
      c2.position.y = 1.3;
      group.add(c2);
      break;
    }

    case 'crystal': {
      // Crystal shard cluster
      const shardConfigs = [
        { s: [0.35, 1.8, 0.35], pos: [0, 0.3, 0], rot: [0, 0.3, 0] },
        { s: [0.25, 1.3, 0.25], pos: [0.35, 0.1, 0.25], rot: [0.3, 0.6, -0.3] },
        { s: [0.22, 1.1, 0.22], pos: [-0.35, 0, -0.2], rot: [-0.4, 0.2, 0.35] },
        { s: [0.28, 1.4, 0.28], pos: [0.1, 0.15, -0.4], rot: [-0.35, 0.9, -0.1] },
        { s: [0.18, 0.8, 0.18], pos: [-0.4, -0.15, 0.3], rot: [0.4, 0.1, 0.4] },
        { s: [0.15, 0.65, 0.15], pos: [0.45, -0.25, -0.1], rot: [0.2, -0.5, -0.35] },
      ];

      shardConfigs.forEach(cfg => {
        const geo = new THREE.CylinderGeometry(0, cfg.s[0], cfg.s[1], 6);
        const shard = new THREE.Mesh(geo, mats.cyanGlow);
        shard.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
        shard.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
        group.add(shard);
      });

      // Rock crag base
      const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.7, 1), mats.stone);
      base.scale.set(1.3, 0.35, 1.3);
      base.position.y = -0.65;
      group.add(base);
      break;
    }

    case 'anvil': {
      // Timber log base
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.8, 0.7, 12), mats.oakWood);
      log.position.y = -0.55;
      group.add(log);

      // Anvil body
      const anvilBase = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.2, 0.6), mats.darkSteel);
      anvilBase.position.y = -0.1;
      group.add(anvilBase);

      const waist = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.4), mats.darkSteel);
      waist.position.y = 0.15;
      group.add(waist);

      const face = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.25, 0.5), mats.brightSteel);
      face.position.set(0.1, 0.4, 0);
      group.add(face);

      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.6, 12), mats.brightSteel);
      horn.rotation.z = Math.PI / 2;
      horn.position.set(-0.7, 0.4, 0);
      group.add(horn);
      break;
    }

    case 'vial': {
      // Spherical potion bottle
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.7, 24, 24), mats.glass);
      group.add(bulb);

      // Inner glowing elixir
      const liquid = new THREE.Mesh(new THREE.SphereGeometry(0.58, 20, 20), mats.rubyGlow);
      liquid.position.y = -0.05;
      group.add(liquid);

      // Bottle neck & lip
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.4, 16), mats.glass);
      neck.position.y = 0.8;
      group.add(neck);

      const lip = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 8, 20), mats.glass);
      lip.rotation.x = Math.PI / 2;
      lip.position.y = 1.0;
      group.add(lip);

      // Cork stopper
      const cork = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.15, 0.25, 12), mats.oakWood);
      cork.position.y = 1.08;
      group.add(cork);
      break;
    }

    case 'door': {
      // Frame
      const frameTop = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.2, 0.25), mats.darkSteel);
      frameTop.position.y = 0.95;
      group.add(frameTop);

      const frameL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.8, 0.25), mats.darkSteel);
      frameL.position.set(-0.7, 0.05, 0);
      group.add(frameL);

      const frameR = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.8, 0.25), mats.darkSteel);
      frameR.position.set(0.7, 0.05, 0);
      group.add(frameR);

      // Door panel
      const doorSlab = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.7, 0.15), mats.brightSteel);
      doorSlab.position.set(0, 0.05, 0);
      group.add(doorSlab);

      // Central locking wheel
      const lockDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.18, 16), mats.brass);
      lockDisc.rotation.x = Math.PI / 2;
      lockDisc.position.set(0, 0.05, 0.05);
      group.add(lockDisc);

      const indicator = new THREE.Mesh(new THREE.OctahedronGeometry(0.08, 0), mats.cyanGlow);
      indicator.position.set(0, 0.05, 0.18);
      group.add(indicator);
      break;
    }

    case 'tree': {
      // Trunk
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 0.8, 8), mats.oakWood);
      trunk.position.y = -0.55;
      group.add(trunk);

      // 4 Foliage tiers
      const tiers = [
        { r: 0.9, h: 0.7, y: -0.1 },
        { r: 0.75, h: 0.65, y: 0.35 },
        { r: 0.55, h: 0.6, y: 0.75 },
        { r: 0.35, h: 0.5, y: 1.1 },
      ];
      tiers.forEach(t => {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(t.r, t.h, 7), mats.moss);
        cone.position.y = t.y;
        group.add(cone);
      });
      break;
    }

    case 'sword': {
      // Blade
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.8, 0.02), mats.brightSteel);
      blade.position.y = 0.45;
      group.add(blade);

      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.3, 4), mats.brightSteel);
      tip.rotation.y = Math.PI / 4;
      tip.position.y = 1.45;
      group.add(tip);

      // Glowing fuller groove
      const groove = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.2, 0.025), mats.cyanGlow);
      groove.position.y = 0.45;
      group.add(groove);

      // Crossguard
      const guard = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.08, 0.08), mats.brass);
      guard.position.y = -0.45;
      group.add(guard);

      // Grip & Pommel
      const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4, 8), mats.darkSteel);
      grip.position.y = -0.68;
      group.add(grip);

      const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), mats.brass);
      pommel.position.y = -0.92;
      group.add(pommel);

      group.rotation.z = -0.4;
      break;
    }

    case 'barrel': {
      // Bulged staves
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 1.3, 16), mats.oakWood);
      body.scale.set(1.15, 1, 1.15);
      group.add(body);

      // 4 Iron Hoops
      [-0.45, -0.2, 0.2, 0.45].forEach(y => {
        const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.03, 8, 24), mats.darkSteel);
        hoop.rotation.x = Math.PI / 2;
        hoop.position.y = y;
        group.add(hoop);
      });

      // Bung plug
      const bung = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 8), mats.brass);
      bung.rotation.x = Math.PI / 2;
      bung.position.set(0, 0.05, 0.74);
      group.add(bung);
      break;
    }

    case 'speeder': {
      // Wedge vehicle hull
      const hull = new THREE.Mesh(new THREE.ConeGeometry(0.65, 2.2, 4), mats.whiteArmor);
      hull.rotation.x = Math.PI / 2;
      hull.scale.set(1.2, 1.0, 0.4);
      group.add(hull);

      // Cockpit canopy
      const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 12), mats.cyanGlow);
      canopy.scale.set(0.6, 0.4, 1.2);
      canopy.position.set(0, 0.15, -0.1);
      group.add(canopy);

      // Side repulsor nacelles
      [-0.7, 0.7].forEach(x => {
        const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 1.2, 12), mats.darkSteel);
        pod.rotation.x = Math.PI / 2;
        pod.position.set(x, -0.05, 0.1);
        group.add(pod);

        const thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.05, 12), mats.cyanGlow);
        thruster.rotation.x = Math.PI / 2;
        thruster.position.set(x, -0.05, 0.72);
        group.add(thruster);
      });
      break;
    }

    default: {
      const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mats.cyanGlow);
      group.add(cube);
      break;
    }
  }

  return group;
}

// Global Thumbnail Generator & Cache
const thumbnailCache = new Map<string, string>();
let offscreenCanvas: HTMLCanvasElement | null = null;
let offscreenRenderer: THREE.WebGLRenderer | null = null;
let offscreenScene: THREE.Scene | null = null;
let offscreenCamera: THREE.PerspectiveCamera | null = null;
let offscreenMats: MaterialLibrary | null = null;

export function generateMeshThumbnail(meshType: string, width = 280, height = 210): string {
  if (typeof window === 'undefined') return '';
  if (thumbnailCache.has(meshType)) return thumbnailCache.get(meshType)!;

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
      offscreenScene.background = new THREE.Color(0x060c14);

      offscreenCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);

      // Studio Lighting
      const hemi = new THREE.HemisphereLight(0x7dd3fc, 0x0f172a, 0.9);
      offscreenScene.add(hemi);

      const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
      mainLight.position.set(4, 7, 5);
      offscreenScene.add(mainLight);

      const rimLight = new THREE.DirectionalLight(0x22d3ee, 2.0);
      rimLight.position.set(-5, 3, -5);
      offscreenScene.add(rimLight);

      const fillLight = new THREE.DirectionalLight(0xa78bfa, 0.8);
      fillLight.position.set(3, -2, -3);
      offscreenScene.add(fillLight);

      offscreenMats = createMaterialLibrary();
    }

    if (!offscreenScene || !offscreenRenderer || !offscreenCamera || !offscreenMats) return '';

    // Remove any previous mesh groups
    const toRemove: THREE.Object3D[] = [];
    offscreenScene.children.forEach(child => {
      if (child instanceof THREE.Group) toRemove.push(child);
    });
    toRemove.forEach(obj => offscreenScene?.remove(obj));

    const meshGroup = buildMesh(meshType, offscreenMats);
    offscreenScene.add(meshGroup);

    // Center and scale camera to fit bounding box
    const box = new THREE.Box3().setFromObject(meshGroup);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    meshGroup.position.x = -center.x;
    meshGroup.position.y = -center.y + (size.y * 0.08);
    meshGroup.position.z = -center.z;

    const maxDim = Math.max(size.x, size.y, size.z, 1.2);
    const fov = offscreenCamera.fov * (Math.PI / 180);
    const dist = Math.abs((maxDim / 2) / Math.tan(fov / 2)) * 1.55;

    offscreenCamera.position.set(dist * 0.75, dist * 0.55, dist * 0.9);
    offscreenCamera.lookAt(0, 0, 0);

    offscreenRenderer.render(offscreenScene, offscreenCamera);
    const dataUrl = offscreenCanvas.toDataURL('image/webp', 0.85);

    if (dataUrl && dataUrl.startsWith('data:image')) {
      thumbnailCache.set(meshType, dataUrl);
      return dataUrl;
    }
  } catch (err) {
    console.warn('[models-viewer] Could not generate offscreen thumbnail for', meshType, err);
  }

  return '';
}

export function getMeshThumbnailUrl(meshType: string, staticUrl?: string): string {
  // Use official photographic renders when specifically matched
  if (staticUrl && (
    (staticUrl.includes('lantern.jpg') && meshType === 'lantern') ||
    (staticUrl.includes('drone.jpg') && meshType === 'drone') ||
    (staticUrl.includes('chest.jpg') && meshType === 'chest') ||
    (staticUrl.includes('shrine.jpg') && meshType === 'shrine')
  )) {
    return staticUrl;
  }

  const generated = generateMeshThumbnail(meshType);
  if (generated) return generated;

  return staticUrl || '/assets/models/lantern.jpg';
}

/**
 * Main Interactive Three.js Viewer Controller
 */
export function initModelViewer(container: HTMLElement): ModelViewerInstance {
  const width = container.clientWidth || 600;
  const height = container.clientHeight || 450;

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060b11);

  // Camera
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(3, 2.2, 4);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Clear previous canvas if any
  container.innerHTML = '';
  container.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';

  // Controls (rotation and zoom)
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = true;
  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.minDistance = 1.2;
  controls.maxDistance = 12;
  controls.maxPolarAngle = Math.PI * 0.85;
  controls.target.set(0, 0, 0);

  // Studio Lighting Rig
  const hemiLight = new THREE.HemisphereLight(0x7dd3fc, 0x0f172a, 0.8);
  scene.add(hemiLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
  mainLight.position.set(5, 8, 5);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 25;
  scene.add(mainLight);

  const rimLight = new THREE.DirectionalLight(0x22d3ee, 1.8);
  rimLight.position.set(-6, 3, -6);
  scene.add(rimLight);

  const fillLight = new THREE.DirectionalLight(0xa78bfa, 0.9);
  fillLight.position.set(4, -2, -3);
  scene.add(fillLight);

  // Ground Pedestal Grid
  const gridHelper = new THREE.GridHelper(8, 16, 0x0891b2, 0x164e63);
  gridHelper.position.y = -1.0;
  (gridHelper.material as THREE.Material).opacity = 0.35;
  (gridHelper.material as THREE.Material).transparent = true;
  scene.add(gridHelper);

  // Shadow disc beneath mesh
  const shadowGeo = new THREE.CircleGeometry(1.6, 32);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x020617,
    transparent: true,
    opacity: 0.6,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -0.99;
  scene.add(shadowMesh);

  // Model container group
  let currentModelGroup: THREE.Group | null = null;
  let isWireframe = false;
  let isAutoRotate = false;
  let animFrameId: number | null = null;
  const defaultCamPos = new THREE.Vector3(3, 2.2, 4);

  // Material Library for interactive viewer
  const mats = createMaterialLibrary();

  // Animation Loop
  function animate() {
    animFrameId = requestAnimationFrame(animate);

    if (isAutoRotate && currentModelGroup) {
      currentModelGroup.rotation.y += 0.012;
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // Public Viewer Methods
  return {
    loadModel(meshType: string, _modelId: string) {
      if (currentModelGroup) {
        scene.remove(currentModelGroup);
        currentModelGroup.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
          }
        });
        currentModelGroup = null;
      }

      const newGroup = buildMesh(meshType, mats);
      currentModelGroup = newGroup;
      scene.add(newGroup);

      // Apply wireframe state if active
      if (isWireframe) {
        newGroup.traverse(child => {
          if (child instanceof THREE.Mesh && child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(m => (m.wireframe = true));
            } else {
              child.material.wireframe = true;
            }
          }
        });
      }

      // Compute bounding box and center camera
      const box = new THREE.Box3().setFromObject(newGroup);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      newGroup.position.x = -center.x;
      newGroup.position.y = -center.y + (size.y * 0.1);
      newGroup.position.z = -center.z;

      const maxDim = Math.max(size.x, size.y, size.z, 1.2);
      const fov = camera.fov * (Math.PI / 180);
      const cameraDistance = Math.abs((maxDim / 2) / Math.tan(fov / 2)) * 1.6;

      defaultCamPos.set(cameraDistance * 0.75, cameraDistance * 0.55, cameraDistance * 0.9);
      camera.position.copy(defaultCamPos);
      controls.target.set(0, 0, 0);
      controls.update();
    },

    toggleWireframe() {
      isWireframe = !isWireframe;
      if (currentModelGroup) {
        currentModelGroup.traverse(child => {
          if (child instanceof THREE.Mesh && child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(m => (m.wireframe = isWireframe));
            } else {
              child.material.wireframe = isWireframe;
            }
          }
        });
      }
      return isWireframe;
    },

    resetView() {
      camera.position.copy(defaultCamPos);
      controls.target.set(0, 0, 0);
      if (currentModelGroup) {
        currentModelGroup.rotation.set(0, 0, 0);
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

      if (currentModelGroup) {
        scene.remove(currentModelGroup);
        currentModelGroup.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
          }
        });
        currentModelGroup = null;
      }

      Object.values(mats).forEach(mat => mat.dispose());
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
