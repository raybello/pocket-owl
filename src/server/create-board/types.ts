import type { z } from "zod";
import type { ActionState } from "~/lib/create-safe-action";
import type { CreateBoard } from "./schema";
import type { Board } from "../db/schema";


export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputType, Board>;