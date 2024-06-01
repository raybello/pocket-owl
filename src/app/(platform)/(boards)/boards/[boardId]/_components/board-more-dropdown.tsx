
"use client";

import { Ellipsis } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";


export default function BoardMoreDropdown() {

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-6 px-1 rounded-full" variant="transparent">
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Board Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Copy Board
            <DropdownMenuShortcut>⌘+C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-rose-500">
            Delete Board
            <DropdownMenuShortcut>⌘+D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}