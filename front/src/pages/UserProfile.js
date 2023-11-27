import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "../redux/authSlice";
import { getUserData } from "../redux/userSlice";
import Logo from "../assets/img/argentBankLogo.png";

const UserProfile = () => {
  const { token } = useSelector((state) => state.auth);
  const userDetails = useSelector((state) => state.user.userDetails);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      dispatch(getUserData(token))
        .unwrap()
        .catch(() => {
          dispatch(signOut());
          navigate("/signin");
        });
    }
  }, [token, dispatch, navigate]);

  if (isLoading || !userDetails) {
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
            {userDetails.body.email}
          </Link>
          <Link className="main-nav-item" onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      </nav>{" "}
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back, {userDetails ? userDetails.body.firstName : "User"}
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        {/* Début des sections de compte */}
        <h2 className="sr-only">Accounts</h2>

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
