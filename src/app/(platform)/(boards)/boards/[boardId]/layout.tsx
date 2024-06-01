import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { db } from "~/server/db";
import BoardPage from "./_components/board-id-page";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const idAsNumber = Number(params.boardId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid Image ID");

  const board = await db.query.boards.findFirst({
    where: (model, { eq }) => eq(model.id, idAsNumber),
  });

  return {
    title: board?.name ?? "Board",
  };
}

export default async function BoardIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/boards");
  }

  const idAsNumber = Number(params.boardId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid Image ID");

  const board = await db.query.boards.findFirst({
    where: (model, { eq }) => eq(model.id, idAsNumber),
  });

  if (!board) {
    notFound();
  }

  return (
    <Suspense fallback={<BoardPage.Skeleton />}>
      <BoardPage board={board}>{children}</BoardPage>
    </Suspense>
  );
}
