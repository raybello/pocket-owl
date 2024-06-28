"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "../db";
import { lists } from "../db/schema";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "~/lib/create-safe-action";
import { CreateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { name, boardId } = data;
  let list;

  try {
    const board = await db.query.boards.findFirst({
      where: (model, { eq, and }) =>
        and(eq(model.userId, userId), eq(model.id, Number(boardId))),
    });

    if (!board) {
      return {
        error: "Board not found",
      };
    }

    const lastList = await db.query.lists.findFirst({
      where: (model, { eq}) => eq(model.boardId, Number(boardId)),
      orderBy: (model, { desc }) => [desc(model.id)],
      columns: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db
      .insert(lists)
      .values({
        name: name,
        boardId: Number(boardId),
        order: newOrder,
      })
      .returning();
  } catch (error) {
    return {
      error: "Failed to create list",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return {
    data: list[0],
  };
};

export const createList = createSafeAction(CreateList, handler);
