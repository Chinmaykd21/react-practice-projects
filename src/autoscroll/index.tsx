import "./index.css";

import Image1 from "./Fancy_Demon.jpg";
import Image2 from "./another_one.jpg";
import Image3 from "./wallhaven-4dp86j.jpg";
import Image4 from "./wallhaven-9dov8d.jpg";
import { useEffect, useState } from "react";

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

export const AutoScroll = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((next) => (next === images.length - 1 ? 0 : next + 1));
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNextClick = () => {
    setCurrentIndex((next) => (next === images.length - 1 ? 0 : next + 1));
  };
  return (
    <div className="container">
      <div
        className="scroll-content"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, idx) => {
          return (
            <div className="image-container" key={idx}>
              <img
                key={idx}
                src={image.src}
                alt={image.alt}
                width={500}
                height={500}
                loading="lazy"
                className={`scroll-image ${
                  currentIndex === idx ? "active" : ""
                }`}
              />
              <h4 className="text-on-image">{image.alt}</h4>
            </div>
          );
        })}
      </div>
      <button type="button" className="button prev" onClick={handlePrevClick}>
        Prev
      </button>
      <button type="button" className="button next" onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};
