import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Pagination as BasePagination,
  PaginationContent as BasePaginationContent,
  PaginationItem as BasePaginationItem,
  PaginationLink as BasePaginationLink,
  PaginationPrevious as BasePaginationPrevious,
  PaginationNext as BasePaginationNext,
  PaginationEllipsis as BasePaginationEllipsis,
} from "../ui/pagination"

// Override PaginationLink completely to avoid buttonVariants conflicts
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: React.ComponentProps<typeof BasePaginationLink>) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        // Base styling with rounded rectangle shape (not circular)
        "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        // Size variants - using rounded-md for rectangular shape
        size === "icon" ? "size-9 rounded-md" : "h-9 px-4 py-2 rounded-md",
        // Custom pagination styling to match Figma design
        isActive
          ? "bg-slate-50 border border-slate-200 text-slate-950 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50"
          : "text-slate-950 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-50 dark:hover:bg-slate-800",
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof BasePaginationPrevious>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon className="size-4" />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof BasePaginationNext>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon className="size-4" />
    </PaginationLink>
  )
}



function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<typeof BasePaginationEllipsis>) {
  return (
    <BasePaginationEllipsis
      className={cn("text-slate-950 dark:text-slate-50", className)}
      {...props}
    />
  )
}

export {
  // Re-exported unchanged components
  BasePagination as Pagination,
  BasePaginationContent as PaginationContent,
  BasePaginationItem as PaginationItem,
  // Customized components
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
