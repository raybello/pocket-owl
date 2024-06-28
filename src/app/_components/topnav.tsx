"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import Logo from "~/components/ui/logo";
import { Skeleton } from "~/components/ui/skeleton";


function SkeletonUserButton() {
  return (
    <Skeleton className="w-7 h-7 rounded-full bg-slate-400" />
  )
}


export function TopNav() {

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
          <Suspense fallback={<SkeletonUserButton />}>
            <UserButton showName={true} />
          </Suspense>
        </nav>
      </SignedIn>
    </>
  );
}
