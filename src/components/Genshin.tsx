"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

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
  rarity: number;
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
  characters: Character[];
  weapons: Weapon[];
  artifacts: Artifact[];
  materials: Record<string, number>;
}

interface GenshinProps {
  initialData: GenshinData | null;
  onInvalidData: () => void;
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
    kujousara: "Kujou_Sara",
    shikanoinheizou: "Shikanoin_Heizou",
  };

  const lowerCaseKey = characterKey.toLowerCase().replace(/\s+/g, "");

  if (lowerCaseKey.startsWith("traveler")) {
    return "Aether_Icon.png";
  }

  if (lowerCaseKey in specialNames) {
    return `${specialNames[lowerCaseKey]}_Icon.png`;
  }

  const formattedKey = characterKey.replace(/\s+/g, "_");
  return `${formattedKey}_Icon.png`;
}

export default function Genshin({ initialData, onInvalidData }: GenshinProps) {
  const [data, setData] = useState<GenshinData | null>(initialData);
  const [activeTab, setActiveTab] = useState("characters");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      validateData(initialData);
    }
  }, [initialData]);

  const validateData = (data: GenshinData | null) => {
    if (!data) {
      setError("No data provided. Please upload a JSON file.");
      onInvalidData();
      return;
    }

    if (!Array.isArray(data.characters) || !Array.isArray(data.weapons) || !Array.isArray(data.artifacts) || typeof data.materials !== 'object') {
      setError("Invalid JSON structure. Please check your file and try again.");
      onInvalidData();
      return;
    }

    setData(data);
    setError(null);
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return <p>Please upload a valid JSON file</p>;
  }

  const characterCount = data.characters.length;
  const weaponCount = data.weapons.length;
  const artifactCount = data.artifacts.length;

  // Create a map of characters to their equipped items
  const characterEquipment: { [key: string]: { weapon?: Weapon; artifacts?: Artifact[] } } = {};
  data.characters.forEach(char => {
    characterEquipment[char.key] = { weapon: undefined, artifacts: [] };
  });

  data.weapons.forEach(weapon => {
    if (weapon.location && characterEquipment[weapon.location]) {
      characterEquipment[weapon.location].weapon = weapon;
    }
  });

  data.artifacts.forEach(artifact => {
    if (artifact.location && characterEquipment[artifact.location]) {
      if (!characterEquipment[artifact.location].artifacts) {
        characterEquipment[artifact.location].artifacts = [];
      }
      characterEquipment[artifact.location].artifacts!.push(artifact);
    }
  });

  const topCharacters = data.characters
    .sort((a, b) => b.level - a.level)
    .slice(0, 5)
    .map(char => ({
      ...char,
      weapon: characterEquipment[char.key]?.weapon,
      artifacts: characterEquipment[char.key]?.artifacts,
    }));

  const topWeapons = data.weapons.sort((a, b) => b.level - a.level).slice(0, 5);



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Genshin Impact </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Characters</CardTitle>
            <CardDescription>Total owned</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{characterCount}</p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/characters">View All Characters</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weapons</CardTitle>
            <CardDescription>Total owned</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{weaponCount}</p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/weapons">View All Weapons</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Artifacts</CardTitle>
            <CardDescription>Total owned</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{artifactCount}</p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/artifacts">View All Artifacts</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="weapons">Weapons</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
        </TabsList>
        <TabsContent value="characters">
          <Card>
            <CardHeader>
              <CardTitle>Top Characters</CardTitle>
              <CardDescription>
                Highest level characters with their equipment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {topCharacters.length > 0 ? (
                  <ul>
                    {topCharacters.map((char, index) => (
                      <li
                        key={index}
                        className="mb-6 pb-4 border-b border-gray-200 last:border-b-0"
                      >
                        <div className="flex items-center space-x-4 mb-2">
                          <Image
                            src={`/character-portraits/${formatCharacterIconFilename(
                              char.key
                            )}`}
                            alt={char.key}
                            width={50}
                            height={50}
                            className=""
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                          <div>
                            <span className="font-bold text-lg">
                              {char.key}
                            </span>
                            <p className="text-sm text-gray-500">
                              Level {char.level}, Constellation{" "}
                              {char.constellation}
                            </p>
                          </div>
                        </div>
                        {char.weapon && (
                          <div className="ml-14 mb-2">
                            <p className="text-sm">
                              <span className="font-semibold">Weapon:</span>{" "}
                              {char.weapon.key} (Lv. {char.weapon.level}, R
                              {char.weapon.refinement})
                            </p>
                          </div>
                        )}
                        {char.artifacts && char.artifacts.length > 0 ? (
                          <div className="ml-14">
                            <p className="text-sm font-semibold mb-1">
                              Artifacts:
                            </p>
                            <ul className="list-disc list-inside">
                              {char.artifacts.map((artifact, artifactIndex) => (
                                <li
                                  key={artifactIndex}
                                  className="text-sm ml-4"
                                >
                                  {artifact.setKey} {artifact.slotKey} (Lv.{" "}
                                  {artifact.level}, {artifact.rarity}★)
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="ml-14 text-sm">
                            No artifacts equipped.
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No character data available. Please upload a JSON file.</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="weapons">
          <Card>
            <CardHeader>
              <CardTitle>Top Weapons</CardTitle>
              <CardDescription>Highest level weapons</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {topWeapons.length > 0 ? (
                  <ul>
                    {topWeapons.map((weapon, index) => (
                      <li key={index} className="mb-2">
                        <span className="font-bold">{weapon.key}</span> - Level{" "}
                        {weapon.level}, Refinement {weapon.refinement}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No weapon data available. Please upload a JSON file.</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <CardTitle>Material Inventory</CardTitle>
              <CardDescription>Top materials owned</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {Object.keys(data.materials).length > 0 ? (
                  <ul>
                    {Object.entries(data.materials)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 20)
                      .map(([material, count], index) => (
                        <li key={index} className="mb-2">
                          <span className="font-bold">{material}</span>: {count}
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p>No material data available. Please upload a JSON file.</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
