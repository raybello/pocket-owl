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

interface BoardNameFormProps {
  data: Board;
}

export const BoardNavbarBreadcrumb = ({ data }: BoardNameFormProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    // TODO: Focus on input
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    console.log("Name: ", name);

    disableEditing();
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
              {data.name}
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
                defaultValue={data.name}
              />
            </form>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
