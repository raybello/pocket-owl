"use client";

import { createBoard } from "~/server/create-board";
import { useAction } from "hooks/use-actions";
import { FormInput } from "~/components/form/form-input";
import { FormSubmit } from "~/components/form/form-submit";

export const BoardForm = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    
    console.log(name)
    await execute({ name });
  };


  return (
    <form action={onSubmit}>
      <div className="flex flex-col">
        <FormInput id="name" label="Board Name" errors={fieldErrors} />
        <FormSubmit>
          Save
        </FormSubmit>
      </div>
    </form>
  );
};
