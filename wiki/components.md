# Component Development Guide

This guide covers how to add new components to the OUI package, following our established patterns and best practices.

## Component Architecture

Our component library follows a two-tier architecture:

- **`src/components/ui/`** - Base components from shadcn/ui with minimal modifications
- **`src/components/custom/`** - Enhanced components with OUI-specific styling and functionality

## Adding a New Component

### Step 1: Add Base Component with shadcn CLI

Use the shadcn CLI to add the base component to `src/components/ui/`:

```bash
npx shadcn@latest add [component-name]
```

This will:
- Install the base component in `src/components/ui/`
- Add any required dependencies to `package.json`
- Update your `components.json` configuration

**Example:**
```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add select
```

### Step 2: Create Custom Wrapper (If Needed)

If you need OUI-specific styling, behavior, or additional props, create a wrapper component in `src/components/custom/`:

```typescript
// src/components/custom/button.tsx
import * as React from "react"
import { Button as BaseButton, buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

function Button({
  className,
  loading = false,
  children,
  ...props
}: React.ComponentProps<typeof BaseButton> & {
  loading?: boolean
}) {
  return (
    <BaseButton
      className={cn("custom-button-styles", className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner className="mr-2 size-4" />}
      {children}
    </BaseButton>
  )
}

export { Button, buttonVariants }
```

### Step 3: Export Components

Add exports to `src/components/index.ts`:

```typescript
// For UI components (base shadcn components)
export * from './ui/accordion';
export * from './ui/alert-dialog';

// For custom components (OUI-enhanced wrappers)
export * from './custom/button';
export * from './custom/badge';
```

**Export Priority:**
- If both `ui/` and `custom/` versions exist, export the `custom/` version
- This ensures consumers get the enhanced OUI version by default

### Step 4: Create Storybook Story

Create a story file for your component following our established patterns. See the complete Storybook documentation:

- **[Storybook Template Pattern](./storybook-template-pattern.md)** - Complete story structure and examples
- **[Storybook Naming Conventions](./storybook-naming-conventions.md)** - File naming and story organization

## Development Workflow

### Local Development
Use Storybook for component development:

```bash
yarn start
```

This starts Storybook on `http://localhost:8030` where you can:
- Develop components in isolation
- Test different props and states
- Verify responsive behavior
- Check accessibility compliance

### Component Guidelines

#### UI Components (`src/components/ui/`)
- Keep minimal modifications to shadcn base components
- Only modify for critical bug fixes or compatibility
- Preserve original API and behavior

#### Custom Components (`src/components/custom/`)
- Add OUI-specific styling and branding
- Extend functionality (loading states, additional props)
- Maintain backward compatibility
- Follow existing patterns (data-slot attributes, consistent naming)

#### Styling Patterns
- Use Tailwind CSS classes
- Follow the existing design system tokens
- Use `cn()` utility for conditional classes
- Add `data-slot` attributes for component identification

#### TypeScript Patterns
- Extend base component props with intersection types
- Use `VariantProps` for variant-based components
- Provide proper JSDoc comments for props
- Export both component and variant functions when applicable

## Testing

### Manual Testing
- Test all variants and states in Storybook
- Verify responsive behavior
- Check keyboard navigation and accessibility
- Test with different content lengths

### Automated Testing
- Component tests are run with `yarn test`
- Ensure new components don't break existing functionality
- Add unit tests for complex custom logic

## Best Practices

### Component Design
- Keep components focused and single-purpose
- Provide sensible defaults
- Make customization easy but not required
- Follow established naming conventions

### Efficient Wrapping Patterns

When creating custom wrappers, follow these optimization patterns:

#### When not to wrap

If you are just updating an existing variant, and making no other changes, just update the component in the `src/componets/ui` directory as CVA does not have a mechanism to extend `cva()` responses.

#### Re-export Unchanged Components
If a component needs no customization, re-export it directly instead of wrapping:

```typescript
// ❌ Unnecessary wrapper
function CustomImage({ className, ...props }) {
  return <BaseImage className={className} {...props} />
}

// ✅ Direct re-export
export { Image } from "../ui/image"
```

#### Share Variant Definitions
When multiple components use the same variants, define them once:

```typescript
// ✅ Shared variants
const shapeVariants = cva("", {
  variants: {
    variant: {
      circular: "rounded-full",
      squared: "rounded-lg",
    },
  },
  defaultVariants: { variant: "circular" },
})

// Both components use the same variants
function Avatar({ variant, ...props }) {
  return <BaseAvatar className={cn(shapeVariants({ variant }))} {...props} />
}

function AvatarFallback({ variant, ...props }) {
  return <BaseAvatarFallback className={cn(shapeVariants({ variant }))} {...props} />
}
```

#### Mixed Export Pattern
Combine direct re-exports with custom wrappers in the same file:

```typescript
// Custom components with variants
export { Avatar, AvatarFallback }
// Direct re-export for unchanged component
export { AvatarImage } from "../ui/avatar"
```

### Documentation
- Write clear prop descriptions in argTypes
- Use realistic examples in stories
- Document any breaking changes or migration notes
- Include usage examples for complex components

### Performance
- Avoid unnecessary re-renders
- Use React.memo() for expensive components
- Keep bundle size impact minimal
- Lazy load heavy dependencies when possible

## Common Patterns

### Loading States
```typescript
// Add loading prop to custom components
loading?: boolean

// Show spinner when loading
{loading && <Spinner className="mr-2 size-4" />}
```

### Variant Systems
```typescript
// Use class-variance-authority for variants
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        sm: "small-classes",
        lg: "large-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### Forwarding Refs
```typescript
const Component = React.forwardRef<
  HTMLButtonElement,
  ComponentProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn("base-classes", className)}
      {...props}
    />
  )
})
```

## Troubleshooting

### Common Issues

**shadcn component not installing:**
- Check your `components.json` configuration
- Ensure you're in the project root directory
- Verify network connectivity for downloading components

**TypeScript errors:**
- Check that all required dependencies are installed
- Verify import paths are correct
- Ensure component props extend the correct base types

**Storybook not showing component:**
- Verify the story file is in the `stories/` directory
- Check that the component is properly exported
- Ensure the story follows the correct naming convention

**Styling not applying:**
- Check Tailwind CSS configuration
- Verify class names are correct
- Ensure CSS is being built and imported properly

### Getting Help

- Check existing components for patterns and examples
- Review the [Storybook documentation](./storybook-template-pattern.md)
- Test changes in Storybook before committing
- Follow the established code review process

This guide ensures consistency and quality across all components in the OUI package while maintaining the flexibility to enhance components with OUI-specific features.