import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { useEffect, useState } from "react";

type Result = {
  data: User | undefined;
  isLoading: boolean;
};

export function useAuth(): Result {
  const auth = getAuth();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          setUser(user);
        } else {
          setUser(undefined);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    });
  }, []);

  return { data: user, isLoading };
}
