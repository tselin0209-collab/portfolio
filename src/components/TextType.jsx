import { useState, useEffect, useRef } from 'react';

export default function TextType({
  texts = [],
  typingSpeed = 75,
  deletingSpeed = 50,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = '|',
  cursorBlinkDuration = 0.5,
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
}) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [started, setStarted] = useState(false);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Start typing when element enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cursor blink
  useEffect(() => {
    if (!showCursor) return;
    const interval = setInterval(
      () => setCursorVisible((v) => !v),
      cursorBlinkDuration * 1000
    );
    return () => clearInterval(interval);
  }, [showCursor, cursorBlinkDuration]);

  // Typing engine
  useEffect(() => {
    if (!started || !texts.length) return;
    const currentText = texts[textIndex];

    const getSpeed = () =>
      variableSpeedEnabled
        ? Math.random() * (variableSpeedMax - variableSpeedMin) + variableSpeedMin
        : isDeleting ? deletingSpeed : typingSpeed;

    const tick = () => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
          timeoutRef.current = setTimeout(tick, getSpeed());
        } else if (texts.length > 1) {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseDuration);
        }
        // single text: stop after fully typed
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
          timeoutRef.current = setTimeout(tick, getSpeed());
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, getSpeed());
    return () => clearTimeout(timeoutRef.current);
  }, [started, displayText, isDeleting, textIndex, texts]);

  return (
    <span ref={containerRef}>
      {displayText}
      {showCursor && (
        <span style={{ opacity: cursorVisible ? 1 : 0, transition: 'none' }}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
