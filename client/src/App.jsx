import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import "./App.css";

function App() {
  return (
    <div className="font-work">
      <Routes>
        <Route index path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App
