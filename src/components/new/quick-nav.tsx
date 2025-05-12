"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function QuickNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="flex flex-col items-start p-4 md:flex-row md:items-center">
        <span className="mb-2 mr-4 font-medium text-gray-700 md:mb-0">
          I would like to
        </span>

        <div className="relative w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between rounded bg-blue-50 px-4 py-3 text-left transition-colors hover:bg-blue-100"
          >
            <span>Access and share my transcript or credentials</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg">
              {/* <Link
                href="/learners"
                className="block border-b border-gray-100 px-4 py-3 hover:bg-blue-50"
              >
                Access and share my transcript or credentials
              </Link>
              <Link
                href="/members"
                className="block px-4 py-3 hover:bg-blue-50"
              >
                Become an organizational member of MyCred.
              </Link> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
