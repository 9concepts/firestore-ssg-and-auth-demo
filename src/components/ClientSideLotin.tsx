import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  User,
  signOut,
} from "firebase/auth";
import { useState } from "react";

export const ClientSideLotin = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const auth = getAuth();
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(user);
      // ...
      setCurrentUser(user);
    } else {
      // User is signed out
      // ...
      setCurrentUser(null);
    }
  });

  return (
    <div className="grid gap-4">
      <div>
        {!currentUser && (
          <button
            className="rounded px-4 py-2 bg-gray-800 hover:bg-gray-700"
            onClick={handleGoogleSignIn}
          >
            Login
          </button>
        )}
        {currentUser && <div> {currentUser.displayName} </div>}
        {currentUser && (
          <button
            className="rounded px-4 py-2 bg-gray-800 hover:bg-gray-700"
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
