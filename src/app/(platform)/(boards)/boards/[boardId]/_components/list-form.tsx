"use client";

import { Plus, X } from "lucide-react";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { useAction } from "hooks/use-actions";
import { createList } from "~/server/actions/create-list";

import { ListWrapper } from "./list-wrapper";
import { FormInput } from "~/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { FormSubmit } from "~/components/form/form-submit";
import { toast } from "sonner";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => { 
      toast.success(`List "${data?.name}" created!`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        formRef.current?.requestSubmit();
    }
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const boardId = formData.get("boardId") as string;

    await execute({ name, boardId });
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full space-y-4 rounded-md bg-white p-2 shadow-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="name"
            className="h-7 border-transparent px-2 py-2 text-sm font-medium transition hover:border-input focus:border-input"
            placeholder="Enter list name..."
          />
          <input hidden defaultValue={params.boardId} name="boardId" />
          <div className="flex items-center space-x-1">
            <FormSubmit className="text-slate-600">Add List</FormSubmit>
            <Button
              onClick={disableEditing}
              variant="ghost"
              size={"sm"}
              className="hover:bg-rose-100"
            >
              <X className="h-4 w-4 stroke-red-400" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        className="flex w-full items-center shadow-md rounded-md bg-white/90 p-3 pb-3 text-md font-medium transition hover:bg-white/50"
        onClick={enableEditing}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add a list
      </button>
    </ListWrapper>
  );
};
