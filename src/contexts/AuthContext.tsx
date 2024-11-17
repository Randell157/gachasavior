"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  username: string | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  username: null,
  loading: true,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setUser(user);
        setLoading(true);
          if (user) {
            try {
              const userDoc = await getDoc(doc(db, "users", user.uid));
              if (userDoc.exists()) {
                setUsername(userDoc.data().username);
              }
            } catch (err) {
              console.error("Error fetching user data:", err);
              setError("Failed to fetch user data. Please try again.");
            }
          } else {
            setUsername(null);
          }
          setLoading(false);
      },
      (err) => {
        console.error("Auth state change error:", err);
        setError("Authentication error. Please try again.");
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, username, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
