import { Routes, Route } from "react-router-dom";
import "../css/app.css";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import Error from "../pages/Error";

function App() {
  return (
    <div>
      <NavBar />
      <div className="home-bloc">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
