import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "./cn";

const FILLED =
  "border-border-active bg-secondary text-secondary-foreground focus-visible:ring-ring-muted";

const buttonVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border transition focus:outline-hidden focus-visible:ring-2 disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary font-medium text-primary-foreground not-disabled:hover:border-primary-hover not-disabled:hover:bg-primary-hover focus-visible:ring-ring",
        outline:
          "border-border text-subtle-foreground not-disabled:hover:border-border-strong not-disabled:hover:text-accent-foreground focus-visible:ring-ring-muted",
        ghost:
          "border-transparent text-subtle-foreground not-disabled:hover:bg-secondary not-disabled:hover:text-accent-foreground focus-visible:ring-ring-muted",
        destructive:
          "border-destructive bg-destructive font-medium text-primary-foreground not-disabled:hover:border-destructive/85 not-disabled:hover:bg-destructive/85 focus-visible:ring-destructive",
      },
      size: {
        sm: "px-2.5 py-1 text-xs",
        default: "px-2.5 py-1.5 text-xs",
        lg: "px-3.5 py-2 text-sm",
      },
      active: { true: "", false: "" },
    },
    compoundVariants: [
      {
        variant: "outline",
        active: true,
        className: FILLED,
      },
    ],
    defaultVariants: { variant: "outline", size: "default", active: false },
  },
);

type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  active,
  asChild = false,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      type={asChild ? type : (type ?? "button")}
      className={cn(buttonVariants({ variant, size, active }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps, ButtonVariant };
