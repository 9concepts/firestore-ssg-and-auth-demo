import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useState } from "react";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";

export const ClientSideLogin = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const auth = getAuth();

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
        {currentUser && <div> {currentUser.displayName} </div>}
        {currentUser && <LogoutButton />}
        {!currentUser && <LoginButton />}
      </div>
    </div>
  );
};
