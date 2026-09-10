import React, { ComponentProps } from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface CardProps extends ComponentProps<typeof motion.div> {
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
        className={cn(
          "bg-surface rounded-2xl md:rounded-3xl border border-borderLight shadow-soft",
          hoverEffect && "hover:shadow-soft-lg hover:border-primary/20 transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';
