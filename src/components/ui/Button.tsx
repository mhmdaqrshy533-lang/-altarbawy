import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-black rounded-2xl transition-all duration-200 select-none focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[36px]',
    md: 'px-4 py-2.5 text-xs sm:text-sm gap-2 min-h-[44px]',
    lg: 'px-6 py-3.5 text-sm sm:text-base gap-2.5 min-h-[50px]',
  };

  const variantStyles = {
    primary: 'bg-[#004B6E] text-white hover:bg-[#003650] active:bg-[#002B40] shadow-md shadow-sky-900/15 hover:shadow-lg',
    secondary: 'bg-sky-50 text-[#004B6E] border border-sky-200 hover:bg-sky-100 active:bg-sky-200',
    outline: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-md shadow-red-900/15',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-md shadow-emerald-900/15',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'md' ? 18 : 22} />
      ) : (
        <>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          {children && <span>{children}</span>}
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        </>
      )}
    </button>
  );
};
