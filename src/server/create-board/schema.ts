import { z } from "zod";

export const CreateBoard = z.object({
    name: z.string(
        {
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }
    ).min(3, {
        message: "Name must be at least 3 characters",
    }),

    image: z.string({
        required_error: "Image is required",
        invalid_type_error: "Image must be a string",
    }),
});