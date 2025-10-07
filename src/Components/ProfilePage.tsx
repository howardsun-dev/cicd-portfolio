import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './ProfilePage.css'; // See next step for the CSS

const fullName = 'Howard Sun';

export default function ProfilePage() {
  const nameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = Array.from(
      nameContainerRef.current!.querySelectorAll('.letter')
    );

    // Initial entrance animation
    anime
      .timeline()
      .add({
        targets: letters,
        scale: [0, 1],
        duration: 1000,
        delay: anime.stagger(100),
        easing: 'easeOutElastic(1, .8)',
      })
      .add(
        {
          targets: '.profile-info',
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
          easing: 'easeOutQuad',
        },
        '-=500'
      )
      .add(
        {
          targets: '.social-links',
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          easing: 'easeOutQuad',
        },
        '-=400'
      );

    // Letter hover events
    letters.forEach((span) => {
      span.addEventListener('mouseenter', function () {
        anime({
          targets: span,
          translateY: -20,
          rotateY: '1turn',
          scale: 1.2,
          duration: 600,
          easing: 'easeOutElastic(1, .8)',
        });
      });
      span.addEventListener('mouseleave', function () {
        anime({
          targets: span,
          translateY: 0,
          rotateY: 0,
          scale: 1,
          duration: 400,
          easing: 'easeOutQuad',
        });
      });
    });

    // Cleanup listeners on unmount
    return () => {
      letters.forEach((span) => {
        span.replaceWith(span.cloneNode(true)); // quick way to remove listeners
      });
    };
  }, []);

  function handleNameClick() {
    anime({
      targets: '.letter',
      scale: [1, 1.3, 1],
      rotateY: '+=180',
      duration: 1000,
      delay: anime.stagger(50),
      easing: 'easeInOutQuad',
    });
  }

  return (
    <div className="profile-container">
      <div
        ref={nameContainerRef}
        className="name-container"
        onClick={handleNameClick}
      >
        {fullName.split('').map((char, idx) =>
          char === ' ' ? (
            <span className="space" key={idx}>
              {' '}
            </span>
          ) : (
            <span className="letter" key={idx}>
              {char}
            </span>
          )
        )}
      </div>
      <div className="profile-info">
        <div className="title">Full Stack Developer</div>
        <div className="bio">
          Passionate about creating beautiful, interactive web experiences.
          <br />I love bringing ideas to life through code and design.
        </div>
      </div>
      <div className="social-links">
        <a className="social-link" href="#">
          GitHub
        </a>
        <a className="social-link" href="#">
          LinkedIn
        </a>
        <a className="social-link" href="#">
          Resume
        </a>
        <a className="social-link" href="#">
          Portfolio
        </a>
      </div>
    </div>
  );
}
