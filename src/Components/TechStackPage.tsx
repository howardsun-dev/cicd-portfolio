import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { usePageTitle } from '../hooks/usePageTitle';

const TechStackCube = lazy(() => import('./TechStackCube'));

type SlideData = {
  id: string;
  title: string;
  items: string[];
};

const slides: SlideData[] = [
  {
    id: 'languages',
    title: 'Languages',
    items: ['TypeScript', 'JavaScript (ES6)', 'Python', 'C++'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    items: [
      'React',
      'Redux',
      'Zustand',
      'HTML5',
      'CSS3 / Sass',
      'Tailwind CSS',
      'Material UI',
      'DaisyUI',
      'React Router',
      'TanStack Router',
      'Vite',
      'webpack',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    items: [
      'Node.js',
      'Express',
      'WebSocket',
      'Socket.IO',
      'REST APIs',
      'JWT Authentication',
      'Cloudinary',
      'Arcjet',
    ],
  },
  {
    id: 'desktop',
    title: 'Desktop & Tooling',
    items: ['Electron', 'electron-builder', 'CLI tools', 'Git', 'Figma'],
  },
  {
    id: 'databases',
    title: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Amazon Aurora'],
  },
  {
    id: 'infrastructure',
    title: 'Cloud & DevOps',
    items: [
      'AWS EC2',
      'AWS S3',
      'AWS Elastic Beanstalk',
      'AWS VPC',
      'CloudFront',
      'ELB/ALB',
      'Docker',
      'GitHub Actions',
    ],
  },
  {
    id: 'testing',
    title: 'Testing',
    items: ['Jest', 'Playwright', 'Mocha', 'Chai', 'Vitest'],
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
                  .replace(/[(),&/+]/g, '')
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
        { root: slider, threshold: 0.65 },
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
        <Suspense fallback={null}>
          <TechStackCube slides={slides} activeIndex={activeIndex} onSelectSlide={goToSlide} />
        </Suspense>

        <div className="tech-slider" ref={sliderRef}>
          {slides.map((slide) => (
            <TechSlide key={slide.id} slide={slide} />
          ))}
        </div>

        <div className="tech-home-row">
          <Link className="social-link" to="/">
            &larr; Home
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
      <aside className="portfolio-built-note" aria-label="Portfolio technology note">
        This portfolio is a working project built with the same stack I use to ship software: React
        19, TypeScript, Vite, TanStack Router, Three.js, anime.js, GitHub Actions, AWS S3, and
        CloudFront.
      </aside>
    </main>
  );
}
