import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/authSlice";
import { FaUserCircle } from "react-icons/fa";
import Modal from "./Modal/AuthPopup";

const Auth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (name && email) {
      dispatch(login({ name, email })); //Store user data
      setShowModal(false); //Close modal after login
      setName("");
      setEmail("");
    }
  };

  return (
    <div className="auth-container">
      <button onClick={() => setShowModal(true)} className="auth-button">
        <FaUserCircle className="icon" /> {user ? "Logout" : "Login"}
      </button>

      {user && (
        <button onClick={() => dispatch(logout())} className="logout-button">
          Logout
        </button>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h3>Login</h3>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </Modal>
    </div>
  );
};

export default Auth;