import React, { useEffect, useRef, useState } from 'react';
import './ProfilePage.css';
import { Link } from '@tanstack/react-router';

type SlideData = {
  id: string;
  title: string;
  items: string[];
};

const slides: SlideData[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: [
      'React',
      'Redux',
      'Zustand',
      'HTML5',
      'CSS (Sass)',
      'Tailwind CSS',
      'Material UI',
      'DaisyUI',
      'Solid.js',
      'Electron.js',
      'webpack',
      'Vite',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    items: ['Node.js', 'Express', 'WebSocket'],
  },
  {
    id: 'databases',
    title: 'Databases',
    items: ['PostgreSQL', 'MongoDB'],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure & Cloud',
    items: [
      'AWS (EC2, S3, Aurora, Elastic Beanstalk, VPC)',
      'Docker',
      'Kubernetes',
      'GitHub Actions',
    ],
  },
  {
    id: 'testing',
    title: 'Testing',
    items: ['Jest', 'Playwright', 'Mocha', 'Chai', 'Vitest'],
  },
  {
    id: 'tools',
    title: 'Tools',
    items: ['Git', 'Cloudinary'],
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

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slideElements = slider.querySelectorAll<HTMLElement>('[data-slide]');

    const observer = new IntersectionObserver(
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
      observer.observe(slide);
    });

    return () => observer.disconnect();
  }, []);

  const goToSlide = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slide = slider.querySelectorAll<HTMLElement>('[data-slide]')[index];
    slide?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  };

  return (
    <div className="profile-container tech-stack-page">
      <div className="title">Tech Stack</div>

      <div className="tech-shell">
        <div className="tech-slider" ref={sliderRef}>
          {slides.map((slide) => (
            <TechSlide key={slide.id} slide={slide} />
          ))}
        </div>

        <div className="tech-home-row">
          <Link className="social-link" to="/">
            Home
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
    </div>
  );
}
