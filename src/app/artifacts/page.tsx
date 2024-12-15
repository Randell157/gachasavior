"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Artifact {
  key: string;
  level?: number;
  rarity?: number;
  set?: string;
  type?: string;
}

interface GenshinData {
  artifacts: Artifact[];
}

export default function ArtifactsPage() {
  const [genshinData, setGenshinData] = useState<GenshinData | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const savedData = localStorage.getItem(`genshinData_${user.uid}`);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setGenshinData(parsedData);
        } catch (error) {
          console.error("Error parsing Genshin data:", error);
        }
      }
    }
  }, [user]);

  if (!genshinData) {
    return <p>Loading artifact data...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Artifacts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genshinData.artifacts.map((artifact, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={
                        artifact.set
                          ? `/artifact-icons/${artifact.set.replace(
                              /\s+/g,
                              "_"
                            )}.png`
                          : "/placeholder.svg"
                      }
                      alt={artifact.set || "Unknown Artifact"}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-md"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <span>{artifact.key}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {artifact.level !== undefined && <p>Level: {artifact.level}</p>}
                {artifact.rarity !== undefined && (
                  <p>Rarity: {artifact.rarity}★</p>
                )}
                {artifact.set && <p>Set: {artifact.set}</p>}
                {artifact.type && <p>Type: {artifact.type}</p>}
                {!artifact.level &&
                  !artifact.rarity &&
                  !artifact.set &&
                  !artifact.type && (
                    <p>No detailed information available for this artifact.</p>
                  )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
