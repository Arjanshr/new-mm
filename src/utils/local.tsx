import { successToast } from "@/lib/toastify";

export const getAccessTokenFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined"
      ? localStorage.getItem("mobilemandu-user")
      : null;
  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;
  return response?.token;
};
export const getUserNameFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined"
      ? localStorage.getItem("mobilemandu-user")
      : null;
  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;
  return response?.name;
};

export const logout = () => {
  typeof window !== "undefined" && localStorage.removeItem("mobilemandu-user");
  successToast("Logged Out Successfully");
  window.location.href = "/login";
};
export const getUserIdFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined"
      ? localStorage.getItem("mobilemandu-user")
      : null;

  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;

  return response?.name;
};

export const setUserDataToLocalStorage = (data: any) => {
  localStorage.setItem("mobilemandu-user", JSON.stringify(data));
};

export const getUserDataFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined"
      ? localStorage.getItem("mobilemandu-user")
      : null;

  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;

  return response;
};

export const removeUserDataFromLocalStorage = () =>
  localStorage.removeItem("mobilemandu-user");
