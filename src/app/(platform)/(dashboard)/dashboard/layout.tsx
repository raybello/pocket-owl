import type React from "react";
import { DashboardSidebar } from "~/components/new/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr]">
      <DashboardSidebar />
      <main className="flex flex-col">
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
