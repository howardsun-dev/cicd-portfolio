import { useEffect, useRef } from 'react';
import { animate, stagger, createTimeline } from 'animejs';
import { Link } from '@tanstack/react-router';
import './ProfilePage.css';

const fullName = 'Howard Sun';

export default function ProfilePage() {
  const nameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = Array.from(nameContainerRef.current!.querySelectorAll('.letter'));

    const timeline = createTimeline();

    timeline.add(letters, {
      scale: [0, 1],
      duration: 1000,
      delay: stagger(100),
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

    // Letter hover events (animejs v4 syntax)
    letters.forEach((span) => {
      span.addEventListener('mouseenter', function () {
        animate(span, {
          translateY: -20,
          rotateY: '1turn',
          scale: 1.2,
          duration: 600,
          ease: 'outElastic(1, .8)',
        });
      });
      span.addEventListener('mouseleave', function () {
        animate(span, {
          translateY: 0,
          rotateY: 0,
          scale: 1,
          duration: 400,
          ease: 'outQuad',
        });
      });
    });

    // Cleanup listeners on unmount
    return () => {
      letters.forEach((span) => {
        span.replaceWith(span.cloneNode(true));
      });
    };
  }, []);

  function handleNameClick() {
    animate('.letter', {
      scale: [1, 1.3, 1],
      rotateY: '+=180',
      duration: 1000,
      delay: stagger(50),
      ease: 'inOutQuad',
    });
  }

  return (
    <div className="profile-container">
      <div ref={nameContainerRef} className="name-container" onClick={handleNameClick}>
        {fullName.split('').map((char, idx) =>
          char === ' ' ? (
            <span className="space" key={idx}>
              {' '}
            </span>
          ) : (
            <span className="letter" key={idx}>
              {char}
            </span>
          ),
        )}
      </div>
      <div className="profile-info">
        <div className="title">Software Engineer</div>
        <div className="bio">
          As a software engineer, I’m passionate about designing and developing applications that
          make technology more engaging and accessible. My work bridges the gap between creativity
          and engineering, focusing on crafting seamless, meaningful user experiences.
          <br />
        </div>
        <div className="tech-container">
          <div className="column">
            <h2>Test column1</h2>
          </div>
          <div className="column">Test column2</div>
          <div className="column">Test column3</div>
        </div>
      </div>
      <div className="social-links">
        <a className="social-link" href="https://github.com/howardsun-dev" target="_blank">
          GitHub
        </a>
        <a className="social-link" href="https://www.linkedin.com/in/howardsun-swe" target="_blank">
          LinkedIn
        </a>
        <a
          className="social-link"
          href="http://howardsun.me/resume/Howard_Sun-Resume-PROJECT-2025.pdf"
          target="_blank"
        >
          Resume
        </a>
        <Link className="social-link" to="/project">
          Projects
        </Link>
      </div>
    </div>
  );
}
