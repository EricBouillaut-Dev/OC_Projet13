import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signOut, reauthenticate } from "../redux/authSlice";
import Logo from "../assets/img/argentBankLogo.png";

const UserProfile = () => {
  const { token } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Si aucun token n'est disponible, rediriger vers la page de connexion
      navigate("/signin");
    } else {
      // Si un token est présent, tenter de récupérer les informations de l'utilisateur
      dispatch(reauthenticate(token))
        .unwrap()
        .then((response) => {
          // Si la reconnexion réussit, définir les informations de l'utilisateur
          setUserInfo(response);
        })
        .catch(() => {
          // En cas d'erreur, déconnexion et redirection
          dispatch(signOut());
          navigate("/signin");
        });
    }
  }, [token, dispatch, navigate]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/signin");
  };

  return (
    <div className="main bg-dark">
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
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            {userInfo.body.email}
          </Link>
          <Link className="main-nav-item" onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      </nav>{" "}
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back, {userInfo ? userInfo.body.firstName : "User"}</h1>
          <button className="edit-button">Edit Name</button>
        </div>
        {/* Début des sections de compte */}
        <h2 classname="sr-only">Accounts</h2>

        {/* Compte Checking */}
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        {/* Compte Savings */}
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        {/* Compte Credit Card */}
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        {/* Fin des sections de compte */}
        {/* Affichage des informations du compte de l'utilisateur */}
        {/* ... */}
      </main>
      <footer className="footer">{/* Pied de page */}</footer>
    </div>
  );
};

export default UserProfile;
