type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "gap-2 px-8 py-2.5 text-sm text-neutral-900 border border-neutral-300/50 rounded-lg",
  secondary: "",
  tertiary:
    "gap-2 px-8 py-2.5 text-sm text-neutral-900 border border-neutral-300/50 rounded-lg",
};

const Button = ({
  onClick,
  className = "",
  children,
  variant = "primary",
  isLoading,
  ...rest
}: ButtonProps) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`flex items-center cursor-pointer ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
