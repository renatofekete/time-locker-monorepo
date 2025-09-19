import React from "react";

export const Loader = () => {
  return (
    <div
      className="flex items-center justify-center py-20 bg-white"
      role="status"
      aria-live="polite"
    >
      <svg
        className="animate-spin h-12 w-12 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M12 2a10 10 0 00-3.95.81l1.43 3.32A6 6 0 0118 12h4c0-5.52-4.48-10-10-10z"
        ></path>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
