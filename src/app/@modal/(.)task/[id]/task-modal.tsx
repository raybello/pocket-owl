"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

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
      className="modal h-3/4 w-2/3 rounded-lg bg-green-500 p-2"
      onClose={onDismiss}
    >
      <div className="flex justify-end p-2">
        <button className="close-button rounded-lg bg-red-500 px-2 text-black " onClick={onDismiss}>
          X
        </button>
      </div>
      {children}
    </dialog>,

    document.getElementById("modal-root")!,
  );
}
