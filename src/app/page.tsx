import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-indigo-900">
                Welcome to Gacha Savior
              </h1>
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-8 sm:px-6 text-center">
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg">
                  This is a website where you can organize your gacha account
                  data in an organized way.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link href="/login">
                    <Button>Log In</Button>
                  </Link>
                  <Link href="/create-account">
                    <Button variant="outline">Create Account</Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </main>
      <Footer />
    </div>
  );
}
