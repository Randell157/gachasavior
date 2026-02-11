"use client";

import { useState, useEffect, useRef } from "react";
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
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatCharacterDisplayName,
  formatWeaponDisplayName,
  formatArtifactSetDisplayName,
  formatMaterialDisplayName,
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
  format?: string;
  version?: number;
  kamera_version?: string;
  source?: string;
  characters?: Character[];
  weapons?: Weapon[];
  artifacts?: Artifact[];
  materials?: Record<string, number>;
}

const SHOWCASE_SIZE = 5;
const SHOWCASE_STORAGE_KEY = "genshinShowcase";

interface GenshinProps {
  initialData: GenshinData | null;
  onInvalidData: () => void;
  userId?: string | null;
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

export default function Genshin({ initialData, onInvalidData, userId }: GenshinProps) {
  const [data, setData] = useState<GenshinData | null>(initialData);
  const [activeTab, setActiveTab] = useState("characters");
  const [error, setError] = useState<string | null>(null);
  const [showcaseKeys, setShowcaseKeys] = useState<(string | null)[]>(() =>
    Array(SHOWCASE_SIZE).fill(null)
  );
  const skipNextSaveRef = useRef(true);

  useEffect(() => {
    if (initialData) {
      validateData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (!userId || !data?.characters?.length) return;
    try {
      const stored = localStorage.getItem(`${SHOWCASE_STORAGE_KEY}_${userId}`);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        if (Array.isArray(parsed) && parsed.length === SHOWCASE_SIZE) {
          const valid = parsed.map((k) => (k && data.characters?.some((c) => c.key === k) ? k : null));
          setShowcaseKeys(valid);
        }
      }
    } catch {
      // ignore invalid stored data
    }
  }, [userId, data?.characters]);

  useEffect(() => {
    if (!userId) return;
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }
    localStorage.setItem(`${SHOWCASE_STORAGE_KEY}_${userId}`, JSON.stringify(showcaseKeys));
  }, [userId, showcaseKeys]);

  const validateData = (data: GenshinData | null) => {
    if (!data) {
      setError("No data provided. Please upload a JSON file.");
      onInvalidData();
      return;
    }

    // Check if at least one of the data properties exists
    if (
      !data.characters &&
      !data.weapons &&
      !data.artifacts &&
      !data.materials
    ) {
      setError("Invalid JSON structure. No valid data found in file.");
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

  const characterCount = data.characters?.length ?? 0;
  const weaponCount = data.weapons?.length ?? 0;
  const artifactCount = data.artifacts?.length ?? 0;

  // Create a map of characters to their equipped items
  const characterEquipment: { [key: string]: { weapon?: Weapon; artifacts?: Artifact[] } } = {};
  (data.characters ?? []).forEach(char => {
    characterEquipment[char.key] = { weapon: undefined, artifacts: [] };
  });

  (data.weapons ?? []).forEach(weapon => {
    if (weapon.location && characterEquipment[weapon.location]) {
      characterEquipment[weapon.location].weapon = weapon;
    }
  });

  (data.artifacts ?? []).forEach(artifact => {
    if (artifact.location && characterEquipment[artifact.location]) {
      if (!characterEquipment[artifact.location].artifacts) {
        characterEquipment[artifact.location].artifacts = [];
      }
      characterEquipment[artifact.location].artifacts!.push(artifact);
    }
  });

  const allCharacters = (data.characters ?? []).sort((a, b) =>
    a.key.localeCompare(b.key)
  );
  const showcaseCharacters = showcaseKeys
    .filter((k): k is string => !!k)
    .map((key) => {
      const char = data.characters?.find((c) => c.key === key);
      if (!char) return null;
      return {
        ...char,
        weapon: characterEquipment[char.key]?.weapon,
        artifacts: characterEquipment[char.key]?.artifacts,
      };
    })
    .filter(Boolean) as Array<Character & { weapon?: Weapon; artifacts?: Artifact[] }>;

  const setShowcaseSlot = (index: number, characterKey: string | null) => {
    setShowcaseKeys((prev) => {
      const next = [...prev];
      next[index] = characterKey;
      return next;
    });
  };

  const getOptionsForSlot = (slotIndex: number) =>
    allCharacters.filter(
      (c) =>
        !showcaseKeys.some((k, i) => i !== slotIndex && k === c.key)
    );

  const topWeapons = (data.weapons ?? []).sort((a, b) => b.level - a.level).slice(0, 5);



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
              <CardTitle>Character Showcase</CardTitle>
              <CardDescription>
                Select up to 5 characters to display
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {Array.from({ length: SHOWCASE_SIZE }, (_, i) => (
                    <Select
                      key={i}
                      value={showcaseKeys[i] ?? "__none__"}
                      onValueChange={(v) =>
                        setShowcaseSlot(i, v === "__none__" ? null : v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select character" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">
                          Select character
                        </SelectItem>
                        {getOptionsForSlot(i).map((c) => (
                          <SelectItem key={c.key} value={c.key}>
                            {formatCharacterDisplayName(c.key)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ))}
                </div>
                {showcaseCharacters.length > 0 ? (
                  <ScrollArea className="h-[400px]">
                    <ul>
                      {showcaseCharacters.map((char, index) => (
                        <li
                          key={char.key}
                          className="mb-6 pb-4 border-b border-gray-200 last:border-b-0"
                        >
                          <div className="flex items-center space-x-4 mb-2">
                            <Image
                              src={`/character-portraits/${formatCharacterIconFilename(
                                char.key
                              )}`}
                              alt={formatCharacterDisplayName(char.key)}
                              width={50}
                              height={50}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                            <div>
                              <span className="font-bold text-lg">
                                {formatCharacterDisplayName(char.key)}
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
                                {formatWeaponDisplayName(char.weapon.key)} (Lv. {char.weapon.level}, R
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
                                    {formatArtifactSetDisplayName(artifact.setKey)} {artifact.slotKey} (Lv.{" "}
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
                  </ScrollArea>
                ) : (
                  <p className="text-sm text-muted-foreground py-4">
                    Select characters from the dropdowns above to show them here.
                  </p>
                )}
              </div>
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
                        <span className="font-bold">{formatWeaponDisplayName(weapon.key)}</span> - Level{" "}
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
                {data.materials && Object.keys(data.materials).length > 0 ? (
                  <ul>
                    {Object.entries(data.materials)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 20)
                      .map(([material, count], index) => (
                        <li key={index} className="mb-2">
                          <span className="font-bold">{formatMaterialDisplayName(material)}</span>: {count}
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
