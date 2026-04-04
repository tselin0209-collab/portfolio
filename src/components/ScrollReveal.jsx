import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  baseOpacity = 0.1,
  enableBlur = false,
  blurStrength = 4,
}) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      // At bottom of page — show everything fully
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
      if (atBottom) { setProgress(1); return; }

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh;
      const end = vh * 0.3;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  return (
    <span ref={ref} style={{ display: 'block' }}>
      {words.map((word, i) => {
        const wordProgress = Math.min(1, Math.max(0, (progress * words.length - i) ));
        const opacity = baseOpacity + (1 - baseOpacity) * wordProgress;
        const blur = enableBlur ? blurStrength * (1 - wordProgress) : 0;
        return (
          <span
            key={i}
            style={{
              opacity,
              filter: blur > 0 ? `blur(${blur.toFixed(2)}px)` : 'none',
              display: 'inline-block',
              marginRight: '0.25em',
              willChange: 'opacity, filter',
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
