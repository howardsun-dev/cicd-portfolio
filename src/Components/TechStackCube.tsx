/*
 * Pseudo-code: 3D rotating cube component using Three.js (via @react-three/fiber).
 * - Renders a Three.js <Canvas> with a rotating box geometry that changes color
 *   based on the active slide index.
 * - The cube has a solid face with an emissive glow and a wireframe overlay.
 * - Respects the user's "prefers-reduced-motion" setting by switching the render
 *   loop from 'always' to 'demand' (only re-renders when props change).
 * - Includes a CSS-only fallback cube with labeled faces for screen readers.
 * - Exposes chip buttons to select a tech stack layer by index.
 * Why added: Provides a visually engaging, interactive way to browse the tech stack.
 * The 3D cube serves as a spatial metaphor for the different layers of the stack
 * (React, Node, AWS, Tests, TS, CI/CD), making the page memorable and distinctive.
 */

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

// Pseudo-code: Custom hook that tracks a CSS media query match state.
// Why added: Used to detect "prefers-reduced-motion" so the Three.js canvas can
// switch from continuous rendering to on-demand rendering for accessibility.
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

// Pseudo-code: The 3D cube mesh that rotates continuously using useFrame.
// Why added: useFrame runs on every animation frame, letting us update the cube's
// rotation based on elapsed time for a smooth, continuous spin. The color changes
// based on the active slide index.
function RotatingCube({ activeIndex, reducedMotion }: { activeIndex: number; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const color = cubeColors[activeIndex % cubeColors.length];

  // Pseudo-code: Update the cube's rotation every frame based on elapsed time.
  // Why added: The sinusoidal rotation on X and Z axes combined with linear Y rotation
  // creates an organic, non-repetitive spinning motion. Skipped entirely when
  // reducedMotion is true.
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
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.24}
          roughness={0.34}
          metalness={0.08}
        />
      </mesh>
      <mesh scale={1.012}>
        <boxGeometry args={[1.85, 1.85, 1.85]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.36} />
      </mesh>
    </group>
  );
}

// Pseudo-code: Render the full tech stack cube section — Three.js canvas, CSS fallback, and chip controls.
// Why added: This is the visual centerpiece of the tech stack page. The Three.js canvas
// provides the 3D experience, the CSS fallback ensures content is accessible without
// WebGL, and the chip controls let users navigate between stack layers.
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

        <div className="tech-cube-css" aria-hidden="true">
          <span className="cube-face cube-front">React</span>
          <span className="cube-face cube-back">Node</span>
          <span className="cube-face cube-right">AWS</span>
          <span className="cube-face cube-left">Tests</span>
          <span className="cube-face cube-top">TS</span>
          <span className="cube-face cube-bottom">CI/CD</span>
        </div>
      </div>

      <div className="tech-cube-controls" aria-label="Tech stack layer navigation">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`tech-cube-chip ${activeIndex === index ? 'is-active' : ''}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            // Pseudo-code: Notify the parent which slide index was selected.
            // Why added: The parent (TechStackPage) uses this callback to scroll the
            // matching skill slide into view and update the active index.
            onClick={() => onSelectSlide(index)}
          >
            {slide.title}
          </button>
        ))}
      </div>
    </section>
  );
}
