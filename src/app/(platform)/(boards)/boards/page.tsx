import BoardList from "./_components/board-list";
import { Suspense } from "react";

export default function BoardsPage() {

    return (
      <div className="flex h-full w-full flex-col rounded-xl bg-primary p-2">
        <div className="px-2 md:px-4">
          <Suspense fallback={<BoardList.Skeleton />} >
            <BoardList />
          </Suspense>
        </div>
      </div>
    );
}