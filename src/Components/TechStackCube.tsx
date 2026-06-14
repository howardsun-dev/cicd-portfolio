import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
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

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;

    groupRef.current.rotation.x = 0.42 + Math.sin(clock.elapsedTime * 0.45) * 0.12;
    groupRef.current.rotation.y = clock.elapsedTime * 0.42;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.28) * 0.08;
  });

  return (
    <group ref={groupRef} rotation={[0.42, 0.62, 0.04]}>
      <mesh>
        <boxGeometry args={[1.85, 1.85, 1.85]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.24} roughness={0.34} metalness={0.08} />
      </mesh>
      <mesh scale={1.012}>
        <boxGeometry args={[1.85, 1.85, 1.85]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.36} />
      </mesh>
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
