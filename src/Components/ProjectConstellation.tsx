/*
 * Pseudo-code: Interactive project constellation map component.
 * - Renders a <canvas> that draws lines connecting project "nodes" positioned by percentage.
 * - Each node is an absolutely-positioned <button> overlaid on the canvas.
 * - Clicking a node scrolls the matching project card into view and focuses it.
 * - The canvas redraws on resize to maintain correct node positions at any viewport width.
 * Why added: Provides a visual, spatial overview of all projects and their relationships.
 * The interactive buttons let users jump directly to a specific project case study,
 * demonstrating both Canvas API usage and scroll-to-element patterns.
 */

import { useEffect, useRef } from 'react';

type ConstellationNode = {
  id: string;
  label: string;
  tech: string;
  x: number;
  y: number;
};

const nodes: ConstellationNode[] = [
  { id: 'Swell — Open Source Contribution', label: 'Swell OSS', tech: 'Open-source contribution', x: 18, y: 69 },
  { id: 'QuickChat — Real-Time Chat App', label: 'QuickChat', tech: 'Realtime auth + Socket.io', x: 44, y: 48 },
  { id: 'LANShare', label: 'LANShare', tech: 'CLI + Express + testing', x: 28, y: 22 },
  { id: 'LANShare — Electron Desktop App', label: 'LANShare Elect.', tech: 'Electron + desktop packaging', x: 17, y: 31 },
  { id: 'Discord Job Scraper Bot', label: 'Job Bot', tech: 'Discord + scraping roadmap', x: 72, y: 66 },
  { id: 'CI/CD Portfolio Site', label: 'CI/CD Portfolio', tech: 'AWS + GitHub Actions', x: 47, y: 80 },
];

// Pseudo-code: Render the constellation canvas with interactive node buttons.
// Why added: This is the centerpiece of the projects page — it gives a spatial,
// visual overview of the portfolio projects and lets users jump to any project.
export default function ProjectConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Pseudo-code: Set up the canvas resize handler and initial draw on mount.
  // Why added: The canvas must match the parent container's size and device pixel ratio
  // for crisp rendering. The resize listener ensures it adapts to viewport changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pseudo-code: Resize the canvas to match the parent container, accounting for devicePixelRatio.
    // Why added: Without DPR scaling, the canvas would look blurry on Retina/HiDPI displays.
    // The transform scales all drawing operations so we can work in CSS pixels.
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, rect.width, rect.height);
    };

    // Pseudo-code: Draw the constellation — clear, draw connection lines between all node pairs,
    // then draw filled circles at each node position.
    // Why added: The lines create a "constellation" visual metaphor showing how projects
    // relate to each other. The filled circles mark each project's position.
    const draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);

      // Pseudo-code: Draw faint lines connecting every pair of nodes.
      // Why added: The connecting lines create the constellation effect, visually
      // linking related projects across the map.
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.12)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const x1 = (nodes[i].x / 100) * w;
          const y1 = (nodes[i].y / 100) * h;
          const x2 = (nodes[j].x / 100) * w;
          const y2 = (nodes[j].y / 100) * h;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // Pseudo-code: Draw a filled circle at each node position.
      // Why added: The circles serve as visual markers for each project, making it
      // clear where each node is on the map.
      nodes.forEach((node) => {
        const x = (node.x / 100) * w;
        const y = (node.y / 100) * h;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 197, 253, 0.5)';
        ctx.fill();
      });
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <section className="project-constellation" aria-labelledby="project-constellation-title">
      <div className="constellation-copy">
        <p className="eyebrow">Interactive map</p>
        <h2 id="project-constellation-title">Project Constellation</h2>
        <p>
          A lightweight map connecting each project to the engineering signal it demonstrates.
          Select a node to jump to the matching case study.
        </p>
      </div>
      <div className="constellation-stage">
        <canvas ref={canvasRef} aria-hidden="true" />
        <div className="constellation-controls" aria-label="Jump to project">
          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              className="constellation-node-button"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              // Pseudo-code: Scroll the matching project card into view and focus it.
              // Why added: Clicking a constellation node should navigate the user directly
              // to the corresponding project card, creating a smooth interactive experience.
              onClick={() => {
                const el = document.getElementById(node.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  el.focus({ preventScroll: true });
                }
              }}
            >
              <span>{node.label}</span>
              <small>{node.tech}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
