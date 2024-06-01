"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "~/components/ui/logo";


export function TopNav() {
  // const router = useRouter();

  return (
    <>
      <SignedOut>
        <nav className="flex w-full items-center justify-between p-4 text-xl font-semibold">
          <Logo />
          <SignInButton />
        </nav>
      </SignedOut>
      <SignedIn>
        <nav className="flex w-full items-center justify-end pb-2 pr-3 pt-2">
          <UserButton />
        </nav>
      </SignedIn>
    </>
  );
}
