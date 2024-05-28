import { z } from "zod";

import { ActionState } from "~/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { Board } from "../db/schema";


export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputType, Board>;