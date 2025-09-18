type AlertProps = {
  text: string;
  type: "success" | "error" | "warning" | "info";
  icon?: React.ReactNode;
  className?: string;
};

const AlertTypes = {
  success: "bg-green-700/10 text-green-700",
  error: "bg-red-700/10 text-red-700",
  warning: "bg-yellow-700/10 text-yellow-700",
  info: "bg-blue-700/10 text-blue-700",
};

const Alert = ({ text, icon, type, className }: AlertProps) => {
  return (
    <div
      role="alert"
      className={`px-3.5 py-1 ${AlertTypes[type]} flex items-center gap-1 ${className}`}
    >
      {text} {icon && icon}
    </div>
  );
};

export default Alert;
