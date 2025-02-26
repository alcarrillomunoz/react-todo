import "./App.css";
import TodoContainer from "./components/TodoContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/todos" element={<TodoContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
