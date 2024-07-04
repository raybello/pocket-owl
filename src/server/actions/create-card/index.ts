"use server";

import { auth } from "@clerk/nextjs/server";
import type { InputType, ReturnType } from "./types";
import { db } from "../../db";
import { cards } from "../../db/schema";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "~/lib/create-safe-action";
import { CreateCard } from "./schema";
import { eq } from "drizzle-orm";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { name, boardId, listId } = data;
  let card;

  try {

    const list = await db.query.lists.findFirst({
      where: (model, { eq }) => eq(model.id, Number(listId)),
    })

    if (!list) {
      return {
        error: "List not found",
      };
    }

    const lastCard = await db.query.cards.findFirst({
      where: (model, { eq }) => eq(model.listId, Number(listId)),
      orderBy: (model, { desc }) => [desc(model.order)],
      columns: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db
      .insert(cards)
      .values({
        name: name,
        listId: Number(listId),
        order: newOrder,
      })
      .returning();
    
  } catch (error) {
    return {
      error: "Failed to create card",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return {
    data: card[0],
  };
};

export const createCard = createSafeAction(CreateCard, handler);
