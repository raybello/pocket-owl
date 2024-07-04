import { z } from "zod";

export const CreateCard = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name is required",
    })
    .min(1, {
      message: "Name must be at least 1 character",
    }),

  boardId: z.string(),
  listId: z.string(),
});
