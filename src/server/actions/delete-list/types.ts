import type { z } from "zod";
import type { List } from "../../db/schema";

import type { ActionState } from "~/lib/create-safe-action";
import type { DeleteList } from "~/server/actions/delete-list/schema";

export type InputType = z.infer<typeof DeleteList>;
export type ReturnType = ActionState<InputType, List>;
