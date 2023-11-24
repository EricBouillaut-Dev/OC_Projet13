import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/authSlice";
import Logo from "../assets/img/argentBankLogo.png";

const SignIn = () => {
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || ""); // Initialiser avec la valeur de localStorage
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("userEmail") ? true : false
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Supprimer le login de localStorage si "Remember me" n'est pas coché
    if (!rememberMe) {
      localStorage.removeItem("userEmail");
    }
  }, [rememberMe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tentative de connexion avec:", email, password);
    dispatch(signIn({ email, password }))
      .unwrap()
      .then((response) => {
        console.log("Réponse de la connexion:", response);
        // Stocker le login dans localStorage si "Remember me" est coché
        if (rememberMe) {
          localStorage.setItem("userEmail", email);
        } else {
          localStorage.removeItem("userEmail");
        }
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Erreur de connexion:", error);
      });
  };

  return (
    <div>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link to="/signin" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
      <div className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignIn;
