import { cn } from "@/lib/utils"
import {
  ButtonGroup as UIButtonGroup,
  ButtonGroupText,
  ButtonGroupSeparator as UIButtonGroupSeparator
} from "@/components/ui/button-group"

function ButtonGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <UIButtonGroup
      orientation="horizontal"
      className={cn(className)}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  ...props
}: Omit<React.ComponentProps<typeof UIButtonGroupSeparator>, "orientation">) {
  return (
    <UIButtonGroupSeparator
      orientation="vertical"
      className={cn(className)}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
}
