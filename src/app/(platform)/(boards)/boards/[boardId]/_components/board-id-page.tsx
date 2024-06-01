import type { Board } from "~/server/db/schema";
import { Skeleton } from "~/components/ui/skeleton";
import BoardNavbar from "./board-navbar";


export default function BoardPage({ children, board }: { children: React.ReactNode, board: Board }) {
    return (
      <div
        className="relative h-full rounded-xl bg-cover bg-center bg-no-repeat p-1"
        style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      >
        <BoardNavbar data={board} />
        <main className="relative">{children}</main>
      </div>
    );
}

BoardPage.Skeleton = function BoardIdPageSkeleton() {
    return (
      <div className="relative h-full rounded-xl bg-cover bg-black/30 bg-center bg-no-repeat p-1">
        <Skeleton className="h-full w-full" />
      </div>
    );
}