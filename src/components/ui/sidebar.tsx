"use client";

import {
  CloseSidebarSVG,
  OpenSidebarSVG,
  CalendarSVG,
  NotesSVG,
  SettingsSVG,
  TaskSVG,
  DashboardSVG,
  BoardSVG,
} from "~/components/ui/svg-icons";

import { createContext, useContext, useState } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { UploadImageButton } from "~/app/_components/upload-image-button";
import Link from "next/link";
import Logo from "./logo";

import { usePathname } from "next/navigation";

function SidebarItem({
  icon,
  text,
  url,
  active,
  alert,
}: {
  icon: React.ReactNode;
  text: string;
  url: string;
  active?: boolean;
  alert?: boolean;
}) {
  const expanded = useContext(SidebarContext);

  return (
    <Link href={url}>
      <li
        className={`
    group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors
    ${active ? "bg-gradient-to-tr from-secondary to-primary" : "text-gray-600 hover:bg-primary"}
    `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${expanded ? "ml-3 w-32" : "w-0"}`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 h-2 w-2 rounded bg-secondary ${expanded ? "" : "top-2"}`}
          ></div>
        )}
        {!expanded && (
          <div
            className={`
            invisible absolute left-full ml-6  -translate-x-2 rounded-md
            bg-primary px-2 py-1 z-40
            text-sm text-gray-600 opacity-20 transition-all
            group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
          `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}

const SidebarItems = [
  { icon: <DashboardSVG/>, text: "Dashboard", url: "/", active: true },
  { icon: <BoardSVG />, text: "Boards", url: "/boards", alert: true },
  // { icon: <TaskSVG />, text: "Tasks", url: "/tasks", alert: true },
  // { icon: <NotesSVG />, text: "Notes", url: "/notes" },
  // { icon: <CalendarSVG />, text: "Calendar", url: "/calendar", alert: true },
  // { icon: <SettingsSVG />, text: "Settings", url: "/settings" },
];

const SidebarContext = createContext(true);

function Sidebar({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen">
      <nav className="shadow-sml flex h-full w-auto flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 pl-4 pr-4 pt-2">
          {expanded ? <Logo /> : null}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="rounded-full p-1.5 hover:bg-primary"
          >
            {expanded ? <CloseSidebarSVG /> : <OpenSidebarSVG />}
          </button>
        </div>

        {/* Content */}
        <SidebarContext.Provider value={expanded}>
          <ul className="flex-1 px-3 py-2">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

function SidebarContent() {
  const pathname:string = usePathname();

  return (
    <>
      <SignedIn>
        <Sidebar>
          {SidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              url={item.url}
              active={pathname === item.url}
              alert={item.alert}
            />
          ))}
        </Sidebar>
      </SignedIn>
    </>
  );
}

export { Sidebar, SidebarItem, SidebarContent };
