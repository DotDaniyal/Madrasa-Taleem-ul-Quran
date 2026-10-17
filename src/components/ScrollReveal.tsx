import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion, resolveMotionConfig, createScrollVariants } from '../utils/motion';
import { AnimationSettings } from '../data/cmsInitialData';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fadeUp' | 'fadeDown' | 'fadeIn' | 'slideRight' | 'slideLeft' | 'zoomIn';
  delay?: number;
  className?: string;
  settings?: AnimationSettings;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  className = '',
  settings,
  once = true
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const config = resolveMotionConfig(settings, reducedMotion);

  if (!config.enabled || !config.enableScrollReveals) {
    return <div className={className}>{children}</div>;
  }

  const variants = createScrollVariants(config);
  const selectedVariant = variants[variant] || variants.fadeUp;

  return (
    <motion.div
      variants={selectedVariant as any}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: ReactNode;
  className?: string;
  settings?: AnimationSettings;
  delay?: number;
}> = ({ children, className = '', settings, delay = 0 }) => {
  const reducedMotion = usePrefersReducedMotion();
  const config = resolveMotionConfig(settings, reducedMotion);

  if (!config.enabled || !config.enableScrollReveals) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: config.stagger,
            delayChildren: delay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
