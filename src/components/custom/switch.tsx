"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva("", {
  variants: {
    variant: {
      default: "",
      box: "bg-card text-card-foreground border border-border rounded-lg p-4 shadow-sm",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {
  label?: string
  description?: string
  variant?: "default" | "box"
}

function Switch({
  className,
  variant = "default",
  label,
  description,
  id,
  ...props
}: SwitchProps) {
  const switchId = id || React.useId()

  const switchElement = (
    <SwitchPrimitive.Root
      id={switchId}
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )

  // If no label or description, return just the switch
  if (!label && !description) {
    return variant === "box" ? (
      <div className={switchVariants({ variant })}>
        {switchElement}
      </div>
    ) : (
      switchElement
    )
  }

  // If variant is box, wrap everything in the box container
  if (variant === "box") {
    return (
      <div className={switchVariants({ variant })}>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {label && (
              <label
                htmlFor={switchId}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {switchElement}
        </div>
      </div>
    )
  }

  // Default variant with label/description
  return (
    <div className="flex items-center space-x-2">
      {switchElement}
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={switchId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export { Switch, type SwitchProps }
