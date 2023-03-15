import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
      }
    });
  }, []);

  const onChangeEmail = (e) => setEmail(e.target.value);

  const onChangePassword = (e) => setPassword(e.target.value);

  const onClickSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="bg_container">
      <h1 className="todo_heading">Todo Login</h1>
      <div className="form_container">
        <label htmlFor="email">Email</label>
        <input type="text" id="email" onChange={onChangeEmail} value={email} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={onChangePassword}
          value={password}
        />
        <button onClick={onClickSignIn}>Sign In</button>
        <button>Create an Account</button>
      </div>
    </div>
  );
}
