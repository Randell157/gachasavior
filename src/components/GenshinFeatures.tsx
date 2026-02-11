"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

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
  if (lowerCaseKey.startsWith("traveler")) return "Aether_Icon.png";
  if (lowerCaseKey in specialNames) return `${specialNames[lowerCaseKey]}_Icon.png`;
  return `${characterKey.replace(/\s+/g, "_")}_Icon.png`;
}

const features = [
  {
    title: "Character Overview",
    description: "View your Genshin Impact characters",
    details: [
      "Display total number of owned characters",
      "List top 5 characters by level",
      "Show character equipped weapons and artifacts",
    ],
  },
  {
    title: "Weapons Overview",
    description: "Keep track of your weapons obtained",
    details: [
      "Display total number of weapons in inventory",
      "List top 5 weapons by level",
      "Display weapon refinement levels",
    ],
  },
  {
    title: "Artifacts",
    description: "Organize and analyze your artifacts",
    details: ["Show total number of owned artifacts"],
  },
  {
    title: "Materials",
    description: "Display your materials and resources collected",
    details: [
      "Display total count of materials",
      "List top materials by quantity",
    ],
  },
];

export default function Features() {
  return (
    <>
      <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Genshin Impact Dashboard Features
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {feature.title}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex}>{detail}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard preview — matches logged-in dashboard layout */}
        <div className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-medium text-gray-900 mb-8">
              Dashboard Preview Sample
            </h3>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Genshin Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Characters</CardTitle>
                      <CardDescription>Total owned</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-4xl font-bold">42</p>
                      <div className="mt-4">
                        <Button asChild variant="outline" size="sm">
                          <Link href="/login">View All Characters</Link>
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
                      <p className="text-4xl font-bold">156</p>
                      <div className="mt-4">
                        <Button asChild variant="outline" size="sm">
                          <Link href="/login">View All Weapons</Link>
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
                      <p className="text-4xl font-bold">284</p>
                      <div className="mt-4">
                        <Button asChild variant="outline" size="sm">
                          <Link href="/login">View All Artifacts</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="characters" className="w-full">
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
                        <ScrollArea className="h-[280px]">
                          <ul>
                            {[
                              { name: "Ganyu", level: 90, constellation: 2, weapon: "Amos' Bow (Lv. 90, R1)" },
                              { name: "Diluc", level: 88, constellation: 1, weapon: "Wolf's Gravestone (Lv. 90, R1)" },
                              { name: "Venti", level: 85, constellation: 0, weapon: "Skyward Harp (Lv. 85, R2)" },
                              { name: "Keqing", level: 82, constellation: 3, weapon: "Primordial Jade Cutter (Lv. 80, R1)" },
                              { name: "Zhongli", level: 80, constellation: 0, weapon: "Staff of Homa (Lv. 90, R1)" },
                            ].map((char, index) => (
                              <li
                                key={index}
                                className="mb-4 pb-4 border-b border-gray-200 last:border-b-0"
                              >
                                <div className="flex items-center space-x-4 mb-2">
                                  <Image
                                    src={`/character-portraits/${formatCharacterIconFilename(char.name)}`}
                                    alt={char.name}
                                    width={50}
                                    height={50}
                                    onError={(e) => {
                                      e.currentTarget.onerror = null;
                                      e.currentTarget.src = "/placeholder.svg";
                                    }}
                                  />
                                  <div>
                                    <span className="font-bold text-lg">{char.name}</span>
                                    <p className="text-sm text-gray-500">
                                      Level {char.level}, Constellation {char.constellation}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm ml-14">
                                  <span className="font-semibold">Weapon:</span> {char.weapon}
                                </p>
                              </li>
                            ))}
                          </ul>
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
                        <ScrollArea className="h-[200px]">
                          <ul className="space-y-2">
                            <li><span className="font-bold">Wolf's Gravestone</span> - Level 90, Refinement 1</li>
                            <li><span className="font-bold">Skyward Harp</span> - Level 90, Refinement 2</li>
                            <li><span className="font-bold">Primordial Jade Winged-Spear</span> - Level 85, Refinement 1</li>
                            <li><span className="font-bold">Aquila Favonia</span> - Level 80, Refinement 1</li>
                            <li><span className="font-bold">Lost Prayer to the Sacred Winds</span> - Level 80, Refinement 1</li>
                          </ul>
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
                        <ScrollArea className="h-[200px]">
                          <ul className="space-y-2">
                            <li><span className="font-bold">Mora</span>: 5,000,000</li>
                            <li><span className="font-bold">Hero's Wit</span>: 500</li>
                            <li><span className="font-bold">Mystic Enhancement Ore</span>: 1000</li>
                            <li><span className="font-bold">Primogem</span>: 10,000</li>
                            <li><span className="font-bold">Fragile Resin</span>: 50</li>
                          </ul>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
