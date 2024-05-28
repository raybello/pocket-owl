
"use client";

import { toast } from "sonner";

export function createToast(id: string, name: string) {

    return toast(
      <div>
        <h1>{name}</h1>
        </div>,
      {
        id: id,
        duration: 3000,
      },
    );
}