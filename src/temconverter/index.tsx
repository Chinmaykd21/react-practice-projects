import { useState } from "react";
import "./temconverter.css";

export const TempConverter = () => {
  // Degree Celcius to Fahrenheit
  // (Temp in C * (9/5)) + 32
  // Fahrenheit to Degree Celcius
  // (Temp in F - 32) * (5/9)
  const [farhenheit, setFarhenheit] = useState<string>("");
  const [celcius, setCelcius] = useState<string>("");

  const convertToFarhenheit = (tempInCelcius: string) => {
    setCelcius(tempInCelcius);
    try {
      const temp = parseFloat(tempInCelcius);
      if (!isNaN(temp)) {
        const farTemp = (temp * 9) / 5 + 32;
        setFarhenheit(farTemp.toFixed(2));
      } else {
        setFarhenheit("");
      }
    } catch (error) {
      console.error("Error while converting temperature to Farhenheit", error);
    }
  };

  const convertToCelcius = (tempInFarhenheit: string) => {
    setFarhenheit(tempInFarhenheit);
    try {
      const temp = parseFloat(tempInFarhenheit);
      if (!isNaN(temp)) {
        const celTemp = ((temp - 32) * 5) / 9;
        setCelcius(celTemp.toFixed(2));
      } else {
        setCelcius("");
      }
    } catch (error) {
      console.error("Error while converting temperature to Celcius", error);
    }
  };
  return (
    <>
      <h1>Temperature Converter</h1>
      <div className="converter-inputs">
        <label htmlFor="celcius">Temperature in Celcius</label>
        <input
          type="text"
          name="celcius"
          id="celcius"
          value={celcius ? celcius : ""}
          onChange={(e) => convertToFarhenheit(e.target.value)}
        />
        <label htmlFor="farhenheit">Temperature in Farhenheit</label>
        <input
          type="text"
          name="farhenheit"
          id="farhenheit"
          value={farhenheit ? farhenheit : ""}
          onChange={(e) => convertToCelcius(e.target.value)}
        />
      </div>
    </>
  );
};
