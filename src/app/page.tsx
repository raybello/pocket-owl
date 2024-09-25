import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages, getMyTasks } from "~/server/queries";
import LandingPage from "~/components/pages/LandingPage";
import Link from "next/link";
import DashboardPage from "~/components/pages/DashboardPage";

export const dynamic = "force-dynamic";


export default async function RootPage() {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <DashboardPage />
      </SignedIn>
    </>
  );
}
