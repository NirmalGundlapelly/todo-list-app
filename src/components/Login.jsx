import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);

  const onChangeEmail = (e) => setEmail(e.target.value);

  const onChangePassword = (e) => setPassword(e.target.value);

  const onClickSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
        setShowError(true);
      });
  };

  const onClickRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Email and Confirm Email are Not Same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Password and Confirm Password are Not Same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="bg_container">
      <h1 className="todo_heading">Todo Login</h1>
      <div className="form_container">
        {isRegistered ? (
          <>
            <input
              className="input_element"
              type="email"
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value,
                })
              }
              value={registerInformation.email}
              placeholder="Email"
            />
            <input
              className="input_element"
              type="email"
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmEmail: e.target.value,
                })
              }
              value={registerInformation.confirmEmail}
              placeholder="Confirm Email"
            />
            <input
              className="input_element"
              type="password"
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value,
                })
              }
              value={registerInformation.password}
              placeholder="Password"
            />
            <input
              className="input_element"
              type="password"
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value,
                })
              }
              value={registerInformation.confirmPassword}
              placeholder="Confirm Password"
            />
            <button className="sign_button" onClick={onClickRegister}>
              Register
            </button>
            <button
              onClick={() => setRegistered(false)}
              className="create_button"
            >
              Go Back
            </button>
          </>
        ) : (
          <>
            <label htmlFor="email">Email</label>
            <input
              className="input_element"
              type="text"
              id="email"
              onChange={onChangeEmail}
              value={email}
              placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
              className="input_element"
              type="password"
              id="password"
              onChange={onChangePassword}
              value={password}
              placeholder="Password"
            />
            <button className="sign_button" onClick={onClickSignIn}>
              Sign In
            </button>
            <p className="or_text">------- or -------</p>
            <button
              onClick={() => setRegistered(true)}
              className="create_button"
            >
              Create an Account
            </button>
            {showError && (
              <p className="error_message">* Invalid Email or Password</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
