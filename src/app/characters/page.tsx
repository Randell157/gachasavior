"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  formatCharacterDisplayName,
  formatWeaponDisplayName,
  formatArtifactSetDisplayName,
} from "@/lib/utils";

interface Weapon {
  key: string;
  level: number;
  refinement: number;
  location?: string;
}

interface Artifact {
  setKey: string;
  slotKey: string;
  level: number;
  location?: string;
}

interface Character {
  key: string;
  level: number;
  constellation: number;
  weapon?: Weapon;
  artifacts?: Artifact[];
}

interface GenshinData {
  characters?: Character[];
  weapons?: Weapon[];
  artifacts?: Artifact[];
}

function formatArtifactName(artifact: Artifact): string {
  if (artifact.setKey) {
    return formatArtifactSetDisplayName(artifact.setKey);
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
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [sortOrder, setSortOrder] = useState("level-desc");
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
  }, [user?.uid]);

  const handleImageError = (characterKey: string) => {
    setImageErrors((prev) => new Set(prev).add(characterKey));
  };

  const sortedCharacters = useMemo(() => {
    if (!genshinData?.characters) return [];

    const characterEquipment: { [key: string]: { weapon?: Weapon; artifacts: Artifact[] } } = {};

    (genshinData.characters ?? []).forEach(char => {
      characterEquipment[char.key] = { artifacts: [] };
    });

    (genshinData.weapons ?? []).forEach(weapon => {
      if (weapon.location && characterEquipment[weapon.location]) {
        characterEquipment[weapon.location].weapon = weapon;
      }
    });

    (genshinData.artifacts ?? []).forEach(artifact => {
      if (artifact.location && characterEquipment[artifact.location]) {
        characterEquipment[artifact.location].artifacts.push(artifact);
      }
    });

    const charactersWithEquipment = (genshinData.characters ?? []).map(char => ({
      ...char,
      weapon: characterEquipment[char.key]?.weapon,
      artifacts: characterEquipment[char.key]?.artifacts,
    }));

    const charactersCopy = [...charactersWithEquipment];

    switch (sortOrder) {
      case "name-asc":
        return charactersCopy.sort((a, b) => a.key.localeCompare(b.key));
      case "name-desc":
        return charactersCopy.sort((a, b) => b.key.localeCompare(a.key));
      case "level-asc":
        return charactersCopy.sort((a, b) => a.level - b.level);
      case "level-desc":
        return charactersCopy.sort((a, b) => b.level - a.level);
      case "constellation-asc":
        return charactersCopy.sort((a, b) => a.constellation - b.constellation);
      case "constellation-desc":
        return charactersCopy.sort((a, b) => b.constellation - a.constellation);
      default:
        return charactersCopy;
    }
  }, [genshinData, sortOrder]);

  if (!genshinData) {
    return <p>Loading character data...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Characters</h1>
          <div className="flex items-center space-x-2">
            <label htmlFor="sort-order" className="text-sm font-medium">Sort by:</label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-white border border-gray-300 rounded-md shadow-sm p-2 text-sm"
            >
              <option value="level-desc">Level (High to Low)</option>
              <option value="level-asc">Level (Low to High)</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="constellation-desc">Constellation (High to Low)</option>
              <option value="constellation-asc">Constellation (Low to High)</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCharacters.map((character, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={
                        imageErrors.has(character.key)
                          ? "/placeholder.svg"
                          : `/character-portraits/${formatCharacterIconFilename(
                              character.key
                            )}`
                      }
                      alt={formatCharacterDisplayName(character.key)}
                      layout="fill"
                      objectFit="cover"
                      className=""
                      onError={() => handleImageError(character.key)}
                    />
                  </div>
                  <span>{formatCharacterDisplayName(character.key)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <p>Level: {character.level}</p>
                  <p>Constellation: {character.constellation}</p>

                  <h3 className="font-semibold mt-4">Weapon</h3>
                  {character.weapon ? (
                    <>
                      <p>Name: {formatWeaponDisplayName(character.weapon.key)}</p>
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
