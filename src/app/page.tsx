import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-center">
        <div className="container flex items-center justify-between">
          <Link className="flex items-center justify-center" href="/">
            <span className="font-bold">Gacha Savior</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/features"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/contact"
            >
              Contact
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/login"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Gacha Savior
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  This is a website where you can organize your gacha account
                  data in an organized way
                </p>
              </div>
              <div className="space-x-4">
                <Link href="login">
                  <Button>Log In</Button>
                </Link>
                <Link href="create-account">
                  <Button variant="outline">Create Account</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 border-t">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 Gacha Savior. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
