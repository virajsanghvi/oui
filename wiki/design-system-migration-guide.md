# OpenSearch Dashboards Migration Guide: EUI to @opensearch-project/oui (shadcn-based)

## Overview

This guide outlines the migration strategy from the current design system (@opensearch-project/oui, an EUI fork) to the new @opensearch-project/oui design system based on shadcn/ui.

**Key Migration Approach**: This migration will be **incremental and horizontal**, meaning:
- **Incremental**: Migrate one component at a time, not the entire system at once
- **Horizontal**: Both design systems will coexist during the transition period
- **Safe**: Rollback is possible at any point during the migration

## Current State Analysis

### Current Design System
- **Framework**: @opensearch-project/oui@1.21.0 (Elastic UI fork)
- **Import Pattern**: `import { EuiButton, EuiFlexGroup } from '@elastic/eui'`
- **Test Strategy**: Uses `data-test-subj` attributes (configured as default test ID in Jest)
- **Styling**: Built-in EUI theming and CSS-in-JS

### Target Design System
- **Framework**: @opensearch-project/oui (shadcn/ui based)
- **Styling**: Tailwind CSS + CSS variables
- **Architecture**: Composable, unstyled base components
- **Scoped CSS**: Allows coexistence with current system

## Migration Strategy

### Phase 1: Infrastructure Setup
1. **Install new design system alongside current**
   ```bash
   npm install @opensearch-project/oui
   ```

2. **Configure scoped CSS imports** to prevent conflicts
3. **Set up component alias system** for gradual migration
4. **Create migration tracking system**

### Phase 2: Component Mapping & Migration

## Component Mapping Reference

### Layout Components
| Current EUI Component | New OUI Component | Migration Notes |
|----------------------|------------------|-----------------|
| `EuiFlexGroup` | `Flex` | Update className props, maintain responsive behavior |
| `EuiFlexItem` | `FlexItem` or `div` | Consider if dedicated component needed |
| `EuiPage` | `Container` + custom layout | May need custom wrapper |
| `EuiPageBody` | `main` element + styling | Semantic HTML approach |
| `EuiFlyout` | `Sheet` or `Dialog` | Similar slide-out behavior |
| `EuiFlyoutHeader` | `SheetHeader` | Header section within Sheet |
| `EuiFlyoutBody` | `SheetContent` | Main content area |

### Form Components
| Current EUI Component | New OUI Component | Migration Notes |
|----------------------|------------------|-----------------|
| `EuiButton` | `Button` | Maintain variant and size props |
| `EuiButtonIcon` | `Button` + `Icon` | Combine button with icon child |
| `EuiCompressedFieldText` | `Input` | Standard input, adjust sizing via className |
| `EuiCompressedFormRow` | `FormField` | Form field wrapper with label |
| `EuiCompressedTextArea` | `Textarea` | Standard textarea component |
| `EuiCompressedSuperSelect` | `Select` | Dropdown selection |

### Data Display
| Current EUI Component | New OUI Component | Migration Notes |
|----------------------|------------------|-----------------|
| `EuiBasicTable` | `Table` + `TableHeader` + `TableBody` | More granular composition |
| `EuiInMemoryTable` | Custom wrapper around `Table` | Need to implement search/filter logic |
| `EuiCard` | `Card` + `CardHeader` + `CardContent` | Similar composition pattern |
| `EuiText` | `Typography` or native elements | Use semantic HTML when possible |
| `EuiTitle` | `Typography` variants | h1, h2, h3 with consistent styling |

### Interaction Components
| Current EUI Component | New OUI Component | Migration Notes |
|----------------------|------------------|-----------------|
| `EuiPopover` | `Popover` | Similar trigger/content pattern |
| `EuiContextMenu` | `DropdownMenu` | Menu items with actions |
| `EuiConfirmModal` | `AlertDialog` | Confirmation dialogs |
| `EuiEmptyPrompt` | Custom component | Combine `Card` + `Typography` + `Button` |

### Feedback Components
| Current EUI Component | New OUI Component | Migration Notes |
|----------------------|------------------|-----------------|
| `EuiCallOut` | `Alert` | Status messages with variants |
| `EuiLoadingSpinner` | `Spinner` or `Loading` | Loading states |
| `EuiToast` | `Toast` | Notification messages |

### Navigation Components
| Current EUI Component | New OUI Component | Migration Notes |
|----------------------|------------------|-----------------|
| `EuiBreadcrumb` | `Breadcrumb` | Navigation hierarchy |
| `EuiIcon` | `Icon` from icon library | Maintain icon names where possible |
| `EuiLink` | `Link` or `a` element | External/internal link handling |

## Migration Methodology

### 1. File-by-File Migration Process

#### Step 1: Identify Components
```bash
# Find all EUI imports in a file
grep -n "from '@elastic/eui'" src/path/to/file.tsx
```

#### Step 2: Create Migration Checklist for File
For each file, create a checklist:
- [ ] Map each EUI component to OUI equivalent
- [ ] Update import statements
- [ ] Migrate component props
- [ ] Preserve all `data-test-subj` attributes
- [ ] Update styling/className props
- [ ] Test functionality
- [ ] Update TypeScript types if needed

#### Step 3: Import Strategy
**Before:**
```typescript
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle
} from '@elastic/eui';
```

**After:**
```typescript
import { Button } from '@opensearch-project/oui/components/button';
import { Flex } from '@opensearch-project/oui/components/flex';
import { Typography } from '@opensearch-project/oui/components/typography';
```

### 2. Preserving Test IDs

**Critical Rule**: All `data-test-subj` attributes MUST be preserved exactly as they are.

**Why this is critical**: The `data-test-subj` attributes are used by automated tests throughout the OpenSearch Dashboards codebase. Changing or removing them will cause test failures and break CI/CD pipelines.

**Before:**
```typescript
<EuiButton data-test-subj="confirm-delete-button" color="danger">
  Delete
</EuiButton>
```

**After:**
```typescript
<Button data-test-subj="confirm-delete-button" variant="destructive">
  Delete
</Button>
```

### 3. Prop Mapping Patterns

#### Color/Variant Mapping
| EUI Prop | OUI Prop | Notes |
|----------|----------|-------|
| `color="primary"` | `variant="default"` | Default button style |
| `color="danger"` | `variant="destructive"` | Destructive actions |
| `color="ghost"` | `variant="ghost"` | Subtle button style |
| `fill={true}` | `variant="default"` | Solid button |
| `fill={false}` | `variant="outline"` | Outlined button |

#### Size Mapping
| EUI Size | OUI Size | Notes |
|----------|----------|-------|
| `size="s"` | `size="sm"` | Small size |
| `size="m"` | `size="default"` | Medium/default size |
| `size="l"` | `size="lg"` | Large size |

### 4. Complex Component Migration Examples

#### Example 1: Button Migration
**Before:**
```typescript
<EuiButton
  data-test-subj="workspace-detail-collaborator-table-actions"
  color="primary"
  fill={false}
  size="s"
  iconType="arrowDown"
  iconSide="right"
  onClick={handleClick}
>
  Actions
</EuiButton>
```

**After:**
```typescript
<Button
  data-test-subj="workspace-detail-collaborator-table-actions"
  variant="outline"
  size="sm"
  onClick={handleClick}
  className="flex items-center gap-2"
>
  Actions
  <ChevronDownIcon className="h-4 w-4" />
</Button>
```

#### Example 2: Table Migration
**Before:**
```typescript
<EuiInMemoryTable
  items={items}
  columns={columns}
  compressed={true}
  search={search}
  itemId="id"
  pagination={true}
  selection={selectionValue}
/>
```

**After:**
```typescript
<DataTable
  data={items}
  columns={columns}
  search={search}
  pagination={{
    enabled: true,
    pageSize: 10
  }}
  selection={selectionValue}
  className="text-sm" // equivalent to compressed
/>
```

#### Example 3: Modal Migration
**Before:**
```typescript
<EuiConfirmModal
  data-test-subj="delete-confirm-modal"
  title="Delete collaborator"
  onCancel={onCancel}
  onConfirm={onConfirm}
  cancelButtonText="Cancel"
  confirmButtonText="Confirm"
>
  <EuiText>Confirmation message</EuiText>
</EuiConfirmModal>
```

**After:**
```typescript
<AlertDialog>
  <AlertDialogTrigger asChild>
    {/* Trigger button */}
  </AlertDialogTrigger>
  <AlertDialogContent data-test-subj="delete-confirm-modal">
    <AlertDialogHeader>
      <AlertDialogTitle>Delete collaborator</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogDescription>
      Confirmation message
    </AlertDialogDescription>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Testing Strategy

### 1. Test ID Preservation Verification
Create a test utility to verify all existing test IDs are preserved:

```typescript
// Test utility to verify data-test-subj preservation
const verifyTestIds = (component: ReactWrapper) => {
  const originalTestIds = extractTestIds(originalComponent);
  const migratedTestIds = extractTestIds(component);

  expect(migratedTestIds).toEqual(originalTestIds);
};
```

### 2. Visual Regression Testing
- Take screenshots before migration
- Compare after migration to ensure visual consistency
- Use tools like Percy or Chromatic for automated visual testing

### 3. Functionality Testing
- All existing unit tests should continue to pass
- Integration tests should work without modification
- E2E tests should continue to function

## Migration Priorities

### High Priority Components (Most Used)
1. **Layout**: `EuiFlexGroup`, `EuiFlexItem`, `EuiPage`
2. **Buttons**: `EuiButton`, `EuiButtonIcon`
3. **Forms**: `EuiCompressedFormRow`, `EuiCompressedFieldText`
4. **Typography**: `EuiText`, `EuiTitle`
5. **Tables**: `EuiBasicTable`, `EuiInMemoryTable`

### Medium Priority Components
1. **Navigation**: `EuiContextMenu`, `EuiPopover`, `EuiBreadcrumb`
2. **Feedback**: `EuiCallOut`, `EuiEmptyPrompt`, `EuiLoadingSpinner`
3. **Containers**: `EuiFlyout`, `EuiModal`, `EuiCard`

### Low Priority Components (Specialized)
1. **Advanced**: `EuiAccordion`, `EuiCollapsibleNav`
2. **Data Viz**: Specific visualization components
3. **Complex Forms**: Multi-step forms, advanced inputs

## File Organization Strategy

### Directory Structure
```
src/
├── components/
│   ├── migrated/          # New OUI components
│   ├── legacy/            # Original EUI components (being phased out)
│   └── shared/            # Components used by both systems
├── styles/
│   ├── oui-theme.css      # New design system styles
│   └── eui-overrides.css  # EUI customizations (legacy)
```

### Migration Tracking
Create a migration status file:
```json
{
  "migration_status": {
    "src/plugins/workspace/public/components/workspace_form/": {
      "total_files": 15,
      "migrated_files": 3,
      "in_progress": 2,
      "priority": "high"
    }
  }
}
```

## Common Pitfalls and Solutions

### 1. CSS Class Conflicts
**Problem**: Both systems use similar class names
**Solution**: Use CSS scoping or namespace prefixes

### 2. TypeScript Type Conflicts
**Problem**: Component props have different types
**Solution**: Create type adapters or migration helpers

### 3. Event Handler Differences
**Problem**: Different event signature patterns
**Solution**: Create wrapper functions to normalize events

### 4. Icon System Differences
**Problem**: Different icon naming conventions
**Solution**: Create icon mapping dictionary

## Automation Tools

### 1. Codemod for Basic Migrations
```javascript
// Example codemod for simple component migrations
module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;

  return j(fileInfo.source)
    .find(j.ImportDeclaration, {
      source: { value: '@elastic/eui' }
    })
    .forEach(path => {
      // Transform import statements
    })
    .toSource();
};
```

### 2. Migration Validator Script
```bash
#!/bin/bash
# Validate migration completeness
echo "Checking for remaining EUI imports..."
grep -r "from '@elastic/eui'" src/ --include="*.tsx" --include="*.ts"

echo "Validating test-subj preservation..."
# Run test ID validation script
```

## Success Criteria

### Technical Requirements
- [ ] All existing `data-test-subj` attributes preserved
- [ ] All unit tests continue to pass
- [ ] No visual regressions detected
- [ ] Performance metrics maintained or improved
- [ ] TypeScript compilation successful
- [ ] Bundle size impact analyzed and acceptable

### Process Requirements
- [ ] Migration tracking system implemented
- [ ] Documentation updated for each migrated component
- [ ] Code review process includes migration checklist
- [ ] Rollback strategy defined for each migration

## Rollback Strategy

### Quick Rollback Process
1. Maintain git branches for each major migration
2. Feature flags for new components
3. Automated rollback scripts
4. Monitoring for issues post-migration

### Gradual Rollback
1. File-by-file rollback capability
2. Component-level feature toggles
3. A/B testing framework for comparison

## Next Steps

1. **Setup Phase**: Install new design system and configure build process
2. **Pilot Migration**: Choose 3-5 low-risk files for initial migration
3. **Tool Development**: Create codemods and validation scripts
4. **Team Training**: Document learnings from pilot migration
5. **Scaled Migration**: Apply to larger components and features
6. **Cleanup Phase**: Remove old EUI dependencies when migration complete

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [OpenSearch Dashboards Testing Conventions](./src/test_utils/public/helpers/find_test_subject.ts) <!-- TODO: Verify this file path exists -->
- [EUI Component Reference](https://eui.elastic.co)
- [Migration Status Tracking](./MIGRATION_STATUS.json) <!-- TODO: Create this file to track migration progress -->

---

**Note**: This migration should be treated as a major architectural change. Each step should be thoroughly tested and reviewed before proceeding to the next phase.