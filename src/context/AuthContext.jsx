import React, { createContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase'; // Import the auth instance from firebase.js

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Monitor auth state changes
  useEffect(() => {
    // If firebase is not configured properly, this might fail, so we wrap it in a try-catch for safety
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Firebase Auth Error - using mock state due to missing config", e);
      // Fallback mock logic if Firebase config is missing
      const mockUser = localStorage.getItem('mockUser');
      if (mockUser) {
        setIsAuthenticated(true);
        setCurrentUser(JSON.parse(mockUser));
      }
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      if (auth.app.options.apiKey === "YOUR_API_KEY") {
        throw new Error("Missing Firebase Config");
      }
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.message === "Missing Firebase Config") {
        // Fallback Mock Login
        console.warn("Using Mock Login because Firebase config is missing");
        setIsAuthenticated(true);
        setCurrentUser({ email, displayName: email.split('@')[0] });
        localStorage.setItem('mockUser', JSON.stringify({ email, displayName: email.split('@')[0] }));
        return;
      }
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      if (auth.app.options.apiKey === "YOUR_API_KEY") {
        throw new Error("Missing Firebase Config");
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update display name
      await updateProfile(userCredential.user, { displayName: name });
      return userCredential;
    } catch (error) {
      if (error.message === "Missing Firebase Config") {
        // Fallback Mock Signup
        console.warn("Using Mock Signup because Firebase config is missing");
        setIsAuthenticated(true);
        setCurrentUser({ email, displayName: name });
        localStorage.setItem('mockUser', JSON.stringify({ email, displayName: name }));
        return;
      }
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      if (auth.app.options.apiKey === "YOUR_API_KEY") {
        throw new Error("Missing Firebase Config");
      }
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.message === "Missing Firebase Config") {
        // Fallback Mock Google Login
        console.warn("Using Mock Google Login because Firebase config is missing");
        setIsAuthenticated(true);
        setCurrentUser({ email: "google.user@example.com", displayName: "Google User" });
        localStorage.setItem('mockUser', JSON.stringify({ email: "google.user@example.com", displayName: "Google User" }));
        return;
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (auth.app.options.apiKey === "YOUR_API_KEY") {
        throw new Error("Missing Firebase Config");
      }
      await signOut(auth);
    } catch (error) {
      if (error.message === "Missing Firebase Config") {
        setIsAuthenticated(false);
        setCurrentUser(null);
        localStorage.removeItem('mockUser');
        return;
      }
      throw error;
    }
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface)' }} />; // Loading screen
  }

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated, 
      login, 
      signup, 
      logout,
      loginWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  );
};
