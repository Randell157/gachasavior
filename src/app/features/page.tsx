import Header from "@/components/header";
import Footer from "@/components/footer";
export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div>
          <h1 className="text-4xl font-bold text-center my-8">Features</h1>

        </div>
      </main>
      <Footer />
    </div>
  );
}
