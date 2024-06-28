"use client";

import type { ListWithCards } from "types";
import { ListHeader } from "./list-header";

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

export const ListItem = ({ index, data }: ListItemProps) => {
  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-white/90 pb-1 shadow-md">
        <ListHeader data={data} />
      </div>
    </li>
  );
};
