import { ZodError, ZodType } from "zod";
import { errorToast, successToast } from "../lib/toastify";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { UISelectOptionEvent } from "@/components/ui/uiselect";
import axios from "axios";

// export const handleApiError = (error: any) => {
//   if (axios.isCancel(error)) return;

//   if (error.response && error.response.data && error.response.data.data) {
//     const errors = error.response.data.data;
//     errors.forEach((error: any) => {
//       errorToast(error.message);
//     });
//   } else if (
//     error.response &&
//     error.response.data &&
//     error.response.data.message
//   ) {
//     errorToast(error.response.data.message);
//   } else if (error.response &&
//     error.response.data &&
//     error.response.data.error) {
//     errorToast(error.response.data.error);
//   } else {
//     errorToast("Network Error");
//   }
// };

export const handleApiError = (error: any) => {
  if (axios.isCancel(error)) return;

  if (error.response && error.response.data) {
    const { message, data, error: errorMessage } = error.response.data;

    if (data && typeof data === "object") {
      Object.values(data).forEach((messages: any) => {
        if (Array.isArray(messages)) {
          messages.forEach((msg) => errorToast(msg));
        } else {
          errorToast(messages);
        }
      });
    } else if (message) {
      errorToast(message);
    } else if (errorMessage) {
      errorToast(errorMessage);
    } else {
      errorToast("An unknown error occurred.");
    }
  } else {
    errorToast("Network Error");
  }
};


export const convertCamelCaseToTitleCase = (input: string): string => {
  return input.replace(/([A-Z])/g, ' $1').trim();
};

export const isValidNepaliPhoneNumber = (value: any) => {
  const isDigitOnly = /^\d+$/.test(value);
  const phoneRegex = /^[9][6-9]\d{8}$/;

  if (isDigitOnly && value.length > 9) {
    return phoneRegex.test(value);
  }

  return isDigitOnly;
};

export const intlFormat = (val: number, locales?: string) =>
  new Intl.NumberFormat(locales ?? "en-IN").format(val);

export const parseInputType = (
  type: HTMLInputTypeAttribute | "list",
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | UISelectOptionEvent
) => {
  if (type === "checkbox" && "checked" in e.target) return e.target.checked;
  if (type === "number") return e.target.value;
  if (type === "file" && "files" in e.target) return e.target.files;
  if (type === "list") return e.target.value ?? [];
  return e.target.value;
};

export const copyToClipboard = (val: string) => {
  if (!navigator.clipboard) return errorToast("Cannot copy!");
  navigator.clipboard.writeText(val);
  successToast("Coppied!");
};

//!Zod
interface ValidationResult<T> {
  data: T;
  errors?: {
    hasError: boolean;
    error: {
      [K in keyof T]?: string;
    };
  };
}
export const validateSchema = <T>(
  data: unknown,
  schema: ZodType<T, any, any>
): ValidationResult<T> => {
  try {
    const response = schema.parse(data);

    return { data: response };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorState: {
        [K in keyof T]?: string;
      } = {};
      let hasError = false;
      error.errors.forEach(
        (err) => (errorState[err.path[0].toString() as keyof T] = err.message)
      );
      error.errors.length > 0 && (hasError = true);

      return { data: data as T, errors: { error: errorState, hasError } };
    }

    throw error;
  }
};

export const parseFormData = <T>(data: T) => {
  const formData = new FormData();
  if (typeof data !== "object" || !data) return formData;
  Object.keys(data).forEach((i) => {
    let elem = data[i as keyof typeof data] as string;
    if (elem !== undefined && elem !== null && elem !== "") {
      formData.append(i, elem);
    }
  });
  return formData;


};

export const parseJSONData = <T extends Record<string, any>>(data: T): Partial<T> => {
  if (typeof data !== "object" || data === null) return {};

  const parsedData: Partial<T> = {};

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof T];
    if (value !== undefined && value !== null && value !== "") {
      parsedData[key as keyof T] = value;
    }
  });

  return parsedData;
};


export const containsLetters = (value: string | undefined | null) => {
  return value ? /[a-zA-Z]/.test(value) : false;
};