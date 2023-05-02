import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";

export const LoginButton = () => {
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <button
      className="rounded px-4 py-2 bg-gray-800 hover:bg-gray-700"
      onClick={handleGoogleSignIn}
    >
      Login
    </button>
  );
};
