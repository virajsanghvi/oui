import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button as BaseButton } from "../ui/button"
import { Spinner } from "@/components"

// Combined button variants that merge base variants with custom overrides
const buttonVariants = cva(
  [
    // Base classes from baseButtonVariants
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    // Custom override classes
    "rounded-full active:opacity-60 active:scale-[0.98]"
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 active:bg-destructive",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 text-primary active:bg-accent dark:active:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 text-primary border border-primary active:bg-secondary/70",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 text-primary active:bg-accent dark:active:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline active:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
}: React.ComponentProps<typeof BaseButton> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
  }) {
  const spinnerSize = size === "sm" ? "size-3" : size === "lg" ? "size-4" : "size-4"

  return (
    <BaseButton
      className={cn(buttonVariants({ variant, size }), className)}
      variant={variant}
      size={size}
      asChild={asChild}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner className={cn("mr-2", spinnerSize)} />}
      {children}
    </BaseButton>
  )
}

export { Button, buttonVariants }
