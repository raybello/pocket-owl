import { getBoards } from "~/server/queries";
import { BoardForm } from "./board-form";
import { Board } from "./board";
import BoardList from "./_components/board-list";
import { Suspense } from "react";


async function BoardContainer() {
  const boards = await getBoards();

  return (
    <div className="flex flex-col space-x-4 ">
      <BoardForm />
      <div className="space-y-2 pt-2">
        {boards.map((bucket) => (
          <Board key={bucket.id} name={bucket.name} id={bucket.id} />
        ))}
      </div>
    </div>
  );
}

export default function BoardsPage() {

    return (
      <div className="flex h-full w-full flex-col rounded-xl bg-primary p-2">
        {/* <BoardContainer /> */}
        <div className="px-2 md:px-4">
          <Suspense fallback={<BoardList.Skeleton />} >
            <BoardList />
          </Suspense>
        </div>
      </div>
    );
}