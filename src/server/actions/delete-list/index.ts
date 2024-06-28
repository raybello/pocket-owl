"use server";

import type { InputType, ReturnType } from "./types";

import { auth } from "@clerk/nextjs/server";
import { db } from "../../db";
import { lists } from "../../db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "~/lib/create-safe-action";
import { DeleteList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let deletedList;

  try {
    deletedList = await db
      .delete(lists)
      .where(and(eq(lists.id, Number(id)), eq(lists.boardId, Number(boardId))))
      .returning();
  } catch (error) {

    console.log(error);

    return {
      error: "Failed to delete list",
    };
  }

  revalidatePath(`/boards/${boardId}`);

  return (
    data: deletedList[0],
  );
};

export const deleteList = createSafeAction(DeleteList, handler);
