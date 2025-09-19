import React from "react";

export type AlertProps = {
  /**
   * The alert message to display
   */
  text: string;
  /**
   * The type of alert which determines its appearance
   */
  type: "success" | "error" | "warning" | "info";
  /**
   * Optional icon to display alongside the text
   */
  icon?: React.ReactNode;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
};

const alertStyles = {
  success: "bg-green-50 text-green-800 border border-green-200",
  error: "bg-red-50 text-red-800 border border-red-200",
  warning: "bg-yellow-50 text-yellow-800 border border-yellow-200",
  info: "bg-blue-50 text-blue-800 border border-blue-200",
};

/**
 * Alert component for displaying status messages to users
 */
const Alert = ({ text, icon, type, className = "" }: AlertProps) => {
  return (
    <div
      role="alert"
      className={`px-4 py-3 rounded-lg flex items-center gap-2 ${alertStyles[type]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{text}</span>
    </div>
  );
};

export default Alert;
