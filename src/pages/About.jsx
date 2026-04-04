import { useRef } from 'react';
import { Link } from 'react-router-dom';
import VariableProximity from '../components/VariableProximity';
import styles from './About.module.css';

export default function About() {
  const textContainerRef = useRef(null);
  const rightRef = useRef(null);

  return (
    <div className={styles.about}>
      <aside className={styles.sidebar}>
        <Link to="/" className={styles.backArrow}>←</Link>
      </aside>

      <div className={styles.content}>
        <div className={styles.layout}>
          {/* Left column */}
          <div className={styles.left}>
            <div ref={textContainerRef} style={{ position: 'relative' }}>
              <h1 className={styles.name}>
                <VariableProximity
                  label="TSELIN LO"
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 700"
                  containerRef={textContainerRef}
                  radius={120}
                  falloff="linear"
                />
              </h1>
              <p className={styles.bio}>
                Tse-Lin Lo (羅則林), graphic designer based in Taiwan specializing in Branding, Packaging &amp; Motion Graphics.
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className={styles.right} ref={rightRef} style={{ position: 'relative' }}>
            <div className={styles.section}>
              <p className={styles.sectionLabel}>
                <VariableProximity
                  label="Specialisms"
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 700"
                  containerRef={rightRef}
                  radius={90}
                  falloff="linear"
                />
              </p>
              <ul className={styles.list}>
                <li>Branding</li>
                <li>Packaging</li>
                <li>Motion Graphics</li>
              </ul>
            </div>

            <div className={styles.divider} />

            <div className={styles.section}>
              <p className={styles.sectionLabel}>
                <VariableProximity
                  label="Based In"
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 700"
                  containerRef={rightRef}
                  radius={90}
                  falloff="linear"
                />
              </p>
              <p className={styles.sectionValue}>Taiwan</p>
            </div>

            <div className={styles.divider} />

            <div className={styles.section}>
              <p className={styles.sectionLabel}>
                <VariableProximity
                  label="Contact"
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 700"
                  containerRef={rightRef}
                  radius={90}
                  falloff="linear"
                />
              </p>
              <a href="mailto:tselin0209@gmail.com" className={styles.contactLink}>
                tselin0209@gmail.com
              </a>
            </div>
          </div>
        </div>

      </div>
      <video
        src="/bg.mp4"
        className={styles.bgVideo}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
