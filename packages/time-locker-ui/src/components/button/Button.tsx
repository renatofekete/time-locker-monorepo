import React, { forwardRef } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "danger"
  | "success"
  | "link";

export type ButtonSize = "xs" | "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark active:bg-primary-darker",
  secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300",
  tertiary:
    "bg-transparent text-neutral-900 hover:bg-gray-50 active:bg-gray-100",
  outline:
    "bg-transparent text-neutral-900 border border-neutral-300 hover:bg-gray-50 active:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
  link: "bg-transparent text-primary underline hover:text-primary-dark p-0 border-0",
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "text-xs px-2 py-1 rounded",
  sm: "text-sm px-4 py-1.5 rounded-md",
  md: "text-sm px-8 py-2.5 rounded-lg",
  lg: "text-base px-10 py-3 rounded-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      onClick,
      ...rest
    },
    ref
  ) => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      if (onClick && !isLoading && !disabled) {
        onClick(event);
      }
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        disabled={disabled || isLoading}
        className={`
          flex items-center justify-center
          font-medium transition-colors duration-150 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? "w-full" : ""}
          ${
            disabled || isLoading
              ? "opacity-60 cursor-not-allowed"
              : "cursor-pointer"
          }
          ${className}
        `}
        {...rest}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
