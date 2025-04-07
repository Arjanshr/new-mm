import JoditEditor, { Jodit } from "jodit-react";
import dynamic from "next/dynamic";
import {
  CSSProperties,
  ChangeEvent,
  ChangeEventHandler,
  useMemo,
  useRef,
} from "react";

interface UITextEditorProps {
  id: string;
  label?: string;
  name?: string;
  isRequired?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  error?: string;
  defaultValue?: string | null;
  formatedEditorConfig?: {
    readonly?: boolean;
    height?: number;
    theme?: "dark" | "light";
    width?: number;
  };
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  instruction?: string;
  rows?: number;
  cols?: number;
}
export default function UITextEditor({
  id,
  error,
  isRequired,
  label,
  name,
  placeholder,
  style,
  formatedEditorConfig,
  defaultValue,
  onChange,
  instruction,
  cols,
  rows,
}: UITextEditorProps) {
  const editorRef = useRef<Jodit | null>(null);
  const config = useMemo(
    () => ({
      ...formatedEditorConfig,
      statusbar: false,
    }),
    []
  );

  return (
    <div className="flex flex-col gap-2 w-full relative" style={style}>
      {label && (
        <label
          htmlFor={id || ""}
          className="text-[#636568] font-semibold text-base"
        >
          {label} {isRequired && "*"}
        </label>
      )}

      {!formatedEditorConfig ? (
        <textarea
          placeholder={placeholder}
          name={name}
          id={id}
          cols={cols ?? 30}
          rows={rows ?? 10}
          value={defaultValue ?? ""}
          className={`p-2 border ${
            error ? "border-red-500" : "border-[#B4BEC8]"
          } rounded-[4px] outline-none bg-white text-[#636568] w-full text-base resize-y focus:border-primary`}
          onChange={onChange}
          required={isRequired}
        ></textarea>
      ) : (
        <JoditEditor
          config={config}
          ref={editorRef}
          value={defaultValue ?? ""}
          onBlur={(e) =>
            onChange &&
            onChange({
              target: {
                name: name ?? "TextEditor",
                value: e,
                required: isRequired,
                type: "text",
              },
            } as unknown as ChangeEvent<HTMLTextAreaElement>)
          }
          className={`${error ? "border-red-500" : "border-[#B4BEC8]"}`}
          onChange={(e) =>
            onChange &&
            onChange({
              target: {
                name: name ?? "TextEditor",
                value: e,
                required: isRequired,
                type: "text",
              },
            } as unknown as ChangeEvent<HTMLTextAreaElement>)
          }
        />
      )}

      {error && <span className="text-red-500 text-base">{error}</span>}

      {instruction && (
        <p className="text-webblack text-base font-normal">{instruction}</p>
      )}
    </div>
  );
}
