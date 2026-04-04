import { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { works, categories } from '../data/works';
import VariableProximity from '../components/VariableProximity';
import ScrollReveal from '../components/ScrollReveal';
import styles from './Works.module.css';

// Detect if this cover is the first in a named series (e.g. "name-1.jpg")
function isFirstInSeries(cover) {
  return /-1\.[^.]+$/.test(cover);
}

// Detect if cover has any numbered suffix at all
function hasSeriesSuffix(cover) {
  return /-\d+\.[^.]+$/.test(cover);
}

// Show info if: first in a series OR no series suffix (standalone image) OR explicit override
function shouldShowInfo(work) {
  if (work.showInfo) return true;
  if (!hasSeriesSuffix(work.cover)) return true;
  return isFirstInSeries(work.cover);
}

export default function Works() {
  const [active, setActive] = useState('All');
  const [menuOpen, setMenuOpen] = useState(true);
  const sidebarRef = useRef(null);

  const filtered =
    active === 'All' ? works : works.filter((w) => w.category === active);

  const handleCategory = (cat) => {
    setActive(cat);
    setMenuOpen(false);
  };

  return (
    <div className={styles.works}>
      <aside className={styles.sidebar} ref={sidebarRef} style={{ position: 'relative' }}>
        <NavLink to="/" className={styles.sidebarName}>
          <VariableProximity
            label="TSELIN LO"
            fromFontVariationSettings="'wght' 400"
            toFontVariationSettings="'wght' 700"
            containerRef={sidebarRef}
            radius={90}
            falloff="linear"
          />
        </NavLink>
        <span className={styles.sidebarRole}>Graphic Designer</span>
        <nav className={styles.sidebarNav}>
          <div className={styles.worksMenu}>
            <button
              className={`${styles.sidebarLink} ${styles.sidebarActive}`}
              onClick={() => setMenuOpen((o) => !o)}
            >
              Works
            </button>
            {menuOpen && (
              <div className={styles.dropdown}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`${styles.dropdownItem} ${active === cat ? styles.dropdownActive : ''}`}
                    onClick={() => handleCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.sidebarActive : ''}`
            }
          >
            About
          </NavLink>
        </nav>
      </aside>

      <div className={styles.content}>
        <div className={styles.list}>
          {filtered.map((work) => {
            const showInfo = shouldShowInfo(work);
            return (
              <div key={work.id} className={styles.item}>
                {showInfo && (
                  <div className={styles.infoCol}>
                    <p className={styles.infoTitle}>
                      <ScrollReveal baseOpacity={0.15} enableBlur blurStrength={3}>
                        {work.title}
                      </ScrollReveal>
                    </p>
                    <div className={styles.infoMetaTable}>
                      <div className={styles.infoMetaRow}>
                        <span className={styles.infoMetaLabel}>Year</span>
                        <span className={styles.infoMetaValue}>{work.year}</span>
                      </div>
                      <div className={styles.infoMetaRow}>
                        <span className={styles.infoMetaLabel}>Category</span>
                        <span className={styles.infoMetaValue}>{work.category}</span>
                      </div>
                      {work.client !== '—' && (
                        <div className={styles.infoMetaRow}>
                          <span className={styles.infoMetaLabel}>Client</span>
                          <span className={styles.infoMetaValue}>{work.client}</span>
                        </div>
                      )}
                    </div>
                    <p className={styles.infoDesc}>
                      <ScrollReveal baseOpacity={0.15} enableBlur blurStrength={3}>
                        {work.description}
                      </ScrollReveal>
                    </p>
                  </div>
                )}
                {!showInfo && <div className={styles.infoColEmpty} />}

                <ScrollReveal baseOpacity={0} enableBlur={false}>
                <Link to={`/works/${work.id}`} className={`${styles.mediaWrap} ${work.hoverCover ? styles.mediaSwap : ''} ${work.centered ? styles.mediaWrapCentered : ''}`}>
                  {work.type === 'video' ? (
                    <video
                      src={`/works-list/${encodeURIComponent(work.cover)}`}
                      className={styles.media}
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <>
                      <img
                        src={`/works-list/${encodeURIComponent(work.cover)}`}
                        alt={work.title}
                        className={`${styles.media} ${styles.mediaBase} ${work.centered ? styles.mediaCentered : ''}`}
                      />
                      {work.hoverCover && (
                        <img
                          src={`/works-list/${encodeURIComponent(work.hoverCover)}`}
                          alt={work.title}
                          className={`${styles.media} ${styles.mediaHover}`}
                        />
                      )}
                    </>
                  )}
                </Link>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
