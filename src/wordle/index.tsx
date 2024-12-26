import { useEffect, useState } from "react";
import { GameGrid, Letter, WordRow } from "./components/gamegrid";
import "./index.css";

const initializeGrid = (
  maxAttempts: number,
  targetWordLength: number
): WordRow[] => {
  return Array.from({ length: maxAttempts }, () => ({
    letters: Array.from({ length: targetWordLength }, () => ({
      value: "",
      state: "absent",
    })),
  }));
};

const TARGET = "world";
const MAX_ATTEMPTS = 6;

const validateGuess = (currentGuess: string, target: string): WordRow => {
  const targetLetters = target.split("");
  const feedback: Letter[] = currentGuess.split("").map((letter, idx) => {
    if (letter === targetLetters[idx]) {
      return { value: letter, state: "correct" };
    } else if (targetLetters.includes(letter)) {
      return { value: letter, state: "present" };
    } else {
      return { value: letter, state: "absent" };
    }
  });
  return { letters: feedback };
};

export const Wordle = () => {
  const [rows, setRows] = useState<WordRow[]>(
    initializeGrid(MAX_ATTEMPTS, TARGET.length)
  );
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);

  const handleKeyPress = (key: string) => {
    if (isGameOver) return;
    if (key === "Enter" && currentGuess.length === TARGET.length) {
      console.log("Validating Keyword", currentGuess);
      const newRow = validateGuess(currentGuess, TARGET);
      const updatedRows = [...rows];
      updatedRows[currentRowIndex] = newRow;
      setRows(updatedRows);

      if (currentGuess === TARGET) {
        setIsGameOver(true);
      } else if (currentRowIndex + 1 === MAX_ATTEMPTS) {
        setIsGameOver(true);
      } else {
        setCurrentRowIndex((prev) => prev + 1);
        setCurrentGuess("");
      }
    } else if (key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[a-z]$/i.test(key) && currentGuess.length < TARGET.length) {
      setCurrentGuess(currentGuess + key);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => handleKeyPress(event.key);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="wordle-game">
      <h1 className="game-title">Wordle Game</h1>
      <p className="game-over">{isGameOver && "Game Over"}</p>
      <GameGrid
        rows={rows}
        currentGuess={currentGuess}
        currentRowIndex={currentRowIndex}
      />
    </div>
  );
};
