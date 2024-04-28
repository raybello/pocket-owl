import "server-only";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { tasks } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";


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
    })

    if (!image) throw new Error("Image not found");

    if (image.userId !== user.userId) throw new Error("Unauthorized");

    return image;
}

export async function getTask(id: number) {

    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");

    const task = await db.query.tasks.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    })

    if (!task) throw new Error("Task not found");

    if (task.userId !== user.userId) throw new Error("Unauthorized");

    return task;
}

export async function deleteTask(id: number) {
    const user = auth();

    if (!user.userId) throw new Error("Unauthorized");

    await db.delete(tasks).where(and(eq(tasks.id, id), eq(tasks.userId, user.userId)));

    redirect("/");
}
    