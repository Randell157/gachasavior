"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Genshin from "@/components/Genshin";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface GenshinData {
  format?: string;
  version?: number;
  kamera_version?: string;
  source?: string;
  characters?: Array<{
    key: string;
    level: number;
    constellation: number;
    weapon?: {
      key: string;
      level: number;
      refinement: number;
    };
    artifacts?: Array<{
      setKey: string;
      slotKey: string;
      level: number;
      rarity: number;
    }>;
  }>;
  weapons?: Array<{
    key: string;
    level: number;
    refinement: number;
  }>;
  artifacts?: Array<{
    setKey: string;
    slotKey: string;
    level: number;
    rarity: number;
  }>;
  materials?: Record<string, number>;
}

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const { user, username, loading, error: authError } = useAuth();
  const router = useRouter();
  const [genshinData, setGenshinData] = useState<GenshinData | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem(`genshinData_${user?.uid}`);
    if (savedData) {
      try {
        setGenshinData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error parsing saved data:", error);
        setFileError("Error loading saved data. Please upload a new file.");
      }
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (validateGenshinData(json)) {
            setGenshinData(json);
            localStorage.setItem(
              `genshinData_${user?.uid}`,
              JSON.stringify(json)
            );
            setFileError(null);
          } else {
            throw new Error("Invalid Genshin Impact data structure");
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          setFileError(
            "Error importing JSON file. Please make sure it's a valid Genshin Impact data file."
          );
          setGenshinData(null);
        }
      };
      reader.readAsText(file);
    }
  };

  const validateGenshinData = (data: any): data is GenshinData => {
    return (
      data &&
      (Array.isArray(data.characters) ||
        Array.isArray(data.weapons) ||
        Array.isArray(data.artifacts) ||
        (typeof data.materials === "object" && data.materials !== null))
    );
  };

  const handleInvalidData = () => {
    setGenshinData(null);
    setFileError(
      "Invalid Genshin Impact data structure. Please upload a valid file."
    );
  };

  if (!isClient || loading) {
    return null;
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {authError}
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
        <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-indigo-900">
                Dashboard
              </h1>
            </div>
          </header>
          <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg px-4 py-8 sm:p-8 lg:p-10">
            <p className="text-xl text-gray-700 sm:text-lg mb-6">
              Hello, {username || "User"}!
            </p>
            {genshinData && (
              <Genshin
                initialData={genshinData}
                onInvalidData={handleInvalidData}
                userId={user?.uid}
              />
            )}
            <div className="pt-8 mt-8 border-t border-gray-200 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <p className="text-xl">
                {genshinData
                  ? "Data uploaded. Would you like to reupload the data?"
                  : "Please import your Genshin JSON file. You can get this from using Inventory Kamera."}
              </p>
              <div>
                <Input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="mb-4"
                />
              </div>
              {fileError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{fileError}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
