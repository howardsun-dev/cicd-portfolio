import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type ConstellationNode = {
  id: string;
  label: string;
  proof: string;
  position: [number, number, number];
  screen: { left: string; top: string };
};

const nodes: ConstellationNode[] = [
  {
    id: 'lanshare',
    label: 'LANShare',
    proof: 'CLI + Express + testing',
    position: [-2.2, 0.95, 0],
    screen: { left: '17%', top: '31%' },
  },
  {
    id: 'lanshare-electron-desktop-app',
    label: 'Desktop Release',
    proof: 'Electron + release pipeline',
    position: [1.95, 1.05, -0.1],
    screen: { left: '70%', top: '29%' },
  },
  {
    id: 'quickchat-real-time-chat-app',
    label: 'QuickChat',
    proof: 'Realtime auth + Socket.io',
    position: [-0.15, 0.05, 0.3],
    screen: { left: '44%', top: '48%' },
  },
  {
    id: 'discord-job-scraper-bot',
    label: 'Job Bot',
    proof: 'Discord + scraping roadmap',
    position: [2.25, -0.75, 0.05],
    screen: { left: '72%', top: '66%' },
  },
  {
    id: 'swell-open-source-contribution',
    label: 'Swell OSS',
    proof: 'Mature codebase contribution',
    position: [-2.0, -0.85, -0.15],
    screen: { left: '18%', top: '69%' },
  },
  {
    id: 'ci-cd-portfolio-site',
    label: 'CI/CD Portfolio',
    proof: 'AWS + GitHub Actions',
    position: [0.25, -1.45, 0.15],
    screen: { left: '47%', top: '80%' },
  },
];

const connections: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 4],
  [1, 2],
  [1, 5],
  [2, 3],
  [2, 5],
  [3, 5],
  [4, 5],
];

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

function NetworkLines() {
  const lineSegments = useMemo(() => {
    const points = connections.flatMap(([from, to]) => [
      new THREE.Vector3(...nodes[from].position),
      new THREE.Vector3(...nodes[to].position),
    ]);

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <lineSegments geometry={lineSegments}>
      <lineBasicMaterial color="#c4b5fd" transparent opacity={0.34} />
    </lineSegments>
  );
}

function ConstellationNodeMesh({ node, isActive }: { node: ConstellationNode; isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const pulse = Math.sin(clock.elapsedTime * 1.6 + node.position[0]) * 0.04;
    const baseScale = isActive ? 1.45 : 1;
    meshRef.current.scale.setScalar(baseScale + pulse);
  });

  return (
    <mesh ref={meshRef} position={node.position}>
      <sphereGeometry args={[0.1, 24, 24]} />
      <meshStandardMaterial
        color={isActive ? '#ffffff' : '#7dd3fc'}
        emissive={isActive ? '#a78bfa' : '#2563eb'}
        emissiveIntensity={isActive ? 0.95 : 0.45}
        roughness={0.45}
      />
    </mesh>
  );
}

function ConstellationScene({ activeId }: { activeId: string | null }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.12;
    groupRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.14) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.1} />
      <pointLight position={[0, 0, 4]} intensity={1.6} color="#ffffff" />
      <NetworkLines />
      {nodes.map((node) => (
        <ConstellationNodeMesh key={node.id} node={node} isActive={activeId === node.id} />
      ))}
    </group>
  );
}

function scrollToProject(projectId: string) {
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  document.getElementById(projectId)?.scrollIntoView({ behavior, block: 'start' });
}

export default function ProjectConstellation() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [activeId, setActiveId] = useState<string | null>(null);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <section className="project-constellation" aria-labelledby="project-constellation-title">
      <div className="constellation-copy">
        <p className="eyebrow">Interactive map</p>
        <h2 id="project-constellation-title">Project Constellation</h2>
        <p>
          A lightweight Three.js map connecting each project to the engineering signal it demonstrates. Select a node to jump to the matching case study.
        </p>
      </div>
      <div className="constellation-stage">
        <Canvas
          aria-hidden="true"
          camera={{ position: [0, 0, 5.2], fov: 50 }}
          dpr={[1, 1.5]}
          frameloop="always"
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        >
          <ConstellationScene activeId={activeId} />
        </Canvas>
        <div className="constellation-controls" aria-label="Jump to project">
          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              className={`constellation-node-button ${activeId === node.id ? 'is-active' : ''}`}
              style={node.screen}
              onClick={() => scrollToProject(node.id)}
              onFocus={() => setActiveId(node.id)}
              onBlur={() => setActiveId(null)}
              onMouseEnter={() => setActiveId(node.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <span>{node.label}</span>
              <small>{node.proof}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
