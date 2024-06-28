"use client";

import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

import { Button } from "~/components/ui/button";
import type { Board } from "~/server/db/schema";
import Link from "next/link";
import type { ElementRef } from "react";
import { useRef, useState } from "react";
import { FormInput } from "~/components/form/form-input";

import { updateBoard } from "~/server/actions/update-board";
import { useAction } from "hooks/use-actions";
import { toast } from "sonner";

interface BoardNameFormProps {
  data: Board;
}

export const BoardNavbarBreadcrumb = ({ data }: BoardNameFormProps) => {

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data?.name}" updated!`);
      setName(data?.name);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  })

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [Name, setName] = useState(data.name);
  const [isEditing, setIsEditing] = useState(false);

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

  const onSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;

    await execute({
      name: name,
      id: String(data.id),
    })
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="">
          <BreadcrumbLink asChild>
            <Link href="/boards" className="text-white hover:text-white/40">
              Boards
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash className="stroke-white" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          {!isEditing ? (
            <Button
              onClick={enableEditing}
              variant={"transparent"}
              className="h-auto w-auto p-1 pl-0.5 pr-0.5 text-sm font-semibold"
            >
              {Name}
            </Button>
          ) : (
            <form
              action={onSubmit}
              ref={formRef}
              className="flex w-auto items-center"
            >
              <FormInput
                ref={inputRef}
                id="name"
                className="focus:bg-red bg-transparent p-1 pl-0.5 pr-0.5 font-bold text-white focus-visible:outline-none"
                onBlur={onBlur}
                defaultValue={Name}
              />
            </form>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
