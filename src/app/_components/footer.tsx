import Link from "next/link";
import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Logo and Info */}
          <div className="text-center md:col-span-3 md:text-left">
            <Link href="/" className="mb-4 inline-block">
              <span className="text-2xl font-bold text-white">MyCred™</span>
            </Link>

            <p className="mb-4 text-sm text-gray-300">
              ©2025 - MyCred™ | MesCertif
              <sup style={{ fontSize: "50%" }}>MC</sup>
              <br />© Copyright 2020 ARUCC, the Association of Registrars of
              the Universities and Colleges of Canada | MyCred™ and MesCertif
              <sup>MC</sup> are trademarks of ARUCC.
            </p>

            <div className="flex justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/company/MyCred-mescertif/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-9">
            <div className="hidden grid-cols-4 gap-8 lg:grid">
              <div>
                <h3 className="mb-4 font-bold">Meet MyCred</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-300 hover:text-white"
                    >
                      About the MyCred Network
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/your-organization"
                      className="text-gray-300 hover:text-white"
                    >
                      Transform your Organization
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/become-a-member"
                      className="text-gray-300 hover:text-white"
                    >
                      Become a Member
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://membertrustregistry.MyCred.ca/"
                      className="text-gray-300 hover:text-white"
                    >
                      Meet our Network Members
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-of-use"
                      className="text-gray-300 hover:text-white"
                    >
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/code-of-conduct"
                      className="text-gray-300 hover:text-white"
                    >
                      Code of Conduct
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-bold">For You</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/members"
                      className="text-gray-300 hover:text-white"
                    >
                      Members
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/learners"
                      className="text-gray-300 hover:text-white"
                    >
                      Learners
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/trust-matters"
                      className="text-gray-300 hover:text-white"
                    >
                      Trust Matters
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-bold">About Us</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/who-we-are"
                      className="text-gray-300 hover:text-white"
                    >
                      Who We Are
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/founders"
                      className="text-gray-300 hover:text-white"
                    >
                      MyCred Founders
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-gray-300 hover:text-white"
                    >
                      ARUCC Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news"
                      className="text-gray-300 hover:text-white"
                    >
                      News
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faqs"
                      className="text-gray-300 hover:text-white"
                    >
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/service-updates"
                      className="text-gray-300 hover:text-white"
                    >
                      Service & Maintenance Updates
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact-us"
                      className="text-gray-300 hover:text-white"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-bold">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/help"
                      className="text-gray-300 hover:text-white"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/support"
                      className="text-gray-300 hover:text-white"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-blue-800 pt-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-300">
                    A first for Canada – Canadian colleges and universities
                    launched MyCred.ca in fall 2020. It offers learners and
                    graduates a national, secure digital wallet for sharing
                    official post-secondary transcripts and credentials. We're
                    excited about working together to transform how we support
                    learners through MyCred.ca.
                    <br />
                    <br />- Romesh Vadivel, Board Director - Associate Director,
                    Faculty of Arts Office of Advising and Student Information
                    Services (OASIS), McGill University
                  </p>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-sm text-gray-300">
                    Website images are provided with permission of our Canadian
                    college, institute and university partners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
