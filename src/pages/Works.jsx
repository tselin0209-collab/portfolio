import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { works, categories } from '../data/works';
import styles from './Works.module.css';

export default function Works() {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All' ? works : works.filter((w) => w.category === active);

  return (
    <div className={styles.works}>
      <aside className={styles.sidebar}>
        <NavLink to="/" className={styles.sidebarName}>TSELIN LO</NavLink>
        <span className={styles.sidebarRole}>Graphic Designer</span>
        <span className={styles.sidebarLocation}>Taiwan</span>
        <nav className={styles.sidebarNav}>
          <NavLink
            to="/works"
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.sidebarActive : ''}`
            }
          >
            Works
          </NavLink>
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
        <div className={styles.filterBar}>
          {categories.map((cat, i) => (
            <span key={cat} className={styles.filterGroup}>
              <button
                className={`${styles.filterBtn} ${active === cat ? styles.filterActive : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
              {i < categories.length - 1 && (
                <span className={styles.filterDot}>·</span>
              )}
            </span>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((work) => (
            <Link to={`/works/${work.id}`} key={work.id} className={styles.card}>
              <div className={styles.imgWrap}>
                {work.type === 'video' ? (
                  <video
                    src={`/works/${encodeURIComponent(work.cover)}`}
                    className={styles.img}
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={`/works/${encodeURIComponent(work.cover)}`}
                    alt={work.title}
                    className={styles.img}
                  />
                )}
              </div>
              <div className={styles.meta}>
                <span className={styles.cardTitle}>{work.title}</span>
                <span className={styles.cardCategory}>{work.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
