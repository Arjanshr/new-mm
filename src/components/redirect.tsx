import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { getAccessTokenFromLocalStorage } from "@/utils/local";

interface RedirectProps {
  children: ReactNode;
}

const Redirect: React.FC<RedirectProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessTokenFromLocalStorage();
    const previousPage = document.referrer;

    if (token) {
      if (previousPage.endsWith("/login")) {
        router.push("/");
      } else if (previousPage) {
        router.back();
      } else {
        router.push("/");
      }
    }
  }, [router]);

  return <>{children}</>;
};

export default Redirect;
