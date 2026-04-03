import { NavLink } from 'react-router-dom';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.about}>
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
        <div className={styles.layout}>
          {/* Left column */}
          <div className={styles.left}>
            <h1 className={styles.name}>TSELIN LO</h1>
            <p className={styles.bio}>
              Tse-Lin Lo (羅則林), graphic designer based in Taiwan specializing
              in Branding, Packaging &amp; Digital Experience.
            </p>
            <a href="mailto:tselin0209@gmail.com" className={styles.email}>
              tselin0209@gmail.com
            </a>
          </div>

          {/* Right column */}
          <div className={styles.right}>
            <div className={styles.section}>
              <p className={styles.sectionLabel}>Specialisms</p>
              <ul className={styles.list}>
                <li>Branding</li>
                <li>Packaging</li>
                <li>Digital Experience</li>
              </ul>
            </div>

            <div className={styles.divider} />

            <div className={styles.section}>
              <p className={styles.sectionLabel}>Based In</p>
              <p className={styles.sectionValue}>Taiwan</p>
            </div>

            <div className={styles.divider} />

            <div className={styles.section}>
              <p className={styles.sectionLabel}>Contact</p>
              <a href="mailto:tselin0209@gmail.com" className={styles.contactLink}>
                tselin0209@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
