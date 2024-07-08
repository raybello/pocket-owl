"use client";

import { useRef, ElementRef, KeyboardEventHandler, forwardRef } from "react";
import { Plus, X } from "lucide-react";
import { FormSubmit } from "~/components/form/form-submit";
import { FormTextarea } from "~/components/form/form-textarea";
import { Button } from "~/components/ui/button";

import { useAction } from "hooks/use-actions";
import { createCard } from "~/server/actions/create-card";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useOnClickOutside, useEventListener } from "usehooks-ts";

interface CardFormProps {
  listId: number;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data?.name}" created!`);
        formRef.current?.reset();
        disableEditing();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    const resetAndDisableEditing = () => {
      formRef.current?.reset();

      disableEditing();
    };

    useOnClickOutside(formRef, resetAndDisableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e,
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = async (formData: FormData) => {
      const name = formData.get("name") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      await execute({ name, listId, boardId });
    };

    if (isEditing) {
      return (
        <form action={onSubmit} ref={formRef} className=" space-y-2 ">
          <FormTextarea
            id="name"
            onKeyDown={onTextareaKeyDown}
            ref={ref}
            className="bg-white/70 text-black"
            placeholder="Enter task name..."
            errors={fieldErrors}
          />
          <input hidden id="listId" name="listId" defaultValue={listId} />
          <div className="flex items-center gap-x-2">
            <FormSubmit className="bg-white text-black">Add card</FormSubmit>
            <Button onClick={disableEditing} size={"sm"} variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="">
        <Button
          className="w-full items-center justify-start gap-x-2 bg-white/70 text-sm text-black text-muted-foreground"
          variant={"ghost"}
          onClick={enableEditing}
        >
          <Plus className="h-4 w-4" />
          Add a task
        </Button>
      </div>
    );
  },
);

CardForm.displayName = "CardForm";
