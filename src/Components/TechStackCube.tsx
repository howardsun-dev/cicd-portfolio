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

const cubeColors = ['#f8fafc', '#93c5fd', '#7dd3fc', '#c4b5fd', '#86efac', '#facc15'] as const;
function RotatingCube({ activeIndex, reducedMotion, cssCubeRef }: { activeIndex: number; reducedMotion: boolean; cssCubeRef: React.RefObject<HTMLDivElement | null> }) {
  const groupRef = useRef<THREE.Group>(null);
  const color = cubeColors[activeIndex % cubeColors.length];

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;
    const elapsed = clock.elapsedTime;
    const rotX = 0.42 + Math.sin(elapsed * 0.45) * 0.12;
    const rotY = elapsed * 0.42;
    const rotZ = Math.sin(elapsed * 0.28) * 0.08;
    
    groupRef.current.rotation.x = rotX;
    groupRef.current.rotation.y = rotY;
    groupRef.current.rotation.z = rotZ;

    // Sync CSS cube transform (convert radians to degrees)
    if (cssCubeRef.current) {
      const degX = THREE.MathUtils.radToDeg(rotX);
      const degY = THREE.MathUtils.radToDeg(rotY);
      const degZ = THREE.MathUtils.radToDeg(rotZ);
      cssCubeRef.current.style.transform = 
        `translate(-50%, -50%) rotateX(${degX}deg) rotateY(${degY}deg) rotateZ(${degZ}deg)`;
    }
  });

  const boxGeo = new THREE.BoxGeometry(1.85, 1.85, 1.85);
  const edgesGeo = new THREE.EdgesGeometry(boxGeo);
  const edgeMat = new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.36 });

  return (
    <group ref={groupRef} rotation={[0.42, 0.62, 0.04]}>
      <mesh geometry={boxGeo}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.24}
          roughness={0.34}
          metalness={0.08}
        />
      </mesh>
      <lineSegments geometry={edgesGeo} material={edgeMat} />
    </group>
  );
}

export default function TechStackCube({ slides, activeIndex, onSelectSlide }: TechStackCubeProps) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const cssCubeRef = useRef<HTMLDivElement>(null);

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
          <RotatingCube activeIndex={activeIndex} reducedMotion={reducedMotion} cssCubeRef={cssCubeRef} />
        </Canvas>

        <div className="tech-cube-css" aria-hidden="true" ref={cssCubeRef}>
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
            onClick={() => onSelectSlide(index)}
          >
            {slide.title}
          </button>
        ))}
      </div>
    </section>
  );
}