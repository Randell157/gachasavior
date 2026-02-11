import GenshinFeatures from "@/components/GenshinFeatures";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-indigo-900">
                Gacha Savior Features
              </h1>
            </div>
          </header>
          <GenshinFeatures />
        </div>
      </main>
      <Footer />
    </div>
  );
}
