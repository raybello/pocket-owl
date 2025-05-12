import { ChevronDown } from "lucide-react";
import Image from "next/image";
import QuickNav from "~/components/new/quick-nav";

export default function HeroBanner() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="/images/Georgian_College_Student_Life_1-1400x933.jpg"
            alt="Picture of Georgian College students enjoying hanging out"
            className="h-full w-full object-cover object-center"
                  />
          <span className="absolute bottom-4 left-4 hidden rounded bg-black/50 p-2 text-sm text-white lg:block">
            Georgian College students in Barrie, Ontario, Canada.
          </span>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Welcome to MyCred
            </h1>
            <p className="mb-2 text-xl md:text-2xl">
              Canada's new, official credential wallet for post-secondary
              learners and graduates.
            </p>
            <h2 className="mb-8 text-2xl font-semibold md:text-3xl">
              Convenient. Trusted. Secure.
            </h2>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <QuickNav />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transform animate-bounce">
        <ChevronDown className="h-10 w-10 text-white" />
      </div>
    </section>
  );
}
