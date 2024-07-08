

import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";

import { ListContainer } from "./_components/list-container";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

export default async function BoardIdPage({ params }: BoardIdPageProps) {
  const { userId } = auth();
  if (!userId) return null;

  const lists = await db.query.lists.findMany({
    where: (model, { eq }) => eq(model.boardId, Number(params.boardId)),
    orderBy: (model, { asc }) => [asc(model.order)],
    with: {
      cards: {
        orderBy: (card, { asc }) => [asc(card.order)],
      },
    },
  });


  return (
    <>
    <div className="py-4 px-3 h-full overflow-x-auto">
      <ListContainer
        boardId={params.boardId}
        data={lists}
      />
      </div>
    </>
  );
}
