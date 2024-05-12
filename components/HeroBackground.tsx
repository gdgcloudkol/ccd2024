"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import bg_slide1 from "../public/assets/images/bg_slide_1.jpeg";
import bg_slide2 from "../public/assets/images/bg_slide_2.jpeg";
import bg_slide3 from "../public/assets/images/bg_slide_3.jpeg";
import bg_slide4 from "../public/assets/images/bg_slide_4.jpeg";
import { cn } from "@/lib/utils";

const images = [bg_slide1, bg_slide2, bg_slide3, bg_slide4];

export default function HeroBackground({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className={cn("bg-black", className)}>
      {images.map((imgData, index) => (
        <Image
          key={index}
          src={imgData}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          alt='background image'
          className={cn(
            currentIndex === index ? "opacity-1" : "opacity-[0.3]",
            "w-full h-full transition-opacity duration-1000 ease-linear object-cover bg-background"
          )}
        />
      ))}
    </div>
  );
}
