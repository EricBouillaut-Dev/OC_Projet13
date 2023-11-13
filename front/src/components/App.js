import { Routes, Route } from "react-router-dom";
import "../css/app.css";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import UserProfile from "../pages/UserProfile";
import Error from "../pages/Error";

function App() {
  return (
    <div className="routes">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
