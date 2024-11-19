import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const features = [
  {
    title: "Character Overview",
    description: "View and manage your Genshin Impact characters",
    details: [
      "Display total number of owned characters",
      "List top characters by level",
      "Show character constellations",
    ],
  },
  {
    title: "Weapon Management",
    description: "Keep track of your weapons",
    details: [
      "View total number of weapons in inventory",
      "List top weapons by level",
      "Display weapon refinement levels",
    ],
  },
  {
    title: "Artifact Inventory",
    description: "Organize and analyze your artifact collection",
    details: [
      "Show total number of owned artifacts",
    ],
  },
  {
    title: "Material Tracking",
    description: "Monitor your materials and resources",
    details: [
      "Display total count of materials",
      "List top materials by quantity",
    ],
  },
]

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-900">
            Gacha Savior Features
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <div className="py-4 sm:py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">Genshin Impact Dashboard Features</h3>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
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
            <div className="py-4 sm:py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Dashboard Preview Sample</h3>
              <Card className="w-full max-w-3xl mx-auto">
                <CardContent className="p-6">
                  <Tabs defaultValue="characters" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="characters">Characters</TabsTrigger>
                      <TabsTrigger value="weapons">Weapons</TabsTrigger>
                      <TabsTrigger value="materials">Materials</TabsTrigger>
                    </TabsList>
                    <TabsContent value="characters">
                      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                        <h4 className="font-semibold mb-2">Top Characters</h4>
                        <ul className="space-y-2">
                          <li>Ganyu - Level 90, Constellation 2</li>
                          <li>Diluc - Level 88, Constellation 1</li>
                          <li>Venti - Level 85, Constellation 0</li>
                          <li>Keqing - Level 82, Constellation 3</li>
                          <li>Zhongli - Level 80, Constellation 0</li>
                        </ul>
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent value="weapons">
                      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                        <h4 className="font-semibold mb-2">Top Weapons</h4>
                        <ul className="space-y-2">
                          <li>Wolf's Gravestone - Level 90, Refinement 1</li>
                          <li>Skyward Harp - Level 90, Refinement 2</li>
                          <li>Primordial Jade Winged-Spear - Level 85, Refinement 1</li>
                          <li>Aquila Favonia - Level 80, Refinement 1</li>
                          <li>Lost Prayer to the Sacred Winds - Level 80, Refinement 1</li>
                        </ul>
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent value="materials">
                      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                        <h4 className="font-semibold mb-2">Top Materials</h4>
                        <ul className="space-y-2">
                          <li>Mora - 5,000,000</li>
                          <li>Hero's Wit - 500</li>
                          <li>Mystic Enhancement Ore - 1000</li>
                          <li>Primogem - 10,000</li>
                          <li>Fragile Resin - 50</li>
                        </ul>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}