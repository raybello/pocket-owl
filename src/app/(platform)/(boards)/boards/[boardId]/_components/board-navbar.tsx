import type { Board } from "~/server/db/schema";
import { BoardNavbarBreadcrumb } from "./board-navbar-breadcrumb";
import BoardMoreDropdown from "./board-more-dropdown";

interface BoardNavbarProps {
    data: Board
}

export default async function BoardNavbar({
    data
}: BoardNavbarProps) {

    return (
      <div className="flex h-8 flex-row items-center justify-between gap-x-4 rounded-lg bg-black/25 p-2 text-white">
        <BoardNavbarBreadcrumb data={data} />
        <BoardMoreDropdown />
      </div>
    );
}