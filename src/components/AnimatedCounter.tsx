import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from '../utils/motion';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  enabled?: boolean;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1800,
  enabled = true,
  className = '',
  prefix = '',
  suffix = ''
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValue, setDisplayValue] = useState<number | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  const isMotionAllowed = enabled && !prefersReduced;

  // Parse numeric part and extra suffix (like "+")
  const rawString = String(value).trim();
  const numericMatch = rawString.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const extraSuffix = rawString.includes('+') ? '+' : '';

  useEffect(() => {
    if (!isMotionAllowed) {
      setDisplayValue(targetNumber);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [isMotionAllowed, hasAnimated, targetNumber]);

  useEffect(() => {
    if (!hasAnimated || !isMotionAllowed) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic: 1 - pow(1 - progress, 3)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * targetNumber);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(targetNumber);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasAnimated, targetNumber, duration, isMotionAllowed]);

  // If animations disabled or before animation, display correctly
  const renderedNumber = displayValue !== null ? displayValue : (hasAnimated ? targetNumber : 0);

  return (
    <span ref={containerRef} className={className} dir="ltr">
      {prefix}
      {isMotionAllowed ? renderedNumber : rawString}
      {isMotionAllowed ? extraSuffix : ''}
      {suffix}
    </span>
  );
};
