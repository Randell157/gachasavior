import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default function ContactPage() {
  const googleFormsUrl = "https://forms.gle/7Wh2EEq3xt5XqNdW6";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <main className="flex-1 container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Contact Me</h1>
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Have an issue or want to suggest a new feature?
                </div>
                <p className="mt-2 text-gray-500">
                  Please fill out the form below to send me a message. I will
                  respond within 24-48 hours.
                </p>
                <div className="mt-4">
                  <Button asChild className="w-full">
                    <a
                      href={googleFormsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Mail className="mr-2 h-4 w-4" /> Open Contact Form
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </main>
      <Footer />
    </div>
  );
}
