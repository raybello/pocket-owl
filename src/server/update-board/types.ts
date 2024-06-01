import type { z } from "zod";
import type { Board } from "../db/schema";

import type { ActionState } from "~/lib/create-safe-action";
import type { UpdateBoard } from "~/server/update-board/schema";

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionState<InputType, Board>;