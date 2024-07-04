"use server";

import type { InputType, ReturnType } from "./types";

import { auth } from "@clerk/nextjs/server";
import { db } from "../../db";
import { cards, lists } from "../../db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "~/lib/create-safe-action";
import { CopyList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let list;

  try {
    const listToCopy = await db.query.lists.findFirst({
      where: and(eq(lists.id, Number(id)), eq(lists.boardId, Number(boardId))),
      with: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return {
        error: "List not found",
      };
    }

    const lastList = await db.query.lists.findFirst({
      where: (model, { eq }) => eq(model.boardId, Number(boardId)),
      orderBy: (model, { desc }) => [desc(model.order)],
      columns: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db
      .insert(lists)
      .values({
        name: `${listToCopy.name} Copy`,
        boardId: listToCopy.boardId,
        order: newOrder,
      })
      .returning();
    
    const listId = list[0]?.id;

    if (listToCopy.cards.length > 0) {
      await db.insert(cards).values([
        ...listToCopy.cards.map((card) => ({
          listId: listId,
          name: card.name,
          order: card.order,
        })),
      ]);
    }

  } catch (error) {
    console.log(error);

    return {
      error: "Failed to copy list",
    };
  }

  revalidatePath(`/boards/${boardId}`);

  return {
    data: list[0],
  };
};

export const copyList = createSafeAction(CopyList, handler);
