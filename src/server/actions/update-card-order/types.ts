import type { z } from "zod";

import type { ActionState } from "~/lib/create-safe-action";
import type { UpdateCardOrder } from "~/server/actions/update-card-order/schema";
import type { Card } from "~/server/db/schema";

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputType, Card[]>;
