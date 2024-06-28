"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "../../db";
import { boards } from "../../db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "~/lib/create-safe-action";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;
  let board;

  try {
    board = await db
      .delete(boards)
      .where(and(eq(boards.id, Number(id)), eq(boards.userId, userId)))
      .returning();
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to delete board",
    };
  }

  revalidatePath("/boards");
  redirect("/boards");
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
