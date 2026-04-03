import { useRef, useEffect, useState } from 'react';

const parseSettings = (str) => {
  const result = {};
  for (const [, axis, value] of str.matchAll(/'(\w+)'\s+([\d.]+)/g)) {
    result[axis] = parseFloat(value);
  }
  return result;
};

const VariableProximity = ({
  label,
  className,
  fromFontVariationSettings,
  toFontVariationSettings,
  containerRef,
  radius = 100,
  falloff = 'linear',
  style,
}) => {
  const spanRefs = useRef([]);
  const mousePos = useRef({ x: -9999, y: -9999 });
  const rafId = useRef(null);

  const fromSettings = parseSettings(fromFontVariationSettings);
  const toSettings = parseSettings(toFontVariationSettings);

  const getT = (distance) => {
    const t = Math.max(0, 1 - distance / radius);
    if (falloff === 'exponential') return t * t;
    if (falloff === 'gaussian') {
      const sigma = radius / 2;
      return Math.exp(-(distance * distance) / (2 * sigma * sigma));
    }
    return t; // linear
  };

  const update = () => {
    const { x, y } = mousePos.current;
    spanRefs.current.forEach((span) => {
      if (!span) return;
      const rect = span.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const t = getT(dist);
      const settings = Object.keys(fromSettings)
        .map((axis) => {
          const from = fromSettings[axis];
          const to = toSettings[axis] ?? from;
          return `'${axis}' ${(from + (to - from) * t).toFixed(2)}`;
        })
        .join(', ');
      span.style.fontVariationSettings = settings;
    });
  };

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };
    const onLeave = () => {
      mousePos.current = { x: -9999, y: -9999 };
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [containerRef]);

  const chars = label.split('');

  return (
    <span className={className} style={style} aria-label={label}>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => (spanRefs.current[i] = el)}
          style={{
            display: 'inline-block',
            fontVariationSettings: fromFontVariationSettings,
            whiteSpace: char === ' ' ? 'pre' : undefined,
          }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default VariableProximity;
