"use server";

import { db } from "./db";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { boards, tasks } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";
import { revalidatePath } from "next/cache";

export async function deleteBoard(bucketId: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(boards)
    .where(and(eq(boards.id, bucketId), eq(boards.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "Delete Board",
    properties: {
      bucketId: bucketId,
    },
  });

  revalidatePath("/tasks");
}

export async function getBoards() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const boards = await db.query.boards.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
  });
  return boards;
}

export type State = {
  errors?: {
    title?: string;
  };
  message?: string | null;
};
const createNewBoardSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
});

export const createNewBoard = async (prevState: State, formData: FormData) :Promise<State> => {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const validatedFields = createNewBoardSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
      return {
          message: "Form validation error",
    };
  }

    const { name } = validatedFields.data;
    
  try {
    await db.insert(boards).values({
      name: name,
      userId: user.userId,
    });
  } catch (error) {
    return {
      ...prevState,
      message: "Database error",
    };
  }

  revalidatePath("/boards");
  redirect("/boards");
}

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}

export async function getMyTasks() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const tasks = await db.query.tasks.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return tasks;
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function getTask(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const task = await db.query.tasks.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!task) throw new Error("Task not found");

  if (task.userId !== user.userId) throw new Error("Unauthorized");

  return task;
}

export async function deleteTask(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(tasks)
    .where(and(eq(tasks.id, id), eq(tasks.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "Delete Task",
    properties: {
      taskId: id,
    },
  });

  redirect("/");
}
