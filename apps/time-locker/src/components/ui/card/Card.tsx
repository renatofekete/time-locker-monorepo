import Loader from "@/components/ui/loader/Loader";
import Alert from "../alert/Alert";
type ClusterProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  inlineStyle?: React.CSSProperties;
  isLoading?: boolean;
  error?: Error | null | string | unknown;
};

const Card = ({
  children,
  header,
  title,
  subtitle,
  className,
  inlineStyle,
  isLoading,
  error,
}: ClusterProps) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg px-8 py-5 border border-neutral-300 border-opacity-50 max-w-full overflow-auto ${className}`}
      style={inlineStyle}
    >
      <div className="flex items-baseline mb-6 gap-1">
        {title && <h2 className="text-2xl font-bold ">{title}</h2>}
        {subtitle && (
          <span className="text-neutral-900/50 font-bold text-xs">
            {subtitle}
          </span>
        )}
      </div>
      {header ?? header}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert
          type="error"
          text={
            typeof error === "string"
              ? error
              : error instanceof Error
              ? error.message
              : "An unknown error occurred"
          }
          className="mb-4"
        />
      ) : (
        children
      )}
    </div>
  );
};
export default Card;
