"use server";

import type { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { boards } from "../db/schema";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "~/lib/create-safe-action";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { name, image } = data;

  const [
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName,
  ] = image.split("|");

  console.log({
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName
  });

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
    return {
      error: "Missing fields. Failed to create board",
    }
   }

  let board;

  try {
    board = await db
      .insert(boards)
      .values({
        name: name,
        userId: userId,
        imageId: imageId,
        imageThumbUrl: imageThumbUrl,
        imageFullUrl: imageFullUrl,
        imageUserName: imageUserName,
        imageLinkHTML: imageLinkHTML,
      })
      .returning();
  } catch (error) {
    return {
      error: "Database error",
    };
  }

  revalidatePath(`/boards/${board[0]?.id}`);
  // revalidatePath(`/boards`);

  return {
    data: board[0],
  };
};

export const createBoard = createSafeAction(CreateBoard, handler);
