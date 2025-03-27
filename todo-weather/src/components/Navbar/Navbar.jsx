import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/authSlice";
import { hideTasksOnLogout, loadTasksOnLogin } from "../../redux/taskSlice";
import { FaSignOutAlt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import AuthPopup from "../Modal/AuthPopup";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLoginClick = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleLogin = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem(email));
    if (storedUser && storedUser.password === password) {
      dispatch(login({ username: storedUser.username, email }));
      dispatch(loadTasksOnLogin()); //Load stored tasks for the logged-in user
      setModalOpen(false);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleRegister = (username, email, password) => {
    if (localStorage.getItem(email)) {
      alert("User already registered. Please login.");
      return;
    }
    localStorage.setItem(email, JSON.stringify({ username, email, password }));
    alert("Registration successful! Please login.");
    setModalOpen(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(hideTasksOnLogout()); //Hide tasks when user logs out
  };

  return (
    <div className="navbar">
      <div className="title">My Todo App</div>
      <div className="nav-actions">
        {user ? (
          <div className="logout">
            <span className="welcome-message">Welcome, {user.username}!</span>
            <FaSignOutAlt className="logout-icon" onClick={handleLogout} />
          </div>
        ) : (
          <button className="login-btn" onClick={handleLoginClick}>
            <CiUser className="user"/>
            Login
          </button>
        )}
      </div>

      <AuthPopup isOpen={isModalOpen} onClose={handleCloseModal} onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  );
};

export default Navbar;