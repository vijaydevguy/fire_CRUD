import { useEffect, useState } from "react";
import { sigin, signup, logout } from "../service/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../service/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const signIn = async (mail, password) => {
    setLoading(true);
    setErr("");
    try {
      await sigin(mail, password);
      navigate("/products");
    } catch (error) {
      setErr(`Failed signin, ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (mail, password) => {
    setLoading(true);
    setErr("");
    try {
      await signup(mail, password);
      navigate("/products");
    } catch (error) {
      setErr(`Failed signup, ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setErr("");
    try {
      await logout();
      navigate("/");
    } catch (error) {
      setErr(`Failed signout, ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, err, signUp, signOut, user };
};
