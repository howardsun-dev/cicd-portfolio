import { useEffect, useRef } from 'react';

type ConstellationNode = {
  id: string;
  label: string;
  tech: string;
  x: number;
  y: number;
};

const nodes: ConstellationNode[] = [
  { id: 'swell-open-source-contribution', label: 'Swell OSS', tech: 'Open-source contribution', x: 18, y: 69 },
  { id: 'quickchat-real-time-chat-app', label: 'QuickChat', tech: 'Realtime auth + Socket.io', x: 44, y: 48 },
  { id: 'lanshare', label: 'LANShare', tech: 'CLI + Express + testing', x: 17, y: 31 },
  { id: 'discord-job-scraper-bot', label: 'Job Bot', tech: 'Discord + scraping roadmap', x: 72, y: 66 },
  { id: 'ci-cd-portfolio-site', label: 'CI/CD Portfolio', tech: 'AWS + GitHub Actions', x: 47, y: 80 },
];

export default function ProjectConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    const draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);

      // Draw connection lines
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

      // Draw node dots
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
              onClick={() => {
                document.getElementById(node.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
