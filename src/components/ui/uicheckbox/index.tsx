import {
  CSSProperties,
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";

interface UICheckboxProps {
  id?: string;
  label?: ReactNode;
  name?: string;
  isRequired?: boolean;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  defaultChecked?: boolean;
  instruction?: string;
}

export default function UICheckbox({
  id,
  label,
  name,
  isRequired,
  style,
  onClick,
  onChange,
  error,
  defaultChecked,
  instruction,
}: UICheckboxProps) {
  return (
    <div
      className="flex flex-col items-start gap-2 w-full relative"
      style={style}
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <div
          className={`w-3 h-3 bg-white flex items-center text-[#B4BEC8] border rounded-[4px] relative z-10 cursor-pointer ${
            error ? "border-red-500" : "border-none"
          }`}
        >
          <input
            type="checkbox"
            id={id}
            name={name}
            onClick={onClick}
            onChange={onChange}
            defaultChecked={defaultChecked}
            required={isRequired}
            className=" w-full h-full opacity-1 cursor-pointer accent-primary"
          />
        </div>

        {label && (
          <label htmlFor={id} className="text-primary text-sm font-semibold">
            {label} {isRequired && "*"}
          </label>
        )}
      </div>

      {error && <span className="text-red-500 text-base">{error}</span>}

      {instruction && (
        <p className="text-webblack text-base font-normal">{instruction}</p>
      )}
    </div>
  );
}
