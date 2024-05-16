"use client";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const GoTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
    };
    // listen for scroll events
    window.addEventListener("scroll", toggleVisibility);

    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
  };
  return (
    <div
      className={cn(
        `absolute right-10 bottom-10 group`,
        !isVisible ? "hidden" : "inline-block"
      )}
      onClick={scrollToTop}
    >
      <button className='block'>
        <div className='grid  place-content-center z-50 fixed w-12 h-12 rounded-full right-4 bottom-4 cursor-pointer leading-7 text-center bg-secondary p-4 group-hover:bg-gray-700 duration-150'>
          <ArrowUp
            color={`#8AB4F8`}
            className='h-5 w-5 group-hover:translate-y-[-4px] duration-100'
          />
        </div>
      </button>
    </div>
  );
};

export default GoTop;
