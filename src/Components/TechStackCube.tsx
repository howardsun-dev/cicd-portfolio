import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState, useMemo } from 'react';
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

const cubeColors = ['#f8fafc', '#93c5fd', '#7dd3fc', '#c4b5fd', '#86efac', '#facc15'];
const faceLabels = ['AWS', 'Tests', 'TS', 'CI/CD', 'React', 'Node']; // +X, -X, +Y, -Y, +Z, -Z

function createTextTexture(text: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  
  // Background (transparent)
  ctx.clearRect(0, 0, size, size);
  
  // Text
  ctx.font = 'bold 64px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#1e293b';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size / 2, size / 2);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function useFaceMaterials() {
  return useMemo(() => {
    if (typeof window === 'undefined') return [];
    return faceLabels.map((label) => {
      const texture = createTextTexture(label);
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        color: '#ffffff',
        transparent: true,
        opacity: 0.25,
        roughness: 0.15,
        metalness: 0.05,
        transmission: 0.85,
        thickness: 0.5,
        ior: 1.1,
        clearcoat: 0.3,
        clearcoatRoughness: 0.1,
        side: THREE.DoubleSide,
      });
    });
  }, []);
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => (typeof window === 'undefined' ? false : window.matchMedia(query).matches));

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener('change', updateMatches);

    return () => mediaQuery.removeEventListener('change', updateMatches);
  }, [query]);

  return matches;
}

function RotatingCube({ activeIndex, reducedMotion }: { activeIndex: number; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const color = cubeColors[activeIndex % cubeColors.length];
  const faceMaterials = useFaceMaterials();

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;

    groupRef.current.rotation.x = 0.42 + Math.sin(clock.elapsedTime * 0.45) * 0.12;
    groupRef.current.rotation.y = clock.elapsedTime * 0.42;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.28) * 0.08;
  });

  return (
    <group ref={groupRef} rotation={[0.42, 0.62, 0.04]}>
      <mesh
        geometry={new THREE.BoxGeometry(1.85, 1.85, 1.85)}
        material={faceMaterials.length === 6 ? faceMaterials : new THREE.MeshPhysicalMaterial({ color, emissive: color, emissiveIntensity: 0.24, roughness: 0.34, metalness: 0.08, transparent: true, opacity: 0.25, transmission: 0.85, thickness: 0.5 })}
      />
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
