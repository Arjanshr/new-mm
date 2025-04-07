import { FILE } from "@/constants/images";
import Image from "next/image";
import {
  CSSProperties,
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import UIButton from "../uibutton";

interface UIFileListInputProps {
  id?: string;
  label?: string;
  name?: string;
  isRequired?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  defaultValue?: string | number | null;
  instruction?: string;
  multiple?: boolean;
  accept?: string;
  resetFiles?: any;
}
export default function UIFileListInput({
  id,
  label,
  name,
  isRequired,
  placeholder,
  style,
  onChange,
  error,
  instruction,
  multiple,
  accept,
  resetFiles,
}: UIFileListInputProps) {
  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files?.length < 1) return;

    const existingFilesArray = fileList ? Array.from(fileList) : [];

    const combinedFiles = existingFilesArray.concat(Array.from(files));

    const dataTransfer = new DataTransfer();
    combinedFiles.forEach((file) => dataTransfer.items.add(file));

    setFileList(dataTransfer.files);
    onChange &&
      onChange({
        target: {
          name: name ?? "File Input",
          files: dataTransfer.files,
          required: isRequired ?? false,
          type: "file",
        },
      } as ChangeEvent<HTMLInputElement>);
  };

  const handleFileDelete = (item: keyof FileList) => {
    const files = (fileList ? Array.from(fileList) : []).filter(
      (_, index) => index !== item
    );

    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));

    setFileList(dataTransfer.files);
    onChange &&
      onChange({
        target: {
          name: name ?? "File Input",
          files: dataTransfer.files,
          required: isRequired ?? false,
          type: "file",
        },
      } as ChangeEvent<HTMLInputElement>);
  };
  useEffect(() => {
    if (resetFiles) {
      setFileList(null);
    }
  }, [resetFiles]);
  return (
    <div className="flex flex-col items-start gap-2 w-full" style={style}>
      {label ? (
        <label htmlFor={id} className="text-[#636568] font-semibold text-base">
          {label} {isRequired ? "*" : ""}
        </label>
      ) : null}

      <div
        className={`w-full flex flex-wrap gap-4 ${
          error ? "border-red-500" : ""
        }`}
      >
        {!multiple && fileList?.length === 1 ? null : (
          <div className="flex flex-col items-center justify-center gap-4 text-center border-2 border-dashed border-primary bg-white w-full h-52 relative rounded-md">
            <i className="fa-solid fa-upload text-3xl text-primary"></i>
            <span className="text-sm text-webblack">
              {placeholder
                ? placeholder
                : fileList && fileList?.length > 0
                ? `${fileList?.length} Items Selected`
                : "Drag your file(s) to start uploading"}
            </span>
            <div className="flex items-center justify-center gap-4 w-full">
              <hr className="border-t-2 w-20 border-gray-300" />
              <div className="font-semibold text-xs">OR</div>
              <hr className="border-t-2 w-20 border-gray-300" />
            </div>
            <UIButton
              label="Browse File"
              type="secondary"
              style={{ fontSize: "0.8rem", height: "2rem" }}
            />
            <input
              type="file"
              onChange={handleFileChange}
              id={id}
              name={name}
              required={isRequired}
              multiple={multiple}
              accept={accept}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        )}
        {fileList &&
          Object.values(fileList).map((item, index) => (
            <div
              className="relative w-52 h-52 border border-gray-300 rounded-md bg-white"
              key={index}
            >
              <i
                className="fa-regular fa-times absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => handleFileDelete(index)}
              ></i>
              <Image
                unoptimized
                key={index}
                src={
                  item.type.indexOf("image/") > -1
                    ? URL.createObjectURL(item)
                    : FILE
                }
                alt={item.name}
                width={1000}
                height={1000}
                quality={25}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
      </div>

      {error ? <span className="text-red-500 text-sm">{error}</span> : null}

      {instruction ? (
        <p className="text-[#636568] text-sm font-light leading-8">
          {instruction}
        </p>
      ) : null}
    </div>
  );
}
