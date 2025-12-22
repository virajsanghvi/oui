# AI Assistant Migration Guide: EUI to @opensearch-project/oui

## Quick Reference for AI Assistants

This guide provides step-by-step instructions for AI assistants helping with the OpenSearch Dashboards design system migration from EUI to @opensearch-project/oui (shadcn-based).

## Before You Start

### Prerequisites Checklist
- [ ] Read the main [Design System Migration Guide](./design-system-migration-guide.md)
- [ ] Confirm @opensearch-project/oui is installed and configured
- [ ] Understand the file being migrated (read it first!)
- [ ] Identify all `data-test-subj` attributes (NEVER remove these)

### Critical Rules (Non-Negotiable)
1. **NEVER remove or modify `data-test-subj` attributes** - These are used by automated tests and removing them will break the test suite
2. **ALWAYS preserve existing functionality** - Users should not notice any behavioral changes after migration
3. **MAINTAIN TypeScript types and props** - Ensure the component API remains the same for other developers
4. **TEST after each component migration** - Run tests immediately to catch issues before they compound
5. **Follow the component mapping table strictly** - Don't improvise mappings; use the documented patterns

## Step-by-Step Migration Process

This process should be followed for each file you migrate to ensure consistency and prevent breaking existing functionality.

### Step 1: Analysis Phase

#### 1.1 Read the Target File
```bash
# Always start by reading the file to understand its current structure
cat src/path/to/component.tsx
```

**Why this matters**: Understanding the existing code prevents accidental functionality loss and helps identify all dependencies.

#### 1.2 Identify EUI Components
Look for imports like:
```typescript
import { EuiButton, EuiFlexGroup, EuiText } from '@elastic/eui';
```

#### 1.3 Create Component Inventory
For each file, list:
- All EUI components used
- Their props and usage patterns
- Any `data-test-subj` attributes
- Complex composition patterns

#### 1.4 Check for Test Files
```bash
# Look for associated test files
find . -name "*component_name*.test.*" -o -name "*component_name*.spec.*"
```

### Step 2: Planning Phase

#### 2.1 Create Migration Plan
Use the mapping table to plan each component migration:

**Template:**
```
File: src/path/to/component.tsx
EUI Components → OUI Components:
- EuiButton → Button
- EuiFlexGroup → Flex
- EuiText → Typography

Critical data-test-subj attributes:
- "confirm-delete-button"
- "workspace-detail-actions"

Potential challenges:
- Complex table structure
- Custom event handlers
```

#### 2.2 Identify Dependencies
Check if the component is used by other files:
```bash
# Find usages of this component
grep -r "ComponentName" src/ --include="*.tsx" --include="*.ts"
```

### Step 3: Migration Execution

#### 3.1 Update Import Statements

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

#### 3.2 Component-by-Component Migration

**Migration Template for Each Component:**

1. **Identify the component usage**
2. **Map to new component using reference table**
3. **Update props according to mapping**
4. **Preserve `data-test-subj` exactly**
5. **Test the change**

### Step 4: Common Component Migrations

#### 4.1 Button Migration

**EUI Button:**
```typescript
<EuiButton
  data-test-subj="save-button"
  color="primary"
  fill={true}
  size="s"
  iconType="save"
  onClick={handleSave}
>
  Save Changes
</EuiButton>
```

**OUI Button:**
```typescript
<Button
  data-test-subj="save-button"
  variant="default"
  size="sm"
  onClick={handleSave}
  className="flex items-center gap-2"
>
  <SaveIcon className="h-4 w-4" />
  Save Changes
</Button>
```

**Key Changes:**
- `color="primary"` + `fill={true}` → `variant="default"`
- `size="s"` → `size="sm"`
- `iconType="save"` → `<SaveIcon className="h-4 w-4" />`
- Icons become child elements, not props

#### 4.2 Layout Migration

**EUI Layout:**
```typescript
<EuiFlexGroup direction="row" alignItems="center" gutterSize="m">
  <EuiFlexItem grow={false}>
    <EuiTitle size="m">
      <h2>Page Title</h2>
    </EuiTitle>
  </EuiFlexItem>
  <EuiFlexItem>
    <EuiText>Description text</EuiText>
  </EuiFlexItem>
</EuiFlexGroup>
```

**OUI Layout:**
```typescript
<Flex direction="row" align="center" gap="md" className="w-full">
  <div className="flex-shrink-0">
    <Typography variant="h2" size="lg">
      Page Title
    </Typography>
  </div>
  <div className="flex-1">
    <Typography variant="body">
      Description text
    </Typography>
  </div>
</Flex>
```

**Key Changes:**
- `EuiFlexGroup` → `Flex` with similar props
- `EuiFlexItem grow={false}` → `div` with `flex-shrink-0`
- `EuiFlexItem` (growing) → `div` with `flex-1`
- `EuiTitle` → `Typography` with variant
- `gutterSize` → `gap` prop

#### 4.3 Form Migration

**EUI Form:**
```typescript
<EuiCompressedFormRow label="Username" helpText="Enter your username">
  <EuiCompressedFieldText
    data-test-subj="username-input"
    value={username}
    onChange={handleUsernameChange}
    placeholder="Enter username"
  />
</EuiCompressedFormRow>
```

**OUI Form:**
```typescript
<FormField>
  <FormLabel>Username</FormLabel>
  <Input
    data-test-subj="username-input"
    value={username}
    onChange={handleUsernameChange}
    placeholder="Enter username"
    className="text-sm"
  />
  <FormDescription>Enter your username</FormDescription>
</FormField>
```

**Key Changes:**
- `EuiCompressedFormRow` → `FormField` wrapper
- `label` prop → `FormLabel` component
- `helpText` → `FormDescription` component
- `EuiCompressedFieldText` → `Input`
- Compressed styling via `className="text-sm"`

#### 4.4 Table Migration

**EUI Table:**
```typescript
<EuiBasicTable
  items={items}
  columns={columns}
  pagination={pagination}
  selection={selection}
  compressed={true}
/>
```

**OUI Table:**
```typescript
<Table className="text-sm">
  <TableHeader>
    {columns.map(col => (
      <TableHead key={col.field}>{col.name}</TableHead>
    ))}
  </TableHeader>
  <TableBody>
    {items.map(item => (
      <TableRow key={item.id}>
        {columns.map(col => (
          <TableCell key={col.field}>
            {col.render ? col.render(item[col.field], item) : item[col.field]}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
</Table>
```

**Key Changes:**
- More granular composition with separate header/body/row/cell components
- `compressed={true}` → `className="text-sm"`
- Manual iteration over items and columns
- Custom pagination component needed

### Step 5: Complex Pattern Migrations

#### 5.1 Modal/Flyout Migration

**EUI Flyout:**
```typescript
<EuiFlyout onClose={onClose} size="s">
  <EuiFlyoutHeader>
    <EuiTitle size="m">
      <h2>Settings</h2>
    </EuiTitle>
  </EuiFlyoutHeader>
  <EuiFlyoutBody>
    <p>Flyout content here</p>
  </EuiFlyoutBody>
</EuiFlyout>
```

**OUI Sheet:**
```typescript
<Sheet>
  <SheetTrigger asChild>
    {/* Trigger element */}
  </SheetTrigger>
  <SheetContent side="right" className="w-96">
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
    </SheetHeader>
    <div className="py-4">
      <p>Flyout content here</p>
    </div>
  </SheetContent>
</Sheet>
```

**Key Changes:**
- Declarative trigger pattern vs imperative
- More explicit size control
- Manual padding for content area

#### 5.2 Context Menu Migration

**EUI Context Menu:**
```typescript
<EuiPopover
  button={<EuiButtonIcon iconType="boxesHorizontal" />}
  isOpen={isOpen}
  closePopover={() => setIsOpen(false)}
>
  <EuiContextMenu
    initialPanelId={0}
    panels={[
      {
        id: 0,
        items: [
          { name: 'Edit', onClick: handleEdit },
          { name: 'Delete', onClick: handleDelete }
        ]
      }
    ]}
  />
</EuiPopover>
```

**OUI Dropdown Menu:**
```typescript
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm">
      <MoreHorizontalIcon className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={handleEdit}>
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleDelete}>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Key Changes:**
- Simplified structure without panel concepts
- Direct menu items vs panel configuration
- Declarative trigger pattern

### Step 6: Validation Phase

#### 6.1 Test ID Verification
```bash
# Check that all data-test-subj attributes are preserved
grep -n "data-test-subj" original_file.tsx > original_test_ids.txt
grep -n "data-test-subj" migrated_file.tsx > migrated_test_ids.txt
diff original_test_ids.txt migrated_test_ids.txt
```

#### 6.2 Functionality Testing
Run these checks after migration:

```bash
# 1. TypeScript compilation
npm run type-check

# 2. Unit tests
npm run test -- --testPathPattern=path/to/component

# 3. Build verification
npm run build

# 4. Linting
npm run lint
```

#### 6.3 Visual Verification
- Compare before/after screenshots
- Check responsive behavior
- Verify theme consistency
- Test dark mode if applicable

### Step 7: Documentation

#### 7.1 Update Component Documentation
Add migration notes to component:
```typescript
/**
 * MIGRATION NOTE: Migrated from EuiButton to OUI Button
 * - Preserved all data-test-subj attributes
 * - Updated color="primary" to variant="default"
 * - Icons now use child elements instead of iconType prop
 * Date: YYYY-MM-DD
 */
```

#### 7.2 Update Migration Tracking
Update the migration status file with completed components.

## Common Issues and Solutions

### Issue 1: Missing Icons
**Problem**: `iconType="save"` doesn't exist in new system
**Solution**:
```typescript
// Old
<EuiButton iconType="save">Save</EuiButton>

// New
<Button><SaveIcon className="h-4 w-4 mr-2" />Save</Button>
```

### Issue 2: Complex Table Props
**Problem**: EUI table props don't map directly
**Solution**: Create custom table component wrapper that maintains EUI-like API

### Issue 3: CSS Class Conflicts
**Problem**: Both systems have conflicting styles
**Solution**: Use CSS modules or scoped styles

### Issue 4: Event Handler Signatures
**Problem**: Different event signatures between systems
**Solution**:
```typescript
// Create adapter functions
const handleEuiEvent = (e: EuiEvent) => {
  const standardEvent = adaptEventSignature(e);
  handleStandardEvent(standardEvent);
};
```

## Automated Helpers

### Quick Migration Script Template
```bash
#!/bin/bash
# Quick migration helper
FILE=$1
echo "Migrating $FILE..."

# 1. Backup original
cp "$FILE" "$FILE.backup"

# 2. Update imports (basic replacement)
sed -i 's/@elastic\/eui/@virajsanghvi\/oui/g' "$FILE"

# 3. Basic component renames
sed -i 's/EuiButton/Button/g' "$FILE"
sed -i 's/EuiText/Typography/g' "$FILE"

echo "Basic migration complete. Manual review required!"
```

### Validation Script
```bash
#!/bin/bash
# Validate migration
FILE=$1
echo "Validating migration for $FILE..."

# Check for remaining EUI imports
if grep -q "@elastic/eui" "$FILE"; then
    echo "❌ Still has EUI imports"
else
    echo "✅ No EUI imports found"
fi

# Check data-test-subj preservation
ORIGINAL_COUNT=$(grep -c "data-test-subj" "$FILE.backup" 2>/dev/null || echo 0)
MIGRATED_COUNT=$(grep -c "data-test-subj" "$FILE")

if [ "$ORIGINAL_COUNT" -eq "$MIGRATED_COUNT" ]; then
    echo "✅ Test IDs preserved ($MIGRATED_COUNT)"
else
    echo "❌ Test ID count mismatch: $ORIGINAL_COUNT → $MIGRATED_COUNT"
fi
```

## Migration Checklist Template

For each file migration, use this checklist:

```markdown
## Migration Checklist: [File Name]

### Pre-migration
- [ ] File read and understood
- [ ] EUI components identified: ________________
- [ ] Test IDs documented: ____________________
- [ ] Dependencies checked
- [ ] Test files located

### Migration
- [ ] Imports updated
- [ ] Components migrated per mapping table
- [ ] Props updated correctly
- [ ] All data-test-subj attributes preserved
- [ ] TypeScript types maintained
- [ ] Styling/classes updated

### Validation
- [ ] TypeScript compilation passes
- [ ] Unit tests pass
- [ ] Visual comparison done
- [ ] Functionality verified
- [ ] Performance acceptable

### Documentation
- [ ] Migration notes added to component
- [ ] Status tracker updated
- [ ] Known issues documented
```

## Quick Reference Cards

### Most Common Migrations
```
EuiButton → Button
EuiFlexGroup → Flex
EuiFlexItem → div with flex classes
EuiText → Typography
EuiTitle → Typography with variant
EuiPopover → Popover
EuiContextMenu → DropdownMenu
EuiBasicTable → Table composition
EuiFlyout → Sheet
EuiModal → Dialog
```

### Most Common Prop Changes
```
color="primary" → variant="default"
color="danger" → variant="destructive"
fill={true} → variant="default"
fill={false} → variant="outline"
size="s" → size="sm"
size="m" → size="default"
size="l" → size="lg"
iconType="name" → <NameIcon />
compressed={true} → className="text-sm"
```

Remember: When in doubt, refer to the main migration guide and always preserve `data-test-subj` attributes!