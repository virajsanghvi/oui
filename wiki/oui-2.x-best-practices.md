# OUI 2.x Best Practices

> **Last Updated**: 2025-12-22
> **Status**: Initial draft

## Component Usage Guidelines

### General Principles

#### Composition Over Configuration
- Prefer composable components over complex prop APIs
- Use children and render props for flexibility
- Keep individual components focused and single-purpose

#### Consistent Naming
- Use semantic names that describe purpose, not appearance
- Follow the established pattern: `Button`, `Input`, `Typography`
- Avoid abbreviations unless widely understood

#### Accessibility First
- Always include proper ARIA labels and roles
- Maintain keyboard navigation support
- Ensure sufficient color contrast
- Test with screen readers

### Component-Specific Guidelines

#### Button Usage
```typescript
// ✅ Good - Clear semantic meaning
<Button variant="destructive" size="sm" onClick={handleDelete}>
  Delete Item
</Button>

// ❌ Avoid - Unclear visual styling approach
<Button color="red" fill="ghost" size="s">
  Delete Item
</Button>
```

#### Layout Components
```typescript
// ✅ Good - Clear flex intentions
<Flex direction="column" gap="lg" align="start">
  <Typography variant="h2">Title</Typography>
  <Typography variant="body">Content</Typography>
</Flex>

// ❌ Avoid - Generic div with complex className
<div className="flex flex-col gap-4 items-start">
  <Typography variant="h2">Title</Typography>
  <Typography variant="body">Content</Typography>
</div>
```

#### Form Components
```typescript
// ✅ Good - Explicit form structure
<FormField>
  <FormLabel>Email Address</FormLabel>
  <Input
    type="email"
    data-test-subj="email-input"
    required
  />
  <FormDescription>We'll never share your email</FormDescription>
</FormField>

// ❌ Avoid - Implicit relationships
<Label>Email</Label>
<Input type="email" />
<Text size="sm">We'll never share your email</Text>
```

### Testing Best Practices

#### Test ID Strategy
- Always preserve existing `data-test-subj` attributes during migration
- Use descriptive test IDs that indicate component purpose
- Keep test IDs stable across component changes

```typescript
// ✅ Good - Descriptive and stable
<Button data-test-subj="workspace-save-button">Save</Button>

// ❌ Avoid - Generic or implementation-dependent
<Button data-test-subj="btn-1">Save</Button>
```

#### Component Testing
```typescript
// ✅ Good - Test behavior, not implementation
test('saves workspace when save button is clicked', () => {
  render(<WorkspaceForm />);

  fireEvent.click(screen.getByTestId('workspace-save-button'));

  expect(mockSaveWorkspace).toHaveBeenCalled();
});

// ❌ Avoid - Testing internal state
test('button has correct className', () => {
  render(<Button variant="primary">Save</Button>);

  expect(screen.getByRole('button')).toHaveClass('btn-primary');
});
```

### Styling Best Practices

#### Theme Consistency
- Use design tokens for colors, spacing, and typography
- Avoid hardcoded values in component styles
- Respect the design system's visual hierarchy

#### Responsive Design
- Consider mobile-first approach
- Test components at different screen sizes
- Use appropriate breakpoints for layout changes

```typescript
// ✅ Good - Responsive with semantic breakpoints
<Flex
  direction={{ base: 'column', md: 'row' }}
  gap={{ base: 'sm', md: 'lg' }}
>
  <div>Content</div>
</Flex>

// ❌ Avoid - Fixed layout assumptions
<Flex direction="row" gap="lg">
  <div>Content</div>
</Flex>
```

### Performance Guidelines

#### Bundle Size Optimization
- Import components individually to enable tree-shaking
- Avoid importing entire component libraries
- Monitor bundle size impact of new components

```typescript
// ✅ Good - Individual imports
import { Button } from '@opensearch-project/oui/components/button';
import { Input } from '@opensearch-project/oui/components/input';

// ❌ Avoid - Barrel imports that prevent tree-shaking
import { Button, Input } from '@opensearch-project/oui';
```

#### Render Performance
- Use React.memo for expensive components
- Minimize re-renders with proper dependency arrays
- Consider virtualization for large lists

### Migration Best Practices

#### Incremental Migration
- Migrate components file-by-file, not all at once
- Test thoroughly after each component migration
- Keep both systems working during transition

#### Data Test Subject Preservation
<!-- TODO: Verify this pattern with actual migration testing -->
```typescript
// CRITICAL: Always preserve data-test-subj exactly
// ✅ Correct migration
// Before: <EuiButton data-test-subj="save-workspace">Save</EuiButton>
// After:  <Button data-test-subj="save-workspace">Save</Button>

// ❌ Never do this - breaks existing tests
// <Button testId="save-workspace">Save</Button>
```

#### Prop Mapping Strategy
- Create mapping tables before starting migration
- Document any behavioral differences
- Add migration notes for future reference

### Common Pitfalls

#### Avoid These Anti-Patterns

**Over-abstracting Components**
```typescript
// ❌ Avoid - Too many configuration options
<SuperButton
  variant="primary"
  size="medium"
  iconPosition="left"
  iconType="save"
  loadingState="idle"
  tooltipText="Save your work"
  confirmDialog={true}
/>

// ✅ Better - Composable and clear
<Button variant="default" size="md">
  <SaveIcon className="h-4 w-4 mr-2" />
  Save
</Button>
```

**CSS-in-JS Overuse**
```typescript
// ❌ Avoid - Inline styles for design system values
<Button style={{ backgroundColor: '#0066cc', padding: '8px 16px' }}>
  Save
</Button>

// ✅ Better - Use design tokens
<Button variant="primary" size="md">
  Save
</Button>
```

**Inconsistent State Management**
```typescript
// ❌ Avoid - Mixed state patterns
const [isOpen, setIsOpen] = useState(false);
const [loading] = useLoading();

// ✅ Better - Consistent patterns
const { isOpen, onOpen, onClose } = useDisclosure();
const { isLoading, mutate } = useMutation();
```

### Documentation Standards

#### Component Documentation
- Include usage examples for all major props
- Document accessibility considerations
- Provide migration guides from EUI equivalents
- Show common usage patterns

#### Code Comments
- Explain complex business logic, not obvious code
- Include TODO comments for known technical debt
- Reference relevant issues or design decisions

## Migration Checklist

### Before Migration
- [ ] Read existing component and understand its usage
- [ ] Identify all EUI components used
- [ ] Document all `data-test-subj` attributes
- [ ] Check for component dependencies

### During Migration
- [ ] Update imports to new component library
- [ ] Map props according to component reference
- [ ] Preserve all `data-test-subj` attributes exactly
- [ ] Update styling using design tokens
- [ ] Test component functionality

### After Migration
- [ ] Run all tests to ensure nothing is broken
- [ ] Visual test for design consistency
- [ ] Update documentation if needed
- [ ] Mark component as migrated in tracking system

## Troubleshooting Guide

### Common Issues

#### Styling Conflicts
**Problem**: New components don't match existing design
**Solution**: Use CSS scoping or verify design token usage

#### Test Failures
**Problem**: Tests fail after component migration
**Solution**: Verify `data-test-subj` preservation and check for API changes

#### Performance Regressions
**Problem**: Page loads slower after migration
**Solution**: Check bundle size increase and optimize imports

#### Accessibility Issues
**Problem**: Screen readers or keyboard navigation broken
**Solution**: Review ARIA attributes and focus management

### Getting Help

- Check the [Component Mapping Reference](./oui-1.x-2.x-component-mapping-reference.md)
- Review the [Design System Migration Guide](./design-system-migration-guide.md)
- For AI assistance, use the [AI Assistant Migration Guide](./ai-assistant-migration-guide.md)

---

**📝 Note**: This document will be updated based on real migration experiences and learnings.