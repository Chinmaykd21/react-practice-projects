import { useRef, useState } from "react";
import "./index.css";

export const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState<boolean>();
  const intervalRef = useRef<number | undefined>(undefined);

  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10); // update every 10 ms
    }, 10);
  };

  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time: number) => {
    const ms = time % 1000;
    const sec = Math.floor((time / 1000) % 60);
    const min = Math.floor(time / 60000);

    return `${String(min).padStart(2, "0")} m:${String(sec).padStart(
      2,
      "0"
    )} s:${String(ms).padStart(3, "0")} ms`;
  };
  return (
    <>
      <h1 className="timer-title">{formatTime(time)}</h1>
      <div className="buttons">
        <button
          className="timer-action-button"
          onClick={startTimer}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className="timer-action-button"
          onClick={pauseTimer}
          disabled={!isRunning}
        >
          Pause
        </button>
        <button
          className="timer-action-button"
          onClick={stopTimer}
          disabled={!isRunning}
        >
          Stop
        </button>
      </div>
    </>
  );
};
