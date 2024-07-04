"use client";

import type { List } from "~/server/db/schema";
import { useState, useRef, ElementRef } from "react";
import { useEventListener } from "usehooks-ts";
import { FormInput } from "~/components/form/form-input";
import { updateList } from "~/server/actions/update-list";
import { useAction } from "hooks/use-actions";
import { toast } from "sonner";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [Name, setName] = useState(data.name);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      setName(data?.name);
      toast.success(`List "${data?.name}" updated!`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
      disableEditing();
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (name == data.name) {
      return disableEditing();
    }

    await execute({ name, id, boardId });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      formRef.current?.requestSubmit();
    }
    if (e.key === "Escape") {
      // formRef.current?.requestSubmit();
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="flex items-start justify-between gap-x-2 pt-2 ">
      {isEditing ? (
        <div className="text-md h-8 w-full border-transparent px-1 py-1 ">
          <form ref={formRef} className="flex-1 " action={handleSubmit}>
            <input hidden id="id" name="id" defaultValue={data.id} />
            <input
              hidden
              id="boardId"
              name="boardId"
              defaultValue={data.boardId}
            />
            <FormInput
              ref={inputRef}
              errors={fieldErrors}
              onBlur={onBlur}
              id="name"
              placeholder="Enter list name..."
              defaultValue={Name}
              className="text-md h-8 border-transparent pb-3 hover:border-input font-medium"
            />
            <button type="submit" className="hidden" />
          </form>
        </div>
      ) : (
        <div
          onClick={enableEditing}
          className="text-md h-8 w-full cursor-pointer border-transparent px-1 py-1 font-medium "
        >
          {Name}
        </div>
      )}
      <ListOptions
        data={data}
        onAddCard={onAddCard}
      />
    </div>
  );
};
