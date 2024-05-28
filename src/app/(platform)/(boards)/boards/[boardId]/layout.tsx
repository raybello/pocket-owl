import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { db } from "~/server/db";

export async function genenrateMetadata({
  params
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
  }
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
        redirect("/boards")
    }

    const idAsNumber = Number(params.boardId);
    if (Number.isNaN(idAsNumber)) throw new Error("Invalid Image ID");

    const board = await db.query.boards.findFirst({
        where: (model, { eq }) => eq(model.id, idAsNumber),
    })

    if (!board) {
        notFound();
    }

    
  return (
      <div
          className="relative h-full bg-no-repeat bg-cover bg-center rounded-xl p-1"
          style={{backgroundImage: `url(${board.imageFullUrl})`}}
      >
      <main className="relative h-full">{children}</main>
    </div>
  );
}
