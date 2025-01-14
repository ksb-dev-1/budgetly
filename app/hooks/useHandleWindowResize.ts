import { useEffect } from "react";

export function useHandleWindowResize(
  isMenuOpen: boolean,
  setIsMenuOpen: (isOpen: boolean) => void
) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, setIsMenuOpen]);
}
