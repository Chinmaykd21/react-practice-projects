import React, { useState } from "react";
import "./index.css";

interface AccordionItem {
  title: string;
  content: string;
}

const dummyData: AccordionItem[] = [
  { title: "Section 1", content: "Content for section 1." },
  { title: "Section 2", content: "Content for section 2." },
  { title: "Section 3", content: "Content for section 3." },
];

const Accordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {dummyData.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`accordion-title ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => toggleAccordion(index)}
          >
            {item.title}
            <span>{activeIndex === index ? "-" : "+"}</span>
          </div>
          <div
            className={`accordion-content ${
              activeIndex === index ? "show" : ""
            }`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
