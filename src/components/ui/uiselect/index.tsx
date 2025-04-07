import React, {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export interface UISelectOptionEvent {
  target: {
    name: string;
    value: string;
    required: boolean;
    type: "text";
  };
}

export interface UISelectOption {
  value: string;
  displayValue?: ReactNode;
  search?: string;
}

interface TUISelectProps {
  id?: string;
  label?: string;
  name?: string;
  isRequired?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  error?: string;
  prefix?: ReactNode | string;
  onChange?: (data: UISelectOptionEvent) => void;
  options: UISelectOption[];
  defaultValue?: string;
  disabled?: boolean;
  showSearch?: boolean;
  instruction?: string;
  zindex?: number;
}

export default function UISelect({
  id,
  label,
  name,
  isRequired,
  placeholder,
  style,
  error,
  prefix,
  onChange,
  options,
  defaultValue,
  disabled,
  showSearch,
  instruction,
  zindex,
}: TUISelectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );

  const [keyword, setKeyword] = useState<string | null>(null);
  const [filteredOptions, setFilteredOptions] =
    useState<UISelectOption[]>(options);

  const toggleShow = (val: boolean) => setShow(val);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setKeyword(keyword ? keyword.trim() : null);
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOptionIndex(index);
    const selectedOption = filteredOptions[index];
    onChange &&
      onChange({
        target: {
          name: name ?? "SelectField",
          value: selectedOption.value,
          required: isRequired ?? false,
          type: "text",
        },
      });

    toggleShow(false);
  };

  const handleDisplayEvent = () => {
    !disabled && toggleShow(!show);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (show && filteredOptions.length > 0) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const currentIndex =
          selectedOptionIndex !== null ? selectedOptionIndex : -1;
        let newIndex = currentIndex;
        if (e.key === "ArrowDown") {
          newIndex = (currentIndex + 1) % filteredOptions.length;
        } else {
          newIndex =
            currentIndex > 0 ? currentIndex - 1 : filteredOptions.length - 1;
        }
        setSelectedOptionIndex(newIndex);
      } else if (e.key === "Enter") {
        if (selectedOptionIndex !== null) {
          handleOptionSelect(selectedOptionIndex);
        }
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        optionsRef.current &&
        !optionsRef.current.contains(e.target as Node)
      ) {
        toggleShow(false);
        setFilteredOptions(options);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, optionsRef, options]);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      setFilteredOptions(
        keyword
          ? options.filter((i) =>
              (i.search ?? i.value)
                .toLowerCase()
                .includes(keyword.toLowerCase())
            )
          : options
      );
    }, 500);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [keyword, options]);

  return (
    <div
      className={`flex flex-col gap-2 w-full relative ${
        error ? "text-red-500" : ""
      }`}
      style={style}
      ref={wrapperRef}
    >
      {label && (
        <label
          htmlFor={id}
          className="text-[#636568] font-semibold text-base cursor-pointer"
          onClick={handleDisplayEvent}
          tabIndex={1}
        >
          {label} {isRequired ? "*" : ""}
        </label>
      )}

      <div className="w-full h-10 relative">
        {!show || !showSearch ? (
          <div
            className={`flex items-center justify-between p-2 border rounded-md h-full cursor-pointer ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            onClick={handleDisplayEvent}
            onKeyDown={handleKeyDown}
            tabIndex={1}
          >
            {prefix && (
              <div className="text-[#636568] text-base mr-2">{prefix}</div>
            )}
            <div className="flex-1 text-[#636568] text-base line-clamp-1">
              {selectedOptionIndex !== null &&
              filteredOptions[selectedOptionIndex]
                ? filteredOptions[selectedOptionIndex].displayValue ??
                  filteredOptions[selectedOptionIndex].value
                : defaultValue && options.find((i) => i.value === defaultValue)
                ? options.find((i) => i.value === defaultValue)?.displayValue ??
                  options.find((i) => i.value === defaultValue)?.value
                : placeholder ??
                  (options[0]
                    ? options[0].displayValue ?? options[0].value
                    : "Select")}
            </div>
            <i className="fa-regular fa-chevron-down text-base" />
          </div>
        ) : (
          <div
            className={`flex items-center justify-between p-2 border rounded-md h-full ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2 w-full">
              <i className="fa-regular fa-search text-base text-[#636568]" />
              <input
                type="text"
                autoFocus
                placeholder="Search.."
                className="flex-1 border-none outline-none text-[#636568] placeholder-[#636568] text-base"
                onChange={handleSearch}
              />
            </div>
            <i
              className="fa-regular fa-times text-base cursor-pointer text-[#636568]"
              onClick={() => toggleShow(false)}
            />
          </div>
        )}
      </div>

      {show && (
        <div
          className="absolute top-full w-full max-h-40 overflow-auto bg-white border border-gray-300 rounded-md z-10"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          ref={optionsRef}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                className={`p-2 cursor-pointer text-[#636568] text-base ${
                  index === selectedOptionIndex ? "bg-blue-100" : ""
                } hover:bg-gray-100`}
                onClick={() => handleOptionSelect(index)}
              >
                {option.displayValue ?? option.value}
              </div>
            ))
          ) : (
            <div className="text-[#636568] text-base text-center p-2">
              No Options Found
            </div>
          )}
        </div>
      )}

      {error && <span className="text-red-500 text-base">{error}</span>}
      {instruction && <p className="text-webblack text-base">{instruction}</p>}
    </div>
  );
}
