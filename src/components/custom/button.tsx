import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button as UIButton, buttonVariants as baseButtonVariants } from "@/components/ui/button"
import { Spinner } from "./spinner"

// Custom styles that extend the base UI button
const buttonVariantOverrides = cva(
  // Base customizations: rounded-full, active states
  "rounded-full active:opacity-60 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "active:bg-primary",
        destructive: "active:bg-destructive",
        outline: "text-primary active:bg-accent dark:active:bg-input/50",
        secondary: "text-primary border border-primary active:bg-secondary/70",
        ghost: "text-primary active:bg-accent dark:active:bg-accent/50",
        link: "active:underline",
      },
    },
  }
)

function Button({
  className,
  variant = "default",
  size,
  asChild = false,
  loading = false,
  children,
  ...props
}: React.ComponentProps<typeof UIButton> &
  VariantProps<typeof baseButtonVariants> & {
    loading?: boolean
  }) {
  const spinnerSize = size === "sm" ? "size-3" : size === "lg" ? "size-4" : "size-4"

  return (
    <UIButton
      className={cn(buttonVariantOverrides({ variant }), className)}
      variant={variant}
      size={size}
      asChild={asChild}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner className={cn("mr-2", spinnerSize)} />}
      {children}
    </UIButton>
  )
}

export { Button, baseButtonVariants as buttonVariants }
