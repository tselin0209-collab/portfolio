import styles from './HoverCard.module.css';

const LINE_ANGLE = -38; // degrees, fixed

export default function HoverCard({ work, visible, y }) {
  if (!visible || !work) return null;

  const rad = (LINE_ANGLE * Math.PI) / 180;
  const lineLen = 80;
  const dx = lineLen * Math.sin(rad);  // negative = goes left
  const dy = lineLen * Math.cos(rad);  // negative = goes up

  // SVG: line from card's top-left corner outward
  const svgW = Math.abs(dx) + 2;
  const svgH = Math.abs(dy) + 2;
  // endpoint (origin at card corner = right side of svg since dx is negative)
  const x1 = svgW - 1; // card corner
  const y1 = svgH - 1;
  const x2 = x1 + dx; // goes left
  const y2 = y1 - dy; // goes up

  return (
    <div className={styles.wrap} style={{ top: y - 20 }}>
      {/* Line from card top-left corner outward */}
      <svg
        className={styles.line}
        width={svgW}
        height={svgH}
        style={{ left: -svgW, top: -(svgH - 1) }}
      >
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000" strokeWidth="0.8" />
      </svg>

      {/* Box */}
      <div className={styles.box}>
        <p className={styles.title}>{work.title}</p>
        <div className={styles.meta}>
          <div className={styles.metaRow}>
            <span className={styles.label}>Year</span>
            <span className={styles.value}>{work.year}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.label}>Category</span>
            <span className={styles.value}>{work.category}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.label}>Client</span>
            <span className={styles.value}>{work.client}</span>
          </div>
        </div>
      </div>

      {/* Description below box */}
      <p className={styles.desc}>{work.description}</p>
    </div>
  );
}
