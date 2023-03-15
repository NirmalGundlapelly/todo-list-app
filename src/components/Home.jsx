import React, { useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  const onClickSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <h1>test</h1>
      <button onClick={onClickSignOut}>Sign Out</button>
    </div>
  );
}
