import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Progress as BaseProgress } from "../ui/progress"

const progressVariants = cva(
  "",
  {
    variants: {
      size: {
        sm: "h-1 w-64",
        default: "h-2 w-80",
        md: "h-3 w-80",
        lg: "h-4 w-80",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface ProgressProps
  extends React.ComponentProps<typeof BaseProgress>,
  VariantProps<typeof progressVariants> { }

const Progress = React.forwardRef<
  React.ComponentRef<typeof BaseProgress>,
  ProgressProps
>(function Progress({ className, size, ...props }, ref) {
  return (
    <BaseProgress
      ref={ref}
      className={cn(progressVariants({ size }), className)}
      {...props}
    />
  )
})

export { Progress }
