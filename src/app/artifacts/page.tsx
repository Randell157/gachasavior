"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Artifact {
  key: string;
  setKey: string;
  name?: string;
  level?: number;
  rarity?: number;
  set?: string;
  slotKey?: string; // Artifact type (flower, plume, etc.)
  mainStatKey?: string;
  mainStatValue?: number;
  location?: string;
  lock?: boolean;
  substats?: Array<{ key: string; value: number }>;
}

interface GenshinData {
  artifacts: Artifact[];
}

function formatArtifactName(artifact: Artifact): string {
  if (artifact.setKey) {
    return artifact.setKey
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  if (artifact.set && artifact.slotKey) {
    return `${artifact.set} ${artifact.slotKey}`;
  }
  return "Unknown Artifact";
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
                        artifact.setKey
                          ? `/artifact-icons/${artifact.setKey.replace(
                              /\s+/g,
                              "_"
                            )}.png`
                          : "/placeholder.svg"
                      }
                      alt={formatArtifactName(artifact)}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-md"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <span>{formatArtifactName(artifact)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  {artifact.level !== undefined && (
                    <p>Level: {artifact.level}</p>
                  )}
                  {artifact.rarity !== undefined && (
                    <p>Rarity: {artifact.rarity}★</p>
                  )}
                  {artifact.setKey && (
                    <p>Set: {formatArtifactName(artifact)}</p>
                  )}
                  {artifact.slotKey && <p>Type: {artifact.slotKey}</p>}
                  {artifact.mainStatKey && (
                    <p>
                      Main Stat: {artifact.mainStatKey} -{" "}
                      {artifact.mainStatValue}
                    </p>
                  )}
                  {artifact.location && <p>Equipped by: {artifact.location}</p>}
                  {artifact.lock !== undefined && (
                    <p>Locked: {artifact.lock ? "Yes" : "No"}</p>
                  )}
                  {artifact.substats && artifact.substats.length > 0 && (
                    <>
                      <p className="font-semibold mt-2">Substats:</p>
                      <ul className="list-disc pl-5">
                        {artifact.substats.map((substat, subIndex) => (
                          <li key={subIndex}>
                            {substat.key}: {substat.value}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {!artifact.level &&
                    !artifact.rarity &&
                    !artifact.set &&
                    !artifact.slotKey && (
                      <p>
                        No detailed information available for this artifact.
                      </p>
                    )}
                </ScrollArea>
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
