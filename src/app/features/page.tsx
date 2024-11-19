import GenshinFeatures from "@/components/GenshinFeatures";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div>
          <GenshinFeatures />
        </div>
      </main>
      <Footer />
    </div>
  );
}
