import { useEffect, useRef, useState } from 'react';

export default function FadeUp({ children, delay = 0, className }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: 'block',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ease-in-out ${delay}ms, transform 1s ease-in-out ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </span>
  );
}
