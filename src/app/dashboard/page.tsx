"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Genshin from "@/components/Genshin";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const { user, username, loading, error } = useAuth();
  const router = useRouter();
  const [genshinData, setGenshinData] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem(`genshinData_${user?.uid}`);
    if (savedData) {
      setGenshinData(JSON.parse(savedData));
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setGenshinData(json);
          // Save to localStorage
          localStorage.setItem(`genshinData_${user?.uid}`, JSON.stringify(json));
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Error parsing JSON file. Please make sure it's a valid Genshin Impact data file.");
        }
      };
      reader.readAsText(file);
    }
  };

  if (!isClient || loading) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p className="text-xl">Hello, {username || "User"}!</p>
                <div>
                  <Input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="mb-4"
                  />
                  {/* {genshinData && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Imported Genshin Impact Data:
                      </h3>
                      <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60">
                        {JSON.stringify(genshinData, null, 2)}
                      </pre>
                    </div>
                  )} */}
                </div>
              </div>
              <Genshin data={genshinData} />
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <Button onClick={handleLogout} variant="destructive">
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
