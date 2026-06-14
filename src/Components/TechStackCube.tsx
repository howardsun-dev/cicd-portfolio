type CubeSlide = {
  id: string;
  title: string;
};

type TechStackCubeProps = {
  slides: CubeSlide[];
  activeIndex: number;
  onSelectSlide: (index: number) => void;
};

export default function TechStackCube({ slides, activeIndex, onSelectSlide }: TechStackCubeProps) {
  return (
    <section className="tech-cube-section" aria-labelledby="tech-cube-title">
      <div className="tech-cube-copy">
        <p className="eyebrow">Stack map</p>
        <h2 id="tech-cube-title">Rotating capability cube</h2>
        <p>
          A compact Three.js view of the stack layers behind the portfolio. Select a layer to jump to the matching skill slide.
        </p>
      </div>
      <div className="tech-cube-stage">
        <div className="tech-cube-css" aria-hidden="true">
          <span className="cube-face cube-front">React</span>
          <span className="cube-face cube-back">Node</span>
          <span className="cube-face cube-right">AWS</span>
          <span className="cube-face cube-left">Tests</span>
          <span className="cube-face cube-top">TS</span>
          <span className="cube-face cube-bottom">CI/CD</span>
        </div>
      </div>
      <div className="tech-cube-controls" aria-label="Tech stack layer navigation">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`tech-cube-chip ${activeIndex === index ? 'is-active' : ''}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => onSelectSlide(index)}
          >
            {slide.title}
          </button>
        ))}
      </div>
    </section>
  );
}