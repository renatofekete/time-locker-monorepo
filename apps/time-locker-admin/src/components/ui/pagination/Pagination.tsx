type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={`flex gap-5 ${className}`}>
      <button
        className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-sm border border-neutral-300/50"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        {"<"}
      </button>
      {totalPages <= 5 ? (
        Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-sm border ${
                page === currentPage
                  ? "bg-white border-blue-500"
                  : "bg-neutral-300/50 text-neutral-900/50 border-neutral-300/50"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })
      ) : (
        <>
          <button
            className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-sm border ${
              currentPage === 1
                ? "bg-white border-blue-500"
                : "bg-neutral-300/50 text-neutral-900/50 border-neutral-300/50"
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          {currentPage > 3 && (
            <span className="w-10 h-10 flex items-center justify-center">
              ...
            </span>
          )}
          {Array.from({ length: 3 }, (_, i) => {
            const page =
              currentPage === totalPages
                ? currentPage - 2 + i
                : currentPage === 1
                ? currentPage + i
                : currentPage - 1 + i;
            if (page > 1 && page < totalPages) {
              return (
                <button
                  key={page}
                  className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-sm border ${
                    page === currentPage
                      ? "bg-white border-blue-500"
                      : "bg-neutral-300/50 text-neutral-900/50 border-neutral-300/50"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              );
            }
            return null;
          })}
          {currentPage < totalPages - 2 && (
            <span className="w-10 h-10 flex items-center justify-center">
              ...
            </span>
          )}
          <button
            className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-sm border ${
              currentPage === totalPages
                ? "bg-white border-blue-500"
                : "bg-neutral-300/50 text-neutral-900/50 border-neutral-300/50"
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-sm border border-neutral-300/50"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
