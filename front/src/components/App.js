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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken && !token) {
      dispatch(reauthenticate(jwtToken));
    }
  }, [dispatch, token]);

  useEffect(() => {
    // Redirige l'utilisateur vers la page de profil s'il est connecté
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

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
