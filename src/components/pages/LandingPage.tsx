import { Medal } from "lucide-react";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

import Link from "next/link";

const headingFont = localFont({
  src: "../../../public/fonts/CalSans.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export function Footer() {
  return (
    <div>
      <p className="p-2 text-center text-xs text-neutral-400">
              © 2024 PocketOwl. All rights reserved <br />
              By RayB
      </p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div
          className={cn(
            "flex flex-col items-center justify-center",
            headingFont.className,
          )}
        >
          <div className="mb-4 flex items-center rounded-full border bg-amber-100 p-4 uppercase text-amber-700 shadow-md">
            <Medal className="mr-2 h-6 w-6" />
            No 1 Task Management Tool
          </div>
          <h1 className="mb-6 text-center text-3xl text-neutral-600 md:text-6xl">
            PocketOwl helps you
          </h1>
          <div className="w-fit items-center rounded-2xl bg-gradient-to-r from-primary to-secondary p-2 px-4 pb-4 text-3xl md:text-6xl">
            get tasks done.
          </div>
        </div>
        <div
          className={cn(
            "mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl",
            textFont.className,
          )}
        >
          Collaborate, manage tasks and reach new productivity peaks. From your
          computer, tablet or phone the way you work is unique - accomplish it
          with PocketOwl.
        </div>
        <Button
          variant="secondary"
          className="mt-6 text-black hover:bg-primary"
          size={"lg"}
        >
          <Link href="https://sensible-rat-46.accounts.dev/sign-up">
            Try PocketOwl for free
          </Link>
        </Button>
      </div>
      <Footer />
    </>
  );
}
