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

interface Character {
  key: string;
  level: number;
  constellation: number;
  weapon?: {
    key: string;
    level: number;
    refinement: number;
  };
  artifacts?: Array<{
    key: string;
    level: number;
    rarity: number;
  }>;
}

interface GenshinData {
  characters: Character[];
}

function formatCharacterIconFilename(characterKey: string): string {
  const specialNames: { [key: string]: string } = {
    "kazuha": "Kaedehara_Kazuha",
    "hutao": "Hu_Tao",
    "ayaka": "Kamisato_Ayaka",
    "raidenshogun": "Raiden_Shogun",
    "yaemiko": "Yae_Miko",
  };

  const lowerCaseKey = characterKey.toLowerCase().replace(/\s+/g, '');
  if (lowerCaseKey in specialNames) {
    return `${specialNames[lowerCaseKey]}_Icon.png`;
  }

  return `${characterKey}_Icon.png`;
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
                  <Image
                    src={`/character-portraits/${formatCharacterIconFilename(character.key)}`}
                    alt={character.key}
                    width={50}
                    height={50}
                    className="rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <span>{character.key}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Level: {character.level}</p>
                <p>Constellation: {character.constellation}</p>
                <h3 className="font-semibold mt-4">Weapon</h3>
                {character.weapon ? (
                  <p>{character.weapon.key} - Level {character.weapon.level}, Refinement {character.weapon.refinement}</p>
                ) : (
                  <p>No weapon data available</p>
                )}
                <h3 className="font-semibold mt-4">Artifacts</h3>
                <ScrollArea className="h-[100px]">
                  {character.artifacts && character.artifacts.length > 0 ? (
                    <ul>
                      {character.artifacts.map((artifact, artifactIndex) => (
                        <li key={artifactIndex}>
                          {artifact.key} - Level {artifact.level}, {artifact.rarity}★
                        </li>
                      ))}
                    </ul>
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