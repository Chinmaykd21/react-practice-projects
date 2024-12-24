import { useEffect, useState } from "react";
import "./index.css";

// call an API to get the random word, assign to the state
// build the grid with 5 rows
// Input should accept only 1 char
// Once all columns in a row are filled, compare the word with random word of the
// session, if matches, change background to green
// if partially matches, then change those char background to yellow
// if none matches, then change background to gray

const BASE_URL = "https://random-word-api.herokuapp.com"; //word?length=7

export const Wordle = () => {
  const [randomWord, setRandomWord] = useState<string>("");
  useEffect(() => {
    const fetchWord = async (endpoint: string, length: number) => {
      const url = `${BASE_URL}/${endpoint}?length=${length}`;
      try {
        const response = await fetch(url);
        const word = await response.json();
        if (word) {
          setRandomWord(word);
        }
      } catch (error) {
        console.error("Error while fetching word", error);
      }
    };

    fetchWord("word", 5);
  }, []);
  return <div>{randomWord}</div>;
};
