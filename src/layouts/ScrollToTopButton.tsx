import { useEffect, useRef, useState } from "react";
import UpChevron from "../shared/components/icons/UpChevron";

export default function ScrollToTopButton() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
      const scrollPositionTop = document.documentElement.scrollTop;
      const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollProgress = (scrollPositionTop / pageHeight) * 100;
      if (progressBarRef.current === null) return;
      progressBarRef.current.style.height = `${scrollProgress}%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showScrollToTop && (
        <button
          className="fixed bottom-5 right-10 md:right-[10%] border-1 rounded-full p-2 z-50 cursor-pointer hover:scale-105 duration-300"
          onClick={scrollToTop}
          ref={buttonRef}
        >
          <UpChevron />
        </button>
      )}
      <div className="fixed top-1/2 -translate-y-1/2 right-5 w-1 h-20 bg-slate-400 rounded-full">
        <div
          className="w-full dark:bg-orange-300 bg-blue-500 rounded-full"
          ref={progressBarRef}
        />
      </div>
    </>
  );
}
