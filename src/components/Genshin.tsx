"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GenshinData {
  characters: Array<{ key: string; level: number; constellation: number }>;
  weapons: Array<{ key: string; level: number; refinement: number }>;
  artifacts: Array<any>;
  materials: Record<string, number>;
}

interface GenshinProps {
  data: GenshinData | null;
}

export default function Genshin({ data }: GenshinProps) {
  const [activeTab, setActiveTab] = useState("characters");

  if (!data){
    return <p>Please upload a valid JSON file</p>;
  }

  const characterCount = data.characters.length;
  const weaponCount = data.weapons.length;
  const artifactCount = data.artifacts.length;

  const topCharacters = data.characters
    .sort((a, b) => b.level - a.level)
    .slice(0, 5);

  const topWeapons = data.weapons
    .sort((a, b) => b.level - a.level)
    .slice(0, 5);

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
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weapons</CardTitle>
            <CardDescription>Total owned</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{weaponCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Artifacts</CardTitle>
            <CardDescription>Total owned</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{artifactCount}</p>
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
              <CardDescription>Highest level characters</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {topCharacters.length > 0 ? (
                  <ul>
                    {topCharacters.map((char, index) => (
                      <li key={index} className="mb-2">
                        <span className="font-bold">{char.key}</span> - Level{" "}
                        {char.level}, Constellation {char.constellation}
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
