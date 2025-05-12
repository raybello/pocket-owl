import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function CtaPanel() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-lg bg-blue-600">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Image */}
            <div className="order-2 md:order-1">
              <div className="h-full min-h-[400px]">
                <img
                  src="/images\iStock-818087910-200x133.jpg"
                  alt="3 Students discussing book"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 flex items-center p-8 md:order-2">
              <div className="text-white">
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                  Are my documents or institution part of MyCred?
                </h2>
                <p className="mb-6">
                  MyCred launched in fall 2020 so it will take time for Canadian
                  institutions to fully onboard and join. When your school
                  joins, they will notify you directly by email. It is exciting
                  to create a solution that allows you to share your official
                  documents and credentials securely and quickly with other
                  institutions, employers, government and others.
                </p>
                <div className="space-y-4">
                  <Link href="/boards">
                    <Button
                      variant="outline"
                      className="w-full border-white bg-transparent text-white hover:bg-white hover:text-blue-600 md:w-auto"
                    >
                      Students and Graduates
                    </Button>
                  </Link>
                  <Link
                    href="/members"
                    className="block md:ml-4 md:inline-block"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-white bg-transparent text-white hover:bg-white hover:text-blue-600 md:w-auto"
                    >
                      Colleges and Universities
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
