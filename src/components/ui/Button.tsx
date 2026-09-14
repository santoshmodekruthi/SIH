import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'pastel';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95",
          {
            'bg-primary text-white shadow-md shadow-primary/20 hover:bg-primaryHover hover:shadow-lg hover:shadow-primary/30': variant === 'primary',
            'bg-textMain text-white hover:bg-textMain/90': variant === 'secondary',
            'border-2 border-borderLight bg-white hover:border-primary hover:text-primary text-textMain': variant === 'outline',
            'bg-transparent hover:bg-slate-100 text-textMuted hover:text-textMain': variant === 'ghost',
            'bg-pastel-green text-primary hover:bg-primary hover:text-white': variant === 'pastel',
            'h-9 px-4 text-sm': size === 'sm',
            'h-12 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg rounded-2xl': size === 'lg',
            'w-full': fullWidth,
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
