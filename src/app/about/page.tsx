import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-1">
        <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-indigo-900">
                About Gacha Savior
              </h1>
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src="/Pfp.jpg"
                      alt="Creator's picture"
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Hello! I&apos;m Randell
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Undergraduate Student
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Who am I
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      My name is Randell Lapid. I&apos;m currently a senior
                      undergraduate for CSUF.
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Languages I know
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>C++</li>
                        <li>Java</li>
                        <li>Python</li>
                        <li>HTML/CSS/Javascript</li>
                        <li>
                          Utilizing Next.js for the website framework of the
                          website, along with firebase as a database.
                        </li>
                      </ul>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Why make the website?
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      I play a little too many gacha games out there. These
                      include Genshin Impact, Honkai Star Rail, Zenless Zone
                      Zero, Wuthering Waves, and many more. I wanted to have an
                      easy way for players like myself to organize and display
                      their account information from these games, like the
                      characters, weapons, talent levels, and other equipment
                      like artifacts.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </main>
        </div>
      </main>
     <Footer/>
    </div>
  );
}
