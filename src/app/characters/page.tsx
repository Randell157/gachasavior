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

interface Weapon {
  key: string;
  level: number;
  refinement: number;
}

interface Artifact {
  setKey: string;
  slotKey: string;
  level: number;
}

interface Character {
  key: string;
  level: number;
  constellation: number;
  weapon?: Weapon;
  artifacts?: Artifact[];
}

interface GenshinData {
  characters: Character[];
}

function formatArtifactName(artifact: Artifact): string {
  if (artifact.setKey) {
    return artifact.setKey
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return "Unknown Artifact";
}

function formatCharacterIconFilename(characterKey: string): string {
  const specialNames: { [key: string]: string } = {
    kaedeharakazuha: "Kaedehara_Kazuha",
    hutao: "Hu_Tao",
    ayaka: "Kamisato_Ayaka",
    raidenshogun: "Raiden_Shogun",
    yaemiko: "Yae_Miko",
    yunjin: "Yun_Jin",
    kukishinobu: "Kuki_Shinobu",
    kujousara:"Kujou_Sara",
    shikanoinheizou: "Shikanoin_Heizou"
  };

  const lowerCaseKey = characterKey.toLowerCase().replace(/\s+/g, "");

  if (lowerCaseKey.startsWith("traveler")) {
    return "Aether_Icon.png";
  }

  if (lowerCaseKey in specialNames) {
    return `${specialNames[lowerCaseKey]}_Icon.png`;
  }

  // Handle cases where the character name might be two words
  const formattedKey = characterKey.replace(/\s+/g, "_");
  return `${formattedKey}_Icon.png`;
}

export default function CharactersPage() {
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
    return <p>Loading character data...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Characters</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genshinData.characters.map((character, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={`/character-portraits/${formatCharacterIconFilename(
                        character.key
                      )}`}
                      alt={character.key}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                      onError={(e) => {
                        console.error(
                          `Failed to load image for ${
                            character.key
                          }: ${formatCharacterIconFilename(character.key)}`
                        );
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <span>{character.key}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <p>Level: {character.level}</p>
                  <p>Constellation: {character.constellation}</p>

                  <h3 className="font-semibold mt-4">Weapon</h3>
                  {character.weapon ? (
                    <>
                      <p>Name: {character.weapon.key}</p>
                      <p>Level: {character.weapon.level}</p>
                      <p>Refinement: {character.weapon.refinement}</p>
                    </>
                  ) : (
                    <p>No weapon data available</p>
                  )}

                  <h3 className="font-semibold mt-4">Artifacts</h3>
                  {character.artifacts && character.artifacts.length > 0 ? (
                    character.artifacts.map((artifact, artifactIndex) => (
                      <div key={artifactIndex} className="mb-2">
                        <p>
                          {formatArtifactName(artifact)} ({artifact.slotKey})
                        </p>
                        <p>Level: {artifact.level}</p>
                      </div>
                    ))
                  ) : (
                    <p>No artifact data available</p>
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
