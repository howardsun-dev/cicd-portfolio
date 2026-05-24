import { useEffect, useRef } from 'react';
import { animate, stagger, createTimeline } from 'animejs';
import { Link } from '@tanstack/react-router';
import { usePageTitle } from '../hooks/usePageTitle';
import { RESUME_DOCX_PATH, RESUME_PDF_PATH } from '../links';

const fullName = 'Howard Sun';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function ProfilePage() {
  const nameContainerRef = useRef<HTMLHeadingElement>(null);
  usePageTitle('Howard Sun — Portfolio');

  useEffect(() => {
    const nameEl = nameContainerRef.current;
    if (!nameEl || prefersReducedMotion()) {
      document.querySelector('.profile-info')?.classList.add('is-visible');
      document.querySelector('.social-links')?.classList.add('is-visible');
      return;
    }

    const letters = Array.from(nameEl.querySelectorAll('.letter'));
    const cleanups: Array<() => void> = [];
    const timeline = createTimeline();

    timeline.add(letters, {
      scale: [0, 1],
      duration: 3000,
      delay: stagger(180),
      ease: 'outElastic(1, .8)',
    });

    timeline.add(
      '.profile-info',
      {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        ease: 'outQuad',
      },
      '-=500',
    );

    timeline.add(
      '.social-links',
      {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        ease: 'outQuad',
      },
      '-=400',
    );

    letters.forEach((span) => {
      const onEnter = () => {
        animate(span, {
          translateY: -20,
          rotateY: '1turn',
          scale: 1.2,
          duration: 600,
          ease: 'outElastic(1, .8)',
        });
      };
      const onLeave = () => {
        animate(span, {
          translateY: 0,
          rotateY: 0,
          scale: 1,
          duration: 400,
          ease: 'outQuad',
        });
      };
      span.addEventListener('mouseenter', onEnter);
      span.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        span.removeEventListener('mouseenter', onEnter);
        span.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  function handleNameClick() {
    if (prefersReducedMotion()) return;
    animate('.letter', {
      scale: [1, 1.3, 1],
      rotateY: '+=180',
      duration: 1000,
      delay: stagger(50),
      ease: 'inOutQuad',
    });
  }

  return (
    <main id="main-content" className="profile-container" tabIndex={-1}>
      <h1 ref={nameContainerRef} className="name-container" aria-label={fullName}>
        <button
          className="name-button"
          type="button"
          onClick={handleNameClick}
          aria-label="Animate Howard Sun name"
        >
          {fullName.split('').map((char, idx) =>
            char === ' ' ? (
              <span className="space" key={idx} aria-hidden="true">
                {' '}
              </span>
            ) : (
              <span className="letter" key={idx} aria-hidden="true">
                {char}
              </span>
            ),
          )}
        </button>
      </h1>
      <section className="profile-info" aria-labelledby="profile-title">
        <h2 id="profile-title" className="title">
          Full-Stack Software Engineer | TypeScript, React, Node.js | Security, Testing & Reliable
          Systems
        </h2>
        <p className="bio">
          I work across the stack in TypeScript, React, and Node.js, with a focus on code quality,
          test coverage, and systems that are easy for other engineers to maintain. I've been on
          both the contributor side and the founding side — I co-led the engineering team at Mission
          Coders, shipping a kids' coding platform 5 weeks ahead of schedule.
        </p>
        <p className="bio">
          Now I'm building toward AI engineering — learning RAG systems, LLM integrations, and
          vector search by shipping real projects. I document the journey through build-along
          content and open-source code.
        </p>
      </section>
      <div className="social-links" aria-label="Primary actions">
        <Link className="social-link primary" to="/project">
          View Projects
        </Link>
        <Link className="social-link" to="/techstack">
          Tech Stack
        </Link>
        <a className="social-link" href={RESUME_PDF_PATH}>
          Resume PDF
        </a>
        <a className="social-link" href={RESUME_DOCX_PATH}>
          Resume DOCX
        </a>
        <a
          className="social-link"
          href="https://github.com/howardsun-dev"
          target="_blank"
          rel="noreferrer"
        >
          GitHub<span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a
          className="social-link"
          href="https://www.linkedin.com/in/howardsun-swe"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </main>
  );
}
