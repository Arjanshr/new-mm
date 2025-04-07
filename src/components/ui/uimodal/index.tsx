import { ReactNode, useRef } from "react";

interface UIModalProps {
  children?: ReactNode;
  onClose?: () => void;
  style?: React.CSSProperties;
  showAnimation?: boolean;
}

export default function UIModal({
  children,
  onClose,
  style,
  showAnimation,
}: UIModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleCancel = () => {
    if (!showAnimation) return onClose?.();

    modalRef.current?.classList.add("hide");
    setTimeout(() => onClose?.(), 700);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-10" />
      <div
        className={`relative bg-white shadow-lg border rounded-lg overflow-hidden max-w-[98%] max-h-[98%] transition-all duration-300 ${
          showAnimation ? "animate-fadeInDown" : ""
        } ${
          modalRef.current?.classList.contains("hide")
            ? "animate-fadeOutUp"
            : ""
        }`}
        style={style}
        ref={modalRef}
      >
        <div
          className="absolute top-4 right-5 z-50 text-gray-700 cursor-pointer hover:opacity-80"
          onClick={handleCancel}
        >
          <i className="fa-regular fa-times text-2xl" />
        </div>
        {children}
      </div>
    </div>
  );
}
