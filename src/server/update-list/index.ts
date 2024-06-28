"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "../db";
import { lists } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "~/lib/create-safe-action";
import { UpdateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { name, id, boardId } = data;

  let list;
    
  try {
    list = await db
      .update(lists)
      .set({ name: name })
      .where(and(eq(lists.id, Number(id)), eq(lists.boardId, Number(boardId))))
      .returning();
  } catch (error) {
    return {
      error: "Failed to update list",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return {
    data: list[0],
  };
};

export const updateList = createSafeAction(UpdateList, handler);