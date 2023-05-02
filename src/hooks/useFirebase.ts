import { FirebaseContext } from "@/providers/FirebaseProvider";
import { useContext } from "react";

export const useFirebase = () => useContext(FirebaseContext);
