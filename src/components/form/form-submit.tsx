"use client";

import { useFormStatus } from "react-dom";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant ="secondary",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={disabled ?? pending}
      type="submit"
      size="sm"
      className={cn(className)}
      variant={variant}
    >
      {children}
    </Button>
  );
};
