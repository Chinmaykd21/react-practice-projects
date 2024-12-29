import "./index.css";
import Image1 from "./Fancy_Demon.jpg";
import Image2 from "./another_one.jpg";
import Image3 from "./wallhaven-4dp86j.jpg";
import Image4 from "./wallhaven-9dov8d.jpg";
import { FC, useEffect, useRef, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        console.log("next index", nextIndex);
        scrollImages(nextIndex);
        return nextIndex;
      });
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [scrollInterval]);

  const scrollImages = (index: number) => {
    const container = containerRef.current;

    if (!container) return;

    const containerWidth = container.offsetWidth;
    const scrollPosition = index * containerWidth;
    requestAnimationFrame(() => {
      container.scrollTo({
        behavior: "smooth",
        left: scrollPosition,
      });
    });
  };

  const handleButtonClick = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    setCurrentIndex(index);
    container.scrollTo({
      behavior: "smooth",
      left: container.offsetWidth * index,
    });
  };

  return (
    <div className="autoscroll-container">
      <div className="scroll-content" ref={containerRef}>
        {images.map((image, index) => (
          <div className="image-wrapper" key={index}>
            <img className="image" src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`button ${currentIndex === index ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
