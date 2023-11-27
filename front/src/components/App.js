import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reauthenticate } from "../redux/authSlice"; // Assurez-vous que le chemin est correct
import "../css/app.css";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import UserProfile from "../pages/UserProfile";
import Error from "../pages/Error";

function App() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

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
