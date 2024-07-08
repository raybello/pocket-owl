"use server";

import { auth } from "@clerk/nextjs/server";
import type { InputType, ReturnType } from "./types";
import { db } from "../../db";
import { cards } from "../../db/schema";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "~/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";
import { eq, sql } from "drizzle-orm";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, listId, boardId } = data;

  console.log("Received Card Items: ", items);
  let _cards;

  try {
    _cards = await db.transaction(async (tx) => {
      for (const iterator of items) {
        await tx
          .update(cards)
          .set({ order: sql`${iterator.order}` })
          .where(eq(cards.id, iterator.id));
      }

      const cardItems = await tx.transaction(async (tx2) => {
        return await tx2.query.cards.findMany({
          where: eq(cards.listId, listId),
        });
      });

      return cardItems;
    });

    console.log("Updated Card Items: ", _cards);
  } catch (error) {
    return {
      error: "Failed to reorder cards",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return {
    data: _cards,
  };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
