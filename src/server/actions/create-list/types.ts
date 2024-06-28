import type { z } from "zod";

import type { ActionState } from "~/lib/create-safe-action";
import type { CreateList } from "~/server/actions/create-list/schema";
import type { List } from "~/server/db/schema";

export type InputType = z.infer<typeof CreateList>;
export type ReturnType = ActionState<InputType, List>;
