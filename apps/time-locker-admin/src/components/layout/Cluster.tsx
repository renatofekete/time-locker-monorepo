type ClusterProps = {
  children: React.ReactNode;
  className?: string;
};

const Cluster = ({ children, className }: ClusterProps) => {
  return (
    <div
      className={`grid gap-5 xl:grid-cols-12 grid-cols-4 xl:grid-rows-12 grid-rows-4 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Cluster;
