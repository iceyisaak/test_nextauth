import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset
} from 'firebase/auth';
import { auth } from "../firebase.config";

const FirebaseAuthContext = createContext({});

export const useAuth = () => useContext(FirebaseAuthContext);
export const provider = new GoogleAuthProvider();


export const FirebaseAuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const signInWithGoogle = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  const signInWithFacebook = () => {
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider);
  };

  const signInWithGithub = () => {
    const githubAuthProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubAuthProvider);
  };

  const requestPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const resetPassword = (oobCode, newPassword) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
  };



  return (
    <FirebaseAuthContext.Provider value={{
      user,
      signUp,
      login,
      logout,
      signInWithGoogle,
      signInWithFacebook,
      signInWithGithub,
      requestPasswordReset,
      resetPassword
    }}>
      {loading ? null : children}
    </FirebaseAuthContext.Provider>
  );
};