/*
 * Pseudo-code: Profile/landing page component (the home page).
 * - Displays the full name "Howard Sun" with per-letter animated spans using anime.js.
 * - Runs a staggered entrance animation: letters scale in, then profile info fades up,
 *   then social links fade up, then the portfolio note fades up.
 * - Supports a "prefers-reduced-motion" accessibility check to skip all animations.
 * - Clicking the name triggers a 360° Y-axis rotation + scale pulse on each letter.
 * - Hovering individual letters triggers a bounce + flip animation.
 * - Renders the title, bio paragraphs, social action buttons, and a tech stack note.
 * Why added: This is the first thing visitors see. The animated name creates a memorable
 * first impression, while the bio and social links provide immediate context and actions.
 * The reduced-motion check ensures the experience is accessible.
 */

import { useEffect, useRef } from 'react';
import { animate, stagger, createTimeline } from 'animejs';
import { Link } from '@tanstack/react-router';
import { usePageTitle } from '../hooks/usePageTitle';
import ResumeSplitButton from './ResumeSplitButton';

const fullName = 'Howard Sun';

// Pseudo-code: Check whether the user has requested reduced motion in their OS settings.
// Why added: Users with vestibular disorders can be nauseated by animations. This check
// lets us skip all animation and show content immediately.
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Pseudo-code: Render the profile page with animated name, bio, social links, and resume button.
// Why added: This is the hero section — it introduces who the developer is, what they do,
// and provides clear call-to-action links to projects, tech stack, and contact.
export default function ProfilePage() {
  const nameContainerRef = useRef<HTMLHeadingElement>(null);
  usePageTitle('Howard Sun — Portfolio');

  // Pseudo-code: Run entrance animations on mount: staggered letter scale-in, then fade-up
  // for profile info, social links, and portfolio note. Also attach per-letter hover handlers.
  // Why added: The entrance animation creates a polished, engaging first impression. The
  // hover handlers on individual letters add an interactive, playful detail.
  useEffect(() => {
    const nameEl = nameContainerRef.current;
    if (!nameEl || prefersReducedMotion()) {
      document.querySelector('.profile-info')?.classList.add('is-visible');
      document.querySelector('.social-links')?.classList.add('is-visible');
      document.querySelector('.portfolio-built-note')?.classList.add('is-visible');
      return;
    }

    const letters = Array.from(nameEl.querySelectorAll('.letter'));
    const cleanups: Array<() => void> = [];
    const timeline = createTimeline();

    // Pseudo-code: Animate each letter scaling from 0 to 1 with a staggered delay.
    // Why added: The staggered elastic entrance draws the eye letter by letter,
    // creating a dramatic reveal effect for the developer's name.
    timeline.add(letters, {
      scale: [0, 1],
      duration: 1500,
      delay: stagger(100),
      ease: 'outElastic(1, .8)',
    });

    // Pseudo-code: Fade in and slide up the profile info section.
    // Why added: Staggered after the name animation, this reveals the developer's
    // title and bio in a smooth cascade.
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

    // Pseudo-code: Fade in and slide up the social links section.
    // Why added: Comes in after the bio, giving the user time to read the introduction
    // before seeing the action buttons.
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

    // Pseudo-code: Fade in and slide up the portfolio-built note.
    // Why added: The final element to appear, reinforcing the tech stack used to
    // build the portfolio itself.
    timeline.add(
      '.portfolio-built-note',
      {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 450,
        ease: 'outQuad',
      },
      '-=250',
    );

    // Pseudo-code: Attach mouseenter/mouseleave handlers to each letter span.
    // Why added: On hover, each letter bounces up and flips on the Y-axis, adding
    // a playful interactive detail. On leave, it returns to its resting position.
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

  // Pseudo-code: Animate the full name with a scale pulse + Y-axis rotation when clicked.
  // Why added: Clicking the name is an Easter egg that reinforces the playful,
  // interactive nature of the portfolio. It also demonstrates anime.js capabilities.
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
        <p className="bio open-to">
          Open to full-stack, frontend, and backend TypeScript/Node roles.
        </p>
      </section>
      <div className="social-links" aria-label="Primary actions">
        <Link className="social-link primary" to="/project">
          View Projects
        </Link>
        <Link className="social-link" to="/techstack">
          Tech Stack
        </Link>
        <ResumeSplitButton />
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
        <Link
          className="social-link"
          to="/contact"
        >
          Contact
        </Link>
      </div>
      <aside className="portfolio-built-note" aria-label="Portfolio technology note">
        This portfolio is a working project built with the same stack I use to ship software:
        React 19, TypeScript, Vite, TanStack Router, Three.js, anime.js, GitHub Actions, AWS
        S3, and CloudFront.
      </aside>
    </main>
  );
}
