"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import Image from "next/image";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import Logo from "~/components/ui/logo";
import { Skeleton } from "~/components/ui/skeleton";

function SkeletonUserButton() {
  return <Skeleton className="h-7 w-7 rounded-full bg-slate-400" />;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="flex items-center lg:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/Maple_Leaf.svg"
                className=""
                alt="logo"
                height={30}
                width={30}
              />
              <span className="text-2xl font-bold text-blue-600">MyCred™</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 lg:flex">
            <div className="group relative">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <span>Meet MyCred</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 hidden w-64 rounded-lg bg-white p-2 shadow-lg group-hover:block">
                <Link
                  href="/about"
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  About the MyCred Network
                </Link>
                <Link
                  href="/your-organization"
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  Transform your Organization
                </Link>
                <Link
                  href="/become-a-member"
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  Become a Member
                </Link>
                <Link
                  href="https://membertrustregistry.MyCred.ca/"
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  Meet our Network Members
                </Link>
                <Link
                  href="/terms-of-use"
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  Terms of Use
                </Link>
                <Link
                  href="/code-of-conduct"
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  Code of Conduct
                </Link>
              </div>
            </div>

            <Link href="/members" className="text-gray-700 hover:text-blue-600">
              Members
            </Link>

            <Link
              href="/learners"
              className="text-gray-700 hover:text-blue-600"
            >
              Learners
            </Link>

            <Link
              href="/trust-matters"
              className="text-gray-700 hover:text-blue-600"
            >
              Trust Matters
            </Link>

            <div className="group relative">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <span>About Us</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 hidden w-64 rounded-lg bg-white p-2 shadow-lg group-hover:block">
                <Link
                  href="/who-we-are"
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  Who We Are
                </Link>
                <Link
                  href="/founders"
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  MyCred Founders
                </Link>
                <Link
                  href="/privacy-policy"
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  ARUCC Privacy Policy
                </Link>
                <Link
                  href="/news"
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  News
                </Link>
                <Link
                  href="/faqs"
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  FAQs
                </Link>
                <Link
                  href="/service-updates"
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  Service & Maintenance Updates
                </Link>
                <Link
                  href="/contact-us"
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </nav>

          {/* Utility Navigation */}
          <div className="flex items-center space-x-4">
            <div className="hidden items-center space-x-2 md:flex">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                EN
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                FR
              </Link>
            </div>

            <SignedOut>
              <Link
                href="https://elegant-lionfish-31.accounts.dev/sign-in"
                className="hidden md:block"
              >
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Login
                </Button>
                {/* <SignInButton> Login </SignInButton> */}
              </Link>
            </SignedOut>
            <SignedIn>
              <nav className="flex w-full items-center justify-end pb-2 pr-3 pt-2">
                <Suspense fallback={<SkeletonUserButton />}>
                  <UserButton showName={true} />
                </Suspense>
              </nav>
            </SignedIn>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-blue-600"
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 py-4">
            <div className="flex items-center">
              <form className="flex flex-1 items-center">
                <button type="submit" className="text-gray-500">
                  <Search className="h-5 w-5" />
                </button>
                <input
                  type="search"
                  placeholder="Search"
                  className="flex-1 px-4 py-2 focus:outline-none"
                />
              </form>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="container mx-auto px-4 py-6">
            <div className="mb-8 flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">
                  MyCred™
                </span>
              </Link>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-8 flex justify-center">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-gray-700 hover:text-blue-600">
                  EN
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="https://mescertif.ca/"
                  className="text-gray-700 hover:text-blue-600"
                >
                  FR
                </Link>
              </div>
            </div>

            <div className="mb-8 flex justify-center">
              <SignedOut>
                <Link href="https://elegant-lionfish-31.accounts.dev/sign-in">
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    Login
                  </Button>
                </Link>
              </SignedOut>
            </div>
            <SignedIn>
              <nav className="flex w-full items-center justify-end pb-2 pr-3 pt-2">
                <Suspense fallback={<SkeletonUserButton />}>
                  <UserButton showName={true} />
                </Suspense>
              </nav>
            </SignedIn>

            <nav className="space-y-6">
              <div>
                <button className="flex w-full items-center justify-between border-b border-gray-200 py-2 text-lg font-medium">
                  <span>Meet MyCred</span>
                  <ChevronDown className="h-5 w-5" />
                </button>
                <div className="ml-4 mt-2 space-y-2">
                  <Link href="/about" className="block py-2 text-gray-700">
                    About the MyCred Network
                  </Link>
                  <Link
                    href="/your-organization"
                    className="block py-2 text-gray-700"
                  >
                    Transform your Organization
                  </Link>
                  <Link
                    href="/become-a-member"
                    className="block py-2 text-gray-700"
                  >
                    Become a Member
                  </Link>
                </div>
              </div>

              <Link
                href="/members"
                className="block border-b border-gray-200 py-2 text-lg font-medium"
              >
                Members
              </Link>

              <Link
                href="/learners"
                className="block border-b border-gray-200 py-2 text-lg font-medium"
              >
                Learners
              </Link>

              <Link
                href="/trust-matters"
                className="block border-b border-gray-200 py-2 text-lg font-medium"
              >
                Trust Matters
              </Link>

              <div>
                <button className="flex w-full items-center justify-between border-b border-gray-200 py-2 text-lg font-medium">
                  <span>About Us</span>
                  <ChevronDown className="h-5 w-5" />
                </button>
                <div className="ml-4 mt-2 space-y-2">
                  <Link href="/who-we-are" className="block py-2 text-gray-700">
                    Who We Are
                  </Link>
                  <Link href="/founders" className="block py-2 text-gray-700">
                    MyCred Founders
                  </Link>
                  <Link href="/contact-us" className="block py-2 text-gray-700">
                    Contact Us
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
