"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, User, LayoutDashboard, LogOut } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Hi, Raymond</h2>
        <p className="text-sm text-muted-foreground">
          Member since: Sept 19, 2016
        </p>
      </div>
      <Separator />
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          <NavItem
            href="/dashboard"
            icon={LayoutDashboard}
            label="Summary"
            isActive={pathname === "/dashboard"}
          />
          <NavItem
            href="/dashboard/orders"
            icon={Package}
            label="Orders"
            isActive={
              pathname === "/dashboard/orders" ||
              pathname.startsWith("/dashboard/orders/")
            }
          />
          <NavItem
            href="/dashboard/profile"
            icon={User}
            label="Profile"
            isActive={pathname === "/dashboard/profile"}
          />
        </div>
      </nav>
      <div className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          <div>Customer Service</div>
          <div>7 days a week | 8am—12pm ET</div>
          <div>1-800-555-0102</div>
          <div className="mt-2">
            <Link href="#" className="text-primary hover:underline">
              Help desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
