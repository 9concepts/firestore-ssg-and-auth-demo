import { getAuth, signOut } from "firebase/auth";
import React from "react";

export const LogoutButton = () => {
  const auth = getAuth();

  return (
    <button
      className="rounded px-4 py-2 bg-gray-800 hover:bg-gray-700"
      onClick={() => signOut(auth)}
    >
      Logout
    </button>
  );
};
