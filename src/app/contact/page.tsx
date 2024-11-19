import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default function ContactPage() {
  const googleFormsUrl = "https://forms.gle/7Wh2EEq3xt5XqNdW6";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-indigo-900">
                Contact Me
              </h1>
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Want to improve the website?
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Here's where you can contact me. Use the contact form or email
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Contact Form
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <p className="mb-4">
                        Please click the button below to access our contact form. We'll get back to you as soon as possible!
                      </p>
                      <Button asChild className="w-full sm:w-auto">
                        <a href={googleFormsUrl} target="_blank" rel="noopener noreferrer">
                          Open Contact Form
                        </a>
                      </Button>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      gachasavior@gmail.com
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </main>
        </div>
      </main>
      <Footer />
    </div>
  );
}
