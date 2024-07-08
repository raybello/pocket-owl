import { z } from "zod";

export const UpdateCardOrder = z.object({
  items: z.array(
    z.object({
      id: z.number(),
      order: z.number(),
    })
  ),
  listId: z.number(),
  boardId: z.string()
});
