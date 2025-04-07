import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const useAOS = (): typeof AOS => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    return () => {
      AOS.refreshHard();
    };
  }, []);

  return AOS;
};

export default useAOS;
