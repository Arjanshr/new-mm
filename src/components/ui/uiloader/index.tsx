interface UILoaderProps {
  overlay?: boolean;
}

export default function UILoader({ overlay }: UILoaderProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full z-20">
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-5"></div>
      )}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 z-10 rounded-full border-8 border-primary border-opacity-20 animate-spin border-t-transparent"></div>
        <div className="absolute inset-0 z-20 rounded-full border-8 border-primary border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}
