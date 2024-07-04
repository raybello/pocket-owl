import type { z } from "zod";

import type { ActionState } from "~/lib/create-safe-action";
import type { CreateCard } from "~/server/actions/create-card/schema";
import type { Card} from "~/server/db/schema";

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputType, Card>;
