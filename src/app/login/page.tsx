"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRedirect = useCallback(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let email = identifier;
      // If the identifier is not an email, assume it's a username and look up the email
      if (!identifier.includes("@")) {
        const db = getFirestore();
        const usernameDoc = await getDoc(doc(db, "usernames", identifier));
        if (usernameDoc.exists()) {
          const uid = usernameDoc.data().uid;
          const userDoc = await getDoc(doc(db, "users", uid));
          email = userDoc.data()?.email;
        } else {
          throw new Error("Username not found");
        }
      }

      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      setError(
        "Failed to log in. Please check your credentials and try again."
      );
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return null; // Return null on the server side and during initial client-side render
  }

  if (typeof window === "undefined") {
    return null;
  }

  if (user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-center">
        <div className="container flex items-center justify-between">
          <Link className="flex items-center justify-center" href="/">
            <span className="font-bold">Gacha Savior</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/features"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/contact"
            >
              Contact
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/login"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Enter Login Information
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address or Username
                  </label>
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address or Username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>
            <div className="text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/create-account"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create one here
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full py-6 border-t">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 Gacha Savior. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="/terms"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="/privacy"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
