import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "../redux/authSlice";
import { getUserData } from "../redux/userSlice";
import {
  setEditedFirstName,
  setEditedLastName,
  setIsEditing,
  updateUserData,
} from "../redux/editUserSlice";
import Logo from "../assets/img/argentBankLogo.png";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { userDetails, isLoading } = useSelector((state) => state.user);
  const { isEditing, editedFirstName, editedLastName } = useSelector(
    (state) => state.editUser
  );

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

  const handleEditClick = () => {
    dispatch(setIsEditing(true));
    dispatch(setEditedFirstName(userDetails.body.firstName));
    dispatch(setEditedLastName(userDetails.body.lastName));
  };

  const handleSaveClick = async () => {
    dispatch(
      updateUserData({
        token,
        firstName: editedFirstName,
        lastName: editedLastName,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getUserData(token));
      })
      .catch(() => {
        dispatch(signOut());
        navigate("/signin");
      });
  };

  const handleCancelClick = () => {
    dispatch(setIsEditing(false));
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/signin");
  };

  if (isLoading || !userDetails) {
    return <div>Loading...</div>;
  }

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
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i> {userDetails.body.firstName}{" "}
          </Link>
          <Link className="main-nav-item" onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i> Sign Out{" "}
          </Link>
        </div>
      </nav>{" "}
      <main className="main bg-dark">
        <div className="header">
          <h1 className="welcome-back">
            Welcome back
            <br />
            {!isEditing ? (
              <>
                {userDetails.body.firstName} {userDetails.body.lastName}
                <br />
                <button className="edit-button" onClick={handleEditClick}>
                  Edit Name
                </button>
              </>
            ) : (
              <>
                <input
                  className="edit-user"
                  type="text"
                  value={editedFirstName}
                  onChange={(e) => dispatch(setEditedFirstName(e.target.value))}
                />{" "}
                <input
                  className="edit-user"
                  type="text"
                  value={editedLastName}
                  onChange={(e) => dispatch(setEditedLastName(e.target.value))}
                />
                <br />
                <button className="edit-button" onClick={handleSaveClick}>
                  Save
                </button>{" "}
                <button className="edit-button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </>
            )}
          </h1>
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
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default UserProfile;
