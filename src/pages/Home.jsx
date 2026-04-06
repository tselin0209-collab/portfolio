import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { slides } from '../data/works';
import VariableProximity from '../components/VariableProximity';
import styles from './Home.module.css';

const SLIDE_DURATION = 6000;
const FADE_DURATION  = 2000;


export default function Home() {
  const [slotA, setSlotA] = useState({ src: slides[0].src, type: slides[0].type });
  const [slotB, setSlotB] = useState({ src: null, type: 'image' });
  const [fading, setFading] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      const next = (indexRef.current + 1) % slides.length;
      indexRef.current = next;
      const nextSlide = slides[next];

      setSlotB({ src: nextSlide.src, type: nextSlide.type });
      setFading(true);

      setTimeout(() => {
        setSlotA({ src: nextSlide.src, type: nextSlide.type });
        setSlotB({ src: null, type: 'image' });
        setFading(false);
      }, FADE_DURATION);
    }, SLIDE_DURATION);

    return () => clearTimeout(timerRef.current);
  }, [slotA]);

  const renderMedia = (slot, extra) => {
    if (!slot.src) return null;
    const src = `/works/${encodeURIComponent(slot.src)}`;
    return slot.type === 'video' ? (
      <video key={src} className={`${styles.bg} ${extra}`} src={src} autoPlay muted loop playsInline />
    ) : (
      <img key={src} className={`${styles.bg} ${extra}`} src={src} alt="" />
    );
  };

  return (
    <div className={styles.home}>
      {/* Layer A — current (underneath) */}
      <div className={styles.layer} style={{ zIndex: 1 }}>
        {renderMedia(slotA)}
      </div>

      {/* Layer B — incoming (fades in over A) */}
      <div
        className={styles.layer}
        style={{
          zIndex: 2,
          opacity: fading ? 1 : 0,
          transition: fading ? `opacity ${FADE_DURATION}ms ease` : 'none',
        }}
      >
        {renderMedia(slotB)}
      </div>

      {/* Top-left gradient overlay */}
      <div className={styles.overlay} />

      {/* Text — top left, always white */}
      <div className={styles.textBlock} ref={textRef} style={{ position: 'relative' }}>
        <p className={styles.name}>
          <VariableProximity
            label="TSELIN LO"
            fromFontVariationSettings="'wght' 400"
            toFontVariationSettings="'wght' 700"
            containerRef={textRef}
            radius={90}
            falloff="linear"
          />
        </p>
        <p className={styles.role}>Graphic Designer</p>
        <nav className={styles.nav}>
          <Link to="/works" className={styles.navLink}>
            <VariableProximity
              label="Works"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 700"
              containerRef={textRef}
              radius={90}
              falloff="linear"
            />
          </Link>
          <Link to="/about" className={styles.navLink}>
            <VariableProximity
              label="About"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 700"
              containerRef={textRef}
              radius={90}
              falloff="linear"
            />
          </Link>
        </nav>
      </div>
    </div>
  );
}
