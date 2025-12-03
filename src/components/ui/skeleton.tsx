import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("oui:bg-accent oui:animate-pulse oui:rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
