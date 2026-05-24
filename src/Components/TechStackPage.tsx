import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { usePageTitle } from '../hooks/usePageTitle';

type SlideData = {
  id: string;
  title: string;
  items: string[];
};

const slides: SlideData[] = [
  {
    id: 'languages',
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'C++'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    items: [
      'React',
      'React Router',
      'TanStack Router',
      'Zustand',
      'Redux Toolkit',
      'Tailwind CSS',
      'DaisyUI',
      'Material UI',
      'Chart.js',
      'Vite',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    items: ['Node.js', 'Express', 'Socket.IO', 'REST APIs', 'JWT/Auth', 'Cloudinary', 'Arcjet'],
  },
  {
    id: 'desktop',
    title: 'Desktop & Tooling',
    items: ['Electron', 'electron-builder', 'CLI tools', 'Git', 'VS Code', 'Figma'],
  },
  {
    id: 'databases',
    title: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'Amazon Aurora'],
  },
  {
    id: 'infrastructure',
    title: 'Cloud & DevOps',
    items: ['AWS EC2', 'AWS S3', 'CloudFront', 'ELB/ALB', 'Docker', 'Kubernetes', 'GitHub Actions'],
  },
  {
    id: 'testing',
    title: 'Testing',
    items: ['Jest', 'Vitest', 'Playwright', 'Mocha', 'Chai'],
  },
  {
    id: 'hardware',
    title: 'Hardware & Automation',
    items: ['Raspberry Pi', 'Arduino', 'PWM control', 'Home automation'],
  },
];

function TechSlide({ slide }: { slide: SlideData }) {
  return (
    <section className="tech-slide" id={slide.id} data-slide>
      <div className="tech-panel">
        <div className="tech-panel-body">
          <h2 className="tech-slide-title">{slide.title}</h2>

          <ul className="tech-slide-list">
            {slide.items.map((tech) => (
              <li
                key={tech}
                className={`tech-item-${tech
                  .toLowerCase()
                  .replace(/\./g, '')
                  .replace(/[(),&]/g, '')
                  .replace(/\s+/g, '-')}`}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function TechStackPage() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  usePageTitle('Howard Sun — Tech Stack');

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || typeof IntersectionObserver === 'undefined') return;

    let observer: IntersectionObserver | undefined;
    const frameId = window.requestAnimationFrame(() => {
      const slideElements = slider.querySelectorAll<HTMLElement>('[data-slide]');

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Number((entry.target as HTMLElement).dataset.index);
              setActiveIndex(index);
            }
          });
        },
        {
          root: slider,
          threshold: 0.65,
        },
      );

      slideElements.forEach((slide, index) => {
        slide.dataset.index = String(index);
        observer?.observe(slide);
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      observer?.disconnect();
    };
  }, []);

  const goToSlide = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slide = slider.querySelectorAll<HTMLElement>('[data-slide]')[index];
    slide?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  };

  return (
    <main id="main-content" className="profile-container tech-stack-page" tabIndex={-1}>
      <header className="page-header">
        <p className="eyebrow">Capabilities</p>
        <h1 className="title">Tech Stack</h1>
      </header>

      <div className="tech-shell">
        <div className="tech-slider" ref={sliderRef}>
          {slides.map((slide) => (
            <TechSlide key={slide.id} slide={slide} />
          ))}
        </div>

        <div className="tech-home-row">
          <Link className="social-link" to="/">
            ← Home
          </Link>
        </div>

        <div className="slider-dots-panel" aria-label="Slide navigation">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`dot ${activeIndex === index ? 'active' : ''}`}
              aria-label={`Go to ${slide.title}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
