import { useTheme } from "./hooks/use-theme";
import "./index.css";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="theme-Container">
      <button className="toggle-theme" onClick={toggleTheme}>
        Toggle Theme
      </button>
      <span className="theme">{theme}</span>
    </div>
  );
};

export default ToggleTheme;
