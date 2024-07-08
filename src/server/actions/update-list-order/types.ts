import type { z } from "zod";

import type { ActionState } from "~/lib/create-safe-action";
import type { UpdateListOrder } from "~/server/actions/update-list-order/schema";
import type { List } from "~/server/db/schema";

export type InputType = z.infer<typeof UpdateListOrder>;
export type ReturnType = ActionState<InputType, List[]>;
