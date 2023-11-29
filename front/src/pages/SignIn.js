import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signIn,
  setEmail,
  setPassword,
  toggleRememberMe,
  resetAuthError,
  setEmailError,
  setPasswordError,
} from "../redux/authSlice";
import Logo from "../assets/img/argentBankLogo.png";

const SignIn = () => {
  const { email, password, rememberMe, authError } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      dispatch(setEmail(storedEmail));
    }
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetAuthError());
    dispatch(signIn({ email, password }))
      .unwrap()
      .then(() => {
        // Stocker le login dans localStorage si "Remember me" est coché
        if (rememberMe) {
          localStorage.setItem("userEmail", email);
        } else {
          localStorage.removeItem("userEmail");
        }
        navigate("/profile");
      })
      .catch((error) => {
        if (error === "Error: User not found!") {
          dispatch(setEmailError("User not found !"));
        } else if (error === "Error: Password is invalid") {
          dispatch(setPasswordError("Password is invalid !"));
        } else {
          // Gérer les autres erreurs non spécifiques
          dispatch(setEmailError("Unknown error"));
          dispatch(setPasswordError("Unknown error"));
        }
      });
  };

  return (
    <div className="bloc-body">
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
            <i className="fa fa-user-circle"></i> Sign In{" "}
          </Link>
        </div>
      </nav>
      <div className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1 className="sign-in">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                autoComplete="email"
              />
              {authError.email && (
                <div className="error-message">{authError.email}</div>
              )}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                autoComplete="current-password"
              />
              {authError.password && (
                <div className="error-message">{authError.password}</div>
              )}
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => dispatch(toggleRememberMe())}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </div>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default SignIn;
