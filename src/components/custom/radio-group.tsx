"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { RadioGroup as BaseRadioGroup, RadioGroupItem as BaseRadioGroupItem } from "../ui/radio-group"

const radioGroupVariants = cva("grid", {
  variants: {
    variant: {
      default: "gap-3",
      box: "gap-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const radioGroupItemVariants = cva(
  "border text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full shadow-xs",
        box: "group border-input hover:border-violet-700 data-[state=checked]:border-violet-700 data-[state=checked]:bg-violet-700/5 flex items-start gap-3 p-3 rounded-lg cursor-pointer w-full text-left",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface RadioGroupProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Root>,
  VariantProps<typeof radioGroupVariants> { }

function RadioGroup({
  className,
  variant,
  ...props
}: RadioGroupProps) {
  // For default variant, use the base UI component
  if (variant === "default" || !variant) {
    return (
      <BaseRadioGroup
        className={cn(radioGroupVariants({ variant }), className)}
        {...props}
      />
    )
  }

  // For custom variants, use the primitive directly
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(radioGroupVariants({ variant }), className)}
      {...props}
    />
  )
}

interface RadioGroupItemProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item>,
  VariantProps<typeof radioGroupItemVariants> {
  children?: React.ReactNode
}

function RadioGroupItem({
  className,
  variant,
  children,
  ...props
}: RadioGroupItemProps) {
  // For box variant, use custom implementation
  if (variant === "box") {
    return (
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        className={cn(radioGroupItemVariants({ variant }), className)}
        {...props}
      >
        <div className="aspect-square size-4 shrink-0 rounded-full border border-input flex items-center justify-center relative group-data-[state=checked]:border-violet-700 group-data-[state=checked]:bg-violet-700">
          <RadioGroupPrimitive.Indicator
            data-slot="radio-group-indicator"
            className="relative flex items-center justify-center"
          >
            <div className="size-2 rounded-full bg-white" />
          </RadioGroupPrimitive.Indicator>
        </div>
        {children && (
          <div className="flex flex-col gap-1.5 flex-1">
            {children}
          </div>
        )}
      </RadioGroupPrimitive.Item>
    )
  }

  // For default variant, extend the base UI component
  return (
    <BaseRadioGroupItem
      className={cn(radioGroupItemVariants({ variant }), className)}
      {...props}
    />
  )
}

export { RadioGroup, RadioGroupItem }
