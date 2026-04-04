import { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { works, categories } from '../data/works';
import VariableProximity from '../components/VariableProximity';
import styles from './Works.module.css';

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
          {filtered.map((work) => (
            <Link to={`/works/${work.id}`} key={work.id} className={styles.item}>
              <div className={styles.mediaWrap}>
                {work.type === 'video' ? (
                  <video
                    src={`/works-list/${encodeURIComponent(work.cover)}`}
                    className={styles.media}
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={`/works-list/${encodeURIComponent(work.cover)}`}
                    alt={work.title}
                    className={styles.media}
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
