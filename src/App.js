import "./App.css";
import QuizApp from "./components/QuizApp/QuizApp";
import Start from "./components/Start/Start";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact element={<Start />} path="/" />
          <Route exact element={<QuizApp isAllowed={false} />} path="/quiz" />
          <Route exact element={<About />} path="/about" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
