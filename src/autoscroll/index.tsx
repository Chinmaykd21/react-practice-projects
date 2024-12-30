import "./index.css";

import Image1 from "./Fancy_Demon.jpg";
import Image2 from "./another_one.jpg";
import Image3 from "./wallhaven-4dp86j.jpg";
import Image4 from "./wallhaven-9dov8d.jpg";

import { FC, useEffect, useState } from "react";

type Image = {
  src: string;
  alt: string;
};

const images: Image[] = [
  { src: Image1, alt: "Image 1" },
  { src: Image2, alt: "Image 2" },
  { src: Image3, alt: "Image 3" },
  { src: Image4, alt: "Image 4" },
];

type AutoScrollProps = {
  scrollInterval: number;
};

export const AutoScroll: FC<AutoScrollProps> = ({ scrollInterval }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, scrollInterval);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [scrollInterval]);

  return (
    <div className="autoscroll-container">
      <div
        className="scroll-content"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, idx) => (
          <img
            className={`scroll-image ${currentIndex === idx ? "active" : ""}`}
            src={image.src}
            alt={image.alt}
            key={`${image.alt}-${idx}`}
          />
        ))}
      </div>
      <button
        className="navigation-buttons next"
        onClick={handleNext}
        aria-label="Next Image"
      >
        Next
      </button>
      <button
        className="navigation-buttons prev"
        onClick={handlePrev}
        aria-label="Prev Image"
      >
        Prev
      </button>
    </div>
  );
};
