import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "./cn";

const cardVariants = cva("border border-border", {
  variants: {
    surface: { card: "bg-card", solid: "bg-surface" },
    radius: { lg: "rounded-lg", xl: "rounded-xl" },
    padding: { none: "", sm: "p-4", md: "px-5 py-4", lg: "p-5" },
  },
  defaultVariants: { surface: "card", radius: "xl", padding: "md" },
});

function Card({
  className,
  surface,
  radius,
  padding,
  asChild = false,
  ...props
}: ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      data-slot="card"
      className={cn(cardVariants({ surface, radius, padding }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-3.5",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("mt-4 min-w-0", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "mt-4 flex flex-wrap items-center gap-x-3.5 gap-y-2 border-t border-border pt-4",
        className,
      )}
      {...props}
    />
  );
}

export { Card, CardContent, CardFooter, CardHeader, cardVariants };
