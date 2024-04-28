"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadImageButton } from "./upload-image-button";

export function TopNav() {

  const router = useRouter();

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>PocketOwl</div>

      <div className="flex flex-row">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="flex flex-row items-center gap-4">
            <UploadImageButton />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
