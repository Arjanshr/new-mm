import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { getAccessTokenFromLocalStorage } from "@/utils/local";
interface AuthProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthProps> = ({ children }) => {
  const router = useRouter();
  const token = getAccessTokenFromLocalStorage();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

  return children;
};

export default AuthWrapper;
