import { useAuth } from "@/hooks/useAuth";
import { createFirebaseClientApp } from "@/lib/firebase";
import { User } from "firebase/auth";
import { FC, createContext } from "react";

type ContextValue = {
  currentUser?: User;
};

const defaultValue: ContextValue = {};

export const FirebaseContext = createContext<ContextValue>(defaultValue);

type Props = {
  children: React.ReactNode;
};

export const FirebaseProvider: FC<Props> = ({ children }) => {
  createFirebaseClientApp();

  const { data: user } = useAuth();

  return (
    <FirebaseContext.Provider value={{ currentUser: user }}>
      {children}
    </FirebaseContext.Provider>
  );
};
