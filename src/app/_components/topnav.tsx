import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>PocketOwl</div>

      <div className="flex flex-row">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="flex flex-row items-center gap-4">
            <UploadButton endpoint="imageUploader" />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
