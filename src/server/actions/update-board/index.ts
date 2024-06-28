"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "../../db";
import { boards } from "../../db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "~/lib/create-safe-action";
import { UpdateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { name, id } = data;

  let board;

  try {
    board = await db
      .update(boards)
      .set({ name: name })
      .where(and(eq(boards.id, Number(id)), eq(boards.userId, userId)))
      .returning();
  } catch (error) {
    return {
      error: "Failed to update board",
    };
  }

  revalidatePath(`/boards/${board[0]?.id}`);
  return {
    data: board[0],
  };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
