import {
  createUserWithEmailAndPassword,
  // onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../service/firebase";
// import { useEffect, useState } from "react";

export const sigin = async (mail, password) => {
  return await signInWithEmailAndPassword(auth, mail, password);
};

export const signup = async (mail, password) => {
  return await createUserWithEmailAndPassword(auth, mail, password);
};

export const logout = async () => {
  return await signOut(auth);
};

// export const useAuthUser = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, [auth]);

//   return user;
// };
