"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import dashboardFit from "@/public/dashboad_fit.bmp";
import treino from "@/public/treino.bmp";
import volumeTotalTreinos from "@/public/volume_total.bmp";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageData {
  src: StaticImageData;
}

const images: ImageData[] = [
  {
    src: dashboardFit,
  },
  {
    src: treino,
  },
  {
    src: volumeTotalTreinos,
  },
];

export default function ImageSlider(): JSX.Element {
  const TAMANHO_DA_WIDTH = 768;
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < TAMANHO_DA_WIDTH);
  const prevState = useRef(isSmallScreen);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const newValue = window.innerWidth < TAMANHO_DA_WIDTH;
      if (prevState.current !== newValue) {
        prevState.current = newValue;
        setIsSmallScreen(newValue);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 4000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full mx-auto mt-4">
      <div
        className="relative h-[460px] mx-12 group"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={images[currentIndex].src}
          alt={`Slider Image ${currentIndex + 1}`}
          objectFit="cover"
          {...(isSmallScreen ? { fill: true } : {})}
          loading="lazy"
          className="rounded-xl transition-all duration-500 ease-in-out cursor-pointer"
        />
      </div>
      <button
        className="absolute left-0 top-1/2 transform h-[50px] rounded-xl hover:bg-gray-500 mx-1 -mt-[10px] -translate-y-1/2 bg-gray-300 text-white p-2 group"
        onClick={prevSlide}
      >
        <ChevronLeft className="text-gray-400 group-hover:text-white" />
      </button>
      <button
        className="absolute right-0 top-1/2 transform h-[50px] rounded-xl hover:bg-gray-500 mx-1 -mt-[10px] -translate-y-1/2 bg-gray-300 text-white p-2 group"
        onClick={nextSlide}
      >
        <ChevronRight className="text-gray-400 group-hover:text-white" />
      </button>
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            style={{marginLeft: '5px', marginTop: '10px'}}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? "bg-gray-500 rounded-xl"
                : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
}