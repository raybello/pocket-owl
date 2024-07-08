"use server";

import { auth } from "@clerk/nextjs/server";
import type { InputType, ReturnType } from "./types";
import { db } from "../../db";
import { lists } from "../../db/schema";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "~/lib/create-safe-action";
import { UpdateListOrder } from "./schema";
import { eq, sql } from "drizzle-orm";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, boardId } = data;
  let _lists;

  try {
    _lists = await db.transaction(async (tx) => {
      for (const iterator of items) {
        await tx
          .update(lists)
          .set({ order: sql`${iterator.order}` })
          .where(eq(lists.id, iterator.id));
      }

      const listItems = await tx.transaction(async (tx2) => {
        return await tx2.query.lists.findMany({
          where: eq(lists.boardId, Number(boardId)),
          with: {
            cards: true,
          },
        });
      });

      return listItems;
    });

  } catch (error) {
    return {
      error: "Failed to reorder lists",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return {
    data: _lists,
  };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
