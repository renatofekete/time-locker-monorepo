import React, { forwardRef } from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  id?: string;
  label?: string;
  error?: string | null;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
  size?: "small" | "medium" | "large";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      className = "",
      fullWidth = true,
      required = false,
      size = "medium",
      leftIcon,
      rightIcon,
      disabled,
      ...rest
    },
    ref
  ) => {
    const sizeClasses = {
      small: "py-1 px-2 text-sm",
      medium: "py-2 px-4",
      large: "py-3 px-5 text-lg",
    };

    return (
      <div className={`${fullWidth ? "w-full" : "w-auto"} ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={`
              ${fullWidth ? "w-full" : "w-auto"}
              ${sizeClasses[size]}
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon ? "pr-10" : ""}
              ${
                error
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-primary focus:border-primary"
              }
              border rounded-lg focus:outline-none focus:ring-2
              ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""}
            `}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={helperText ? `${id}-helper-text` : undefined}
            disabled={disabled}
            {...rest}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {helperText && !error && (
          <p id={`${id}-helper-text`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
