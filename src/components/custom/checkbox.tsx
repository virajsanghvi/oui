import * as React from "react"
import { Checkbox as UICheckbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

function Checkbox({ className, ...props }: React.ComponentProps<typeof UICheckbox>) {
  return (
    <UICheckbox
      className={cn("[&_svg]:!text-white", className)}
      {...props}
    />
  )
}

export { Checkbox }
