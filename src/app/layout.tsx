import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { Inter } from "next/font/google";
import { TopNav } from "./_components/topnav";


import {
  ClerkProvider,
} from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "~/components/ui/sonner";
import { CSPostHogProvider } from "./_analytics/provider";
import { SidebarContent } from "~/components/ui/sidebar";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    default: "PocketOwl",
    template: "%s | PocketOwl"
  },
  description: "Tasks made easy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};



export default function RootLayout({
    children,
    modal,
  }: {
    children: React.ReactNode;
    modal: React.ReactNode;
  }) {
  
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en">
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <body className={`font-sans ${inter.variable} custom_light flex`}>
            <div className="flex flex-row w-full gap-2">
              <SidebarContent />
              <div className="flex w-full flex-col">
                <TopNav />
                {/* <main className="pr-3 max-w-6xl 2xl:max-w-screen h-full w-full mb-3">{children}</main> */}
                <main className="pr-3 h-full w-full 2xl:max-w-screen mb-3">{children}</main>
                {modal}
              </div>
            </div>
            <div id="modal-root" />
            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
