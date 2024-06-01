import { z } from "zod";

export const UpdateBoard = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters",
    }),

  id: z.string()
});
