import "./index.css";
import Image1 from "./Fancy_Demon.jpg";
import Image2 from "./another_one.jpg";
import Image3 from "./wallhaven-13v2o1.jpg";
import Image4 from "./wallhaven-4dp86j.jpg";
import { useEffect, useRef, useState } from "react";

type content = {
  title: string;
  source: string;
};

const images: content[] = [
  { title: "Image 1", source: Image1 },
  { title: "Image 2", source: Image2 },
  { title: "Image 3", source: Image3 },
  { title: "Image 4", source: Image4 },
];

type AutoScrollProps = {
  scrollInterval: number;
};

export const AutoScroll: React.FC<AutoScrollProps> = ({
  scrollInterval = 3000,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentIndex = 0;

    const scrollImages = () => {
      if (!container || isPaused) return;

      currentIndex = (currentIndex + 1) % images.length;
      container.scrollTo({
        left: container.clientWidth * currentIndex,
        behavior: "smooth",
      });
    };

    const intervalId = setInterval(scrollImages, scrollInterval);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [scrollInterval, isPaused]);

  const handleOnMouseEnter = () => setIsPaused(true);
  const handleOnMouseLeave = () => setIsPaused(false);

  return (
    <div className="image-container" ref={containerRef}>
      <div className="scroll-content">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.source}
            alt={image.title}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        ))}
      </div>
    </div>
  );
};
