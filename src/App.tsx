import "./App.css";
import ToggleTheme from "./Theme";
import { ThemeProvider } from "./Theme/context/themeProvider";
// import { AutoComplete } from "./autocomplete";
// import { SimpleForm } from "./simpleform";
// import { Wordle } from "./wordle";
// import { LogoSvg } from "./animatelogo/logosvg";
// import { TempConverter } from "./temconverter";
// import { StopWatch } from "./stopwatch";
// import { TicTacToe } from "./tictactoe";
// import { AutoScroll } from "./autoscroll";
// import Accordion from "./Accordian";

function App() {
  return (
    <>
      {/* <TicTacToe /> */}
      {/* <StopWatch /> */}
      {/* <TempConverter /> */}
      {/* <Wordle /> */}
      {/* <LogoSvg /> */}
      {/* <Accordion /> */}
      {/* <AutoScroll scrollInterval={3000} /> */}
      {/* <SimpleForm /> */}
      {/* <AutoComplete /> */}
      <ThemeProvider>
        <ToggleTheme />
      </ThemeProvider>
    </>
  );
}

export default App;
