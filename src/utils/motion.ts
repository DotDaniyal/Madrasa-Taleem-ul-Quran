import { useEffect, useState } from 'react';
import { AnimationSettings } from '../data/cmsInitialData';

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

export interface ResolvedMotionConfig {
  enabled: boolean;
  intensity: 'subtle' | 'balanced' | 'expressive';
  duration: number;
  stagger: number;
  enableBackgroundEffects: boolean;
  enableScrollReveals: boolean;
  enableHoverEffects: boolean;
  enableScrollProgressBar: boolean;
  enableCounters: boolean;
}

export function resolveMotionConfig(
  settings?: AnimationSettings,
  reducedMotion: boolean = false
): ResolvedMotionConfig {
  const base = settings || {
    enabled: true,
    intensity: 'balanced',
    enableBackgroundEffects: true,
    enableScrollReveals: true,
    enableHoverEffects: true,
    enableScrollProgressBar: true,
    enableCounters: true
  };

  // If user OS prefers reduced motion, disable or minimize all decorative animations
  if (reducedMotion || !base.enabled) {
    return {
      enabled: false,
      intensity: 'subtle',
      duration: 0,
      stagger: 0,
      enableBackgroundEffects: false,
      enableScrollReveals: false,
      enableHoverEffects: false,
      enableScrollProgressBar: false,
      enableCounters: false
    };
  }

  const durationMap = {
    subtle: 0.35,
    balanced: 0.55,
    expressive: 0.8
  };

  const staggerMap = {
    subtle: 0.05,
    balanced: 0.1,
    expressive: 0.16
  };

  return {
    enabled: true,
    intensity: base.intensity || 'balanced',
    duration: durationMap[base.intensity || 'balanced'],
    stagger: staggerMap[base.intensity || 'balanced'],
    enableBackgroundEffects: base.enableBackgroundEffects !== false,
    enableScrollReveals: base.enableScrollReveals !== false,
    enableHoverEffects: base.enableHoverEffects !== false,
    enableScrollProgressBar: base.enableScrollProgressBar !== false,
    enableCounters: base.enableCounters !== false
  };
}

// Motion variant presets
export const createScrollVariants = (config: ResolvedMotionConfig) => {
  if (!config.enabled || !config.enableScrollReveals) {
    return {
      hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
      visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0 } }
    };
  }

  const distance = config.intensity === 'subtle' ? 14 : config.intensity === 'balanced' ? 24 : 36;

  return {
    fadeUp: {
      hidden: { opacity: 0, y: distance },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: config.duration, ease: [0.25, 0.1, 0.25, 1.0] as const }
      }
    },
    fadeDown: {
      hidden: { opacity: 0, y: -distance },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: config.duration, ease: [0.25, 0.1, 0.25, 1.0] as const }
      }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: config.duration * 0.9, ease: 'easeOut' as const }
      }
    },
    slideRight: {
      hidden: { opacity: 0, x: -distance },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: config.duration, ease: [0.25, 0.1, 0.25, 1.0] as const }
      }
    },
    slideLeft: {
      hidden: { opacity: 0, x: distance },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: config.duration, ease: [0.25, 0.1, 0.25, 1.0] as const }
      }
    },
    zoomIn: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: config.duration, ease: 'easeOut' }
      }
    },
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: config.stagger,
          delayChildren: 0.05
        }
      }
    }
  };
};
