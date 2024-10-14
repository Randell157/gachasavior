import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-between p-4 bg-gray-900 text-white">
        <Link href="./home/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="./about/" className="hover:text-gray-300">
          About
        </Link>
      </nav>
      <main className="text-center">
        <h1 className="text-3xl font-bold mt-6">Gacha Savior</h1>
        <h2>Welcome to Gacha Savior!</h2>
        <p className="text-lg mt-4">Upload a JSON file</p>
      </main>
    </div>
  );
}
