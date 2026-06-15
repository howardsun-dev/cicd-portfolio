import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type CubeSlide = {
  id: string;
  title: string;
};

type TechStackCubeProps = {
  slides: CubeSlide[];
  activeIndex: number;
  onSelectSlide: (index: number) => void;
};

const cubeSize = 1.85;
const halfCubeSize = cubeSize / 2;
const labelOffset = halfCubeSize + 0.006;

const cubeColors = ['#f8fafc', '#93c5fd', '#7dd3fc', '#c4b5fd', '#86efac', '#facc15'] as const;

// Each label is rendered as a Three.js texture on a transparent plane. That keeps
// text attached to the cube faces without CSS 3D overlays or drei's DOM-based Html helper.
const faceLabels = [
  { position: [0, 0, labelOffset], rotation: [0, 0, 0], text: 'React' },
  { position: [0, 0, -labelOffset], rotation: [0, Math.PI, 0], text: 'Node' },
  { position: [labelOffset, 0, 0], rotation: [0, Math.PI / 2, 0], text: 'AWS' },
  { position: [-labelOffset, 0, 0], rotation: [0, -Math.PI / 2, 0], text: 'Tests' },
  { position: [0, labelOffset, 0], rotation: [-Math.PI / 2, 0, 0], text: 'TS' },
  { position: [0, -labelOffset, 0], rotation: [Math.PI / 2, 0, 0], text: 'CI/CD' },
] as const;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);
    updateMatches();
    mediaQuery.addEventListener('change', updateMatches);
    return () => mediaQuery.removeEventListener('change', updateMatches);
  }, [query]);

  return matches;
}

function createTextTexture(text: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 192;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Unable to create canvas context for cube face label.');
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw a subtle in-texture badge so labels stay readable on every cube color.
  // This is still a Three.js texture, not a DOM/CSS overlay.
  const badgeX = 56;
  const badgeY = 44;
  const badgeWidth = canvas.width - badgeX * 2;
  const badgeHeight = canvas.height - badgeY * 2;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.58)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.62)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 32);
  ctx.fill();
  ctx.stroke();

  ctx.font = '800 88px Arial, Helvetica, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.72)';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 6;
  ctx.strokeText(text, canvas.width / 2, canvas.height / 2 + 2);
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function CubeFaceLabel({
  text,
  position,
  rotation,
}: {
  text: string;
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
}) {
  const texture = useMemo(() => createTextTexture(text), [text]);

  useEffect(() => {
    return () => texture.dispose();
  }, [texture]);

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[1.28, 0.48]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function RotatingCube({ activeIndex, reducedMotion }: { activeIndex: number; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const color = cubeColors[activeIndex % cubeColors.length];
  const boxGeo = useMemo(() => new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo]);

  // Transparent glass-like face material
  const faceMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        transparent: true,
        opacity: 0.08,
        transmission: 0.96,
        thickness: 0.22,
        roughness: 0.04,
        metalness: 0.0,
        clearcoat: 0.75,
        clearcoatRoughness: 0.08,
        ior: 1.33,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [color],
  );

  // Prominent wireframe edges
  const edgeMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.75,
        linewidth: 2,
        depthWrite: false,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      boxGeo.dispose();
      edgesGeo.dispose();
      faceMat.dispose();
      edgeMat.dispose();
    };
  }, [boxGeo, edgesGeo, faceMat, edgeMat]);

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;
    const elapsed = clock.elapsedTime;
    groupRef.current.rotation.x = 0.42 + Math.sin(elapsed * 0.45) * 0.12;
    groupRef.current.rotation.y = elapsed * 0.42;
    groupRef.current.rotation.z = Math.sin(elapsed * 0.28) * 0.08;
  });

  return (
    <group ref={groupRef} rotation={[0.42, 0.62, 0.04]}>
      <mesh geometry={boxGeo} material={faceMat} />
      <lineSegments geometry={edgesGeo} material={edgeMat} />
      {faceLabels.map(({ position, rotation, text }) => (
        <CubeFaceLabel key={text} position={position} rotation={rotation} text={text} />
      ))}
    </group>
  );
}

export default function TechStackCube({ slides, activeIndex, onSelectSlide }: TechStackCubeProps) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <section className="tech-cube-section" aria-labelledby="tech-cube-title">
      <div className="tech-cube-copy">
        <p className="eyebrow">Stack map</p>
        <h2 id="tech-cube-title">Rotating capability cube</h2>
        <p>
          A compact Three.js view of the stack layers behind the portfolio. Select a layer to jump to the matching skill slide.
        </p>
      </div>

      <div className="tech-cube-stage">
        <Canvas
          aria-hidden="true"
          camera={{ position: [0, 0, 5.4], fov: 42 }}
          dpr={[1, 1.5]}
          frameloop={reducedMotion ? 'demand' : 'always'}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        >
          <ambientLight intensity={1.15} />
          <directionalLight position={[3, 3, 4]} intensity={1.6} />
          <pointLight position={[-3, -2, 3]} intensity={0.8} color="#c4b5fd" />
          <RotatingCube activeIndex={activeIndex} reducedMotion={reducedMotion} />
        </Canvas>
      </div>

      <div className="tech-cube-controls" aria-label="Tech stack layer navigation">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`tech-cube-chip ${activeIndex === index ? 'is-active' : ''}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => onSelectSlide(index)}
          >
            {slide.title}
          </button>
        ))}
      </div>
    </section>
  );
}
