import { ReactNode } from "react";

export type UITabOption = {
  name: string;
  action: CallableFunction;
  active?: boolean;
};

interface UITabProps {
  actions?: ReactNode;
  items: UITabOption[];
}

export default function UITab({ actions, items }: UITabProps) {
  return (
    <div className="flex justify-between border-b border-gray-300 bg-white">
      <div className="flex items-center space-x-4">
        {items.map((item, index) => (
          <div
            className={`py-4 px-6 text-gray-500 cursor-pointer relative ${
              item.active ? "text-primary font-semibold" : ""
            }`}
            onClick={() => item.action()}
            key={index}
          >
            {item.name}
            {item.active && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-lg"></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end flex-wrap gap-4 pb-4">
        {actions}
      </div>
    </div>
  );
}
