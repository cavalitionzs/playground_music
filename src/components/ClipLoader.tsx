import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function LoaderComponent() {
  const [loaderColor, setLoaderColor] = useState("#000000"); // default hitam

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateColor = (e?: MediaQueryListEvent) => {
      if (e ? e.matches : mediaQuery.matches) {
        setLoaderColor("#ffffff"); // putih jika dark mode
      } else {
        setLoaderColor("#000000"); // hitam jika light mode
      }
    };

    updateColor();
    mediaQuery.addEventListener("change", updateColor);

    return () => {
      mediaQuery.removeEventListener("change", updateColor);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-40">
      <ClipLoader color={loaderColor} size={50} />
    </div>
  );
}
