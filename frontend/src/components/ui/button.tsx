import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center",
    "rounded-md border border-transparent",
    "bg-clip-padding",
    "text-sm font-medium whitespace-nowrap",
    "transition-colors",
    "outline-none select-none",
    "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
    "dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/30",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",

        outline: "border-border bg-background text-foreground hover:bg-muted",

        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",

        ghost: "bg-transparent text-foreground hover:bg-muted",

        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",

        link: "text-primary underline-offset-4 hover:underline",
      },

      size: {
        xs: "h-6 gap-1 rounded px-2 text-xs " + "[&_svg:not([class*='size-'])]:size-3",

        sm: "h-7 gap-1.5 rounded-md px-2.5 text-xs " + "[&_svg:not([class*='size-'])]:size-3.5",

        default: "h-8 gap-1.5 px-3",

        lg: "h-9 gap-2 px-4",

        icon: "size-8",

        "icon-xs": "size-6 rounded",

        "icon-sm": "size-7 rounded-md",

        "icon-lg": "size-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
