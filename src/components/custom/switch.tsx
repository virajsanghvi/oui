"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Switch as BaseSwitch } from "../ui/switch"

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
  extends React.ComponentProps<typeof BaseSwitch>,
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
    <BaseSwitch
      id={switchId}
      className={className}
      {...props}
    />
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
