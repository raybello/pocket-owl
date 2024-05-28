import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

import { HelpCircle, User2 } from "lucide-react";
import { FormPopover } from "~/components/form/form-popover";
import { Hint } from "~/components/hint";
import { Skeleton } from "~/components/ui/skeleton";

export default async function BoardList() {

  const { userId } = auth();

  if (!userId) return null;

  const boards = await db.query.boards.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold">
        <User2 className="mr-2 h-6 w-6" />
        Your Boards
      </div>
      <div className="sm:grid-col-3 grid grid-cols-2 gap-4 lg:grid-cols-4 pb-3">
        {boards.map((board) => {
          return (
            <Link
              key={board.id}
              href={`/boards/${board.id}`}
              style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
              className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-md h-full w-full p-2 overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"
              />
              <p className="relative font-semibold text-white">
                {board.name}
              </p>
            </Link>
          )
         }) }
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-md bg-secondary transition hover:opacity-75"
          >
            <p className="text-sm ">Create new board</p>
            <span className="text-xs text-slate-500">5 remaining</span>
                      <Hint
                          
              sideOffset={20}
              description={`
                        Free tier is limited to 5 boards. Upgrade to get unlimited boards.
                        `}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
}

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="gird sm:grid-col-3 grid-cols-2 gap-4 lg:grid-cols-4">
      <Skeleton className="aspect-video h-full min-w-full p-2" />
      <Skeleton className="aspect-video h-full min-w-full p-2" />
      <Skeleton className="aspect-video h-full min-w-full p-2" />
      <Skeleton className="aspect-video h-full min-w-full p-2" />
      <Skeleton className="aspect-video h-full min-w-full p-2" />
      <Skeleton className="aspect-video h-full min-w-full p-2" />
      <Skeleton className="aspect-video h-full min-w-full p-2" />
    </div>
  );
}