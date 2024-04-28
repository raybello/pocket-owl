"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Button } from "~/components/ui/button";

function CloseModalSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

export function TaskModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="modal h-3/4 w-2/3 rounded-lg bg-zinc-500 p-2 "
      onClose={onDismiss}
    >
      <div className="flex justify-end p-2 ">
        <Button variant="ghost" className="close-button" onClick={onDismiss}>
          <CloseModalSVG />
        </Button>
      </div>
      {children}
    </dialog>,

    document.getElementById("modal-root")!,
  );
}
