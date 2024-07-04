import type { z } from "zod";
import type { List } from "../../db/schema";

import type { ActionState } from "~/lib/create-safe-action";
import type { CopyList } from "~/server/actions/copy-list/schema";

export type InputType = z.infer<typeof CopyList>;
export type ReturnType = ActionState<InputType, List>;
