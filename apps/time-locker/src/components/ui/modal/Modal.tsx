import { useEffect, useRef } from "react";
import { Alert, Loader } from "time-locker-ui";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  error?: Error | null | string | unknown;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  isLoading,
  error,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{title || "Modal"}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>
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
    </div>
  );
};

export default Modal;
