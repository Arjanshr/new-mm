import {
  CSSProperties,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

interface UIInputProps {
  id?: string;
  label?: string;
  name?: string;
  isRequired?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  error?: string;
  value?: string | number | null;
  instruction?: string;
  readOnly?: boolean;
  autoComplete?: string;
  min?: string;
  max?: string;
}

export default function UIInput({
  id,
  label,
  name,
  isRequired,
  placeholder,
  type,
  style,
  onClick,
  onChange,
  error,
  value,
  instruction,
  readOnly,
  autoComplete,
  max,
  min,
  onKeyPress,
}: UIInputProps) {
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const toggleShow = () => setShow((prev) => !prev);

  useEffect(() => {
    const inputElement = inputRef.current;

    const handleWheel = (e: WheelEvent) => {
      if (document.activeElement === inputElement && type === "number") {
        inputElement?.blur();
      }
    };

    inputElement?.addEventListener("wheel", handleWheel);

    return () => {
      inputElement?.removeEventListener("wheel", handleWheel);
    };
  }, [type]);

  return (
    <div
      className="flex flex-col items-start gap-2 w-full relative"
      style={style}
    >
      {label && (
        <label
          htmlFor={id ?? ""}
          className="text-[#636568] text-base font-medium"
        >
          {label} {isRequired ? "*" : ""}
        </label>
      )}

      <input
        type={type === "password" ? (show ? "text" : "password") : type}
        id={id}
        name={name}
        className={`p-2  rounded-[4px] h-10 w-full outline-none text-base bg-white text-[#636568] placeholder-opacity-30 border focus:border-secondary ${
          error ? "border-red-500" : "border-[#B4BEC8]"
        } ${type === "date" ? "date-picker" : ""} ${
          readOnly ? "opacity-70" : ""
        }`}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        onClick={onClick}
        onChange={onChange}
        value={value ?? ""}
        required={isRequired}
        readOnly={readOnly}
        autoComplete={autoComplete ?? name}
        min={min}
        max={max}
        ref={inputRef}
      />

      {error && <span className="text-red-500 text-base">{error}</span>}

      {type === "password" && (
        <i
          className={`fa-regular fa-eye${
            show ? "" : "-slash"
          } absolute right-2 cursor-pointer text-[#B4BEC8] text-base`}
          onClick={toggleShow}
          style={{
            // bottom: label && !error ? "35%" : !label && error ? "65%" : "50%",
            bottom: "10%",
          }}
        ></i>
      )}

      {instruction && (
        <p className="text-[#B4BEC8] text-base font-normal opacity-50 leading-6">
          {instruction}
        </p>
      )}
    </div>
  );
}
