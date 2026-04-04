import { useParams, Link } from 'react-router-dom';
import { works } from '../data/works';
import styles from './WorkDetail.module.css';

function Media({ src, type, alt, className, folder = 'works' }) {
  const url = `/${folder}/${encodeURIComponent(src)}`;
  return type === 'video' ? (
    <video className={className} src={url} autoPlay muted loop playsInline controls />
  ) : (
    <img className={className} src={url} alt={alt} />
  );
}

export default function WorkDetail() {
  const { id } = useParams();
  const index = works.findIndex((w) => w.id === id);
  const work = works[index];

  if (!work) {
    return (
      <div className={styles.notFound}>
        <p>Work not found.</p>
        <Link to="/works">← Back to Works</Link>
      </div>
    );
  }

  const prev = index > 0 ? works[index - 1] : null;
  const next = index < works.length - 1 ? works[index + 1] : null;

  return (
    <div className={styles.detail}>
      <div className={styles.backRow}>
        <Link to="/works" className={styles.back}>← Works</Link>
      </div>

      <div className={styles.coverWrap}>
        <Media src={work.cover} type={work.type} alt={work.title} className={styles.cover} folder={work.coverPath || 'works'} />
      </div>

      <div className={styles.info}>
        <div className={styles.infoLeft}>
          <h1 className={styles.title}>{work.title}</h1>
          <div className={styles.metaList}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Year</span>
              <span className={styles.metaValue}>{work.year}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Category</span>
              <span className={styles.metaValue}>{work.category}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Client</span>
              <span className={styles.metaValue}>{work.client}</span>
            </div>
          </div>
        </div>
        <div className={styles.infoRight}>
          <p className={styles.description}>{work.description}</p>
        </div>
      </div>

      {work.images.length > 1 && (
        <div className={styles.gallery}>
          {work.images.slice(1).map((img, i) => (
            <div key={i} className={styles.galleryItem}>
              <Media src={img} type={work.type} alt={`${work.title} ${i + 2}`} className={styles.galleryImg} folder={work.imagesPath || 'works'} />
            </div>
          ))}
        </div>
      )}

      <div className={styles.rule} />
      <div className={styles.nav}>
        {prev ? (
          <Link to={`/works/${prev.id}`} className={styles.navLink}>
            <span className={styles.navArrow}>←</span>
            <span className={styles.navTitle}>{prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/works/${next.id}`} className={`${styles.navLink} ${styles.navRight}`}>
            <span className={styles.navTitle}>{next.title}</span>
            <span className={styles.navArrow}>→</span>
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
