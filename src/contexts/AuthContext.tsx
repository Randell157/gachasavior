"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  username: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  username: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isMounted = useRef(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (isMounted.current) {
        setUser(user);
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
          }
          router.push("/dashboard");
        } else {
          setUsername(null);
          router.push("/");
        }
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      isMounted.current = false;
    };
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, username, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
