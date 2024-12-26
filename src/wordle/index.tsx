import { useEffect, useState } from "react";
import { GameGrid } from "./components/gamegrid";
import "./index.css";

export type LetterState = "absent" | "present" | "correct";

export type Letter = {
  value: string;
  state: LetterState;
};

export type WordRow = {
  letters: Letter[];
};

const MAX_ATTEMPTS = 6;
const TARGET = "world";

const initializeRows = (
  maxAttempts: number,
  targetLength: number
): WordRow[] => {
  return Array.from({ length: maxAttempts }, () => ({
    letters: Array.from({ length: targetLength }, () => ({
      value: "",
      state: "absent",
    })),
  }));
};

const validateGuess = (currentGuesss: string, target: string): WordRow => {
  const targetLetters = target.split("");
  const feedback: Letter[] = currentGuesss.split("").map((letter, idx) => {
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
    initializeRows(MAX_ATTEMPTS, TARGET.length)
  );
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const handleKeyPress = (key: string) => {
    if (isGameOver) return;

    if (key === "Enter" && currentGuess.length === TARGET.length) {
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
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[a-z]$/i.test(key) && currentGuess.length < TARGET.length) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleKeyPress(e.key);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, isGameOver]);

  return (
    <div className="wordle-game">
      <h1>Wordle</h1>
      <p className="game-status">{isGameOver && "Game Over"}</p>
      <GameGrid
        rows={rows}
        currentGuess={currentGuess}
        currentRowIndex={currentRowIndex}
      />
    </div>
  );
};
