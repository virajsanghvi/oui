# Component Mapping Reference: EUI → @opensearch-project/oui

> **📋 Living Document**: This reference is updated based on real migration experience.
> **Last Updated**: 2025-12-22
> **Status**: Initial draft - to be refined through actual migration

## How to Update This Document

As you migrate components, please:
1. ✅ **Confirm mappings work** - Update status column
2. 📝 **Add learnings** - Note any issues or gotchas
3. 🔄 **Update examples** - Add real-world migration examples
4. 📊 **Track progress** - Mark components as migrated

### Update Format
```markdown
| Component | Status | Last Updated | Notes |
|-----------|--------|--------------|-------|
| EuiButton | ✅ Confirmed | 2025-12-08 | Works well, icon pattern needs adjustment |
```

## Quick Lookup Table

### Buttons & Actions
| EUI Component | OUI Component | Status | Key Prop Changes | Migration Notes |
|---------------|---------------|--------|------------------|-----------------|
| `EuiButton` | `Button` | 🔄 Testing | `color="primary"` → `variant="default"`<br/>`color="danger"` → `variant="destructive"`<br/>`fill={true}` → `variant="default"`<br/>`fill={false}` → `variant="outline"` | <!-- TODO: Verify icon handling patterns with actual migration --> |
| `EuiButtonIcon` | `Button` + Icon | 📋 Planned | `iconType="name"` → `<NameIcon />` | <!-- TODO: Create icon library mapping from EUI to OUI icons --> |
| `EuiLink` | `Link` or `<a>` | 📋 Planned | Similar props | <!-- TODO: Verify external vs internal link handling patterns --> |

### Layout & Structure
| EUI Component | OUI Component | Status | Key Prop Changes | Migration Notes |
|---------------|---------------|--------|------------------|-----------------|
| `EuiFlexGroup` | `Flex` | 🔄 Testing | `direction="row"` → `direction="row"`<br/>`alignItems="center"` → `align="center"`<br/>`gutterSize="m"` → `gap="md"` | <!-- TODO: Test responsive behavior and breakpoint handling --> |
| `EuiFlexItem` | `div` with classes | 🔄 Testing | `grow={false}` → `className="flex-shrink-0"`<br/>`grow={true}` → `className="flex-1"` | <!-- TODO: Test for CSS specificity conflicts with existing styles --> |
| `EuiSpacer` | `div` with margin | 📋 Planned | `size="m"` → `className="my-4"` | <!-- TODO: Verify spacing scale mappings (xs, s, m, l, xl) to Tailwind classes --> |
| `EuiPage` | `Container` + layout | 📋 Planned | Custom layout needed | <!-- TODO: Define page layout patterns and header/sidebar composition --> |
| `EuiPageBody` | `<main>` + classes | 📋 Planned | Semantic HTML approach | <!-- TODO: Review accessibility implications of semantic HTML approach --> |

### Typography & Content
| EUI Component | OUI Component | Status | Key Prop Changes | Migration Notes |
|---------------|---------------|--------|------------------|-----------------|
| `EuiText` | `Typography` | 📋 Planned | `size="s"` → `size="sm"`<br/>`color="subdued"` → `variant="muted"` | <!-- TODO: Verify all color variant mappings (subdued, secondary, etc.) --> |
| `EuiTitle` | `Typography` | 📋 Planned | `size="m"` → `variant="h2"`<br/>`size="s"` → `variant="h3"` | <!-- TODO: Ensure semantic heading hierarchy is maintained --> |

### Forms & Inputs
| EUI Component | OUI Component | Status | Key Prop Changes | Migration Notes |
|---------------|---------------|--------|------------------|-----------------|
| `EuiCompressedFieldText` | `Input` | 📋 Planned | `compressed` → `className="text-sm"` | <!-- TODO: Document form validation and error state patterns --> |
| `EuiCompressedFormRow` | `FormField` | 📋 Planned | `label` → `<FormLabel>`<br/>`helpText` → `<FormDescription>` | <!-- TODO: Define error state handling and validation patterns --> |

### Data Display
| EUI Component | OUI Component | Status | Key Prop Changes | Migration Notes |
|---------------|---------------|--------|------------------|-----------------|
| `EuiBasicTable` | `Table` + composition | 📋 Planned | `columns` → manual header/cell structure | <!-- TODO: Implement sorting and pagination patterns for composed table --> |
| `EuiInMemoryTable` | Custom `DataTable` | ❓ Complex | Needs wrapper implementation | <!-- TODO: Implement search/filter logic and optimize performance --> |
| `EuiCard` | `Card` + composition | 📋 Planned | Composition pattern | <!-- TODO: Define card variants and action button patterns --> |

### Navigation & Interaction
| EUI Component | OUI Component | Status | Key Prop Changes | Migration Notes |
|---------------|---------------|--------|------------------|-----------------|
| `EuiPopover` | `Popover` | 📋 Planned | Composition pattern | <!-- TODO: Test positioning and resolve z-index conflicts --> |
| `EuiContextMenu` | `DropdownMenu` | 📋 Planned | Flatter structure | <!-- TODO: Design nested menu patterns for complex menus --> |

### Overlays & Modals
| EUI Component | OUI Component | Status | Key Prop Changes | Migration Notes |
|---------------|---------------|--------|------------------|-----------------|
| `EuiFlyout` | `Sheet` | 📋 Planned | Controlled state pattern | <!-- TODO: Test size variants and positioning for different screen sizes --> |
| `EuiConfirmModal` | `AlertDialog` | 📋 Planned | More composition required | <!-- TODO: Implement button action patterns and verify focus management --> |

## Status Legend
- ✅ **Confirmed**: Successfully migrated and tested
- 🔄 **Testing**: Currently being validated
- 📋 **Planned**: Mapped but not yet tested
- ❓ **Complex**: Needs custom implementation
- ❌ **Blocked**: Issues found, needs resolution
- 🔍 **Researching**: Component mapping unclear

## Migration Learning Log

### Add entries as you learn:

#### [Date] - Component Name
- **Issue**: What problem was encountered
- **Solution**: How it was resolved
- **Update needed**: What documentation needs updating

---

### Template for New Learnings:
```markdown
#### 2025-12-08 - EuiButton
- **Issue**: Icon positioning inconsistent
- **Solution**: Use flex classes and proper icon sizing
- **Update needed**: Update icon handling in main guide
```

## Real Migration Examples

### [Placeholder - will be updated with real migration examples from actual implementations]

#### EuiButton → Button
**Before:**
```typescript
// Add real example from actual file migration
```

**After:**
```typescript
// Add real migrated code
```

**Learnings:**
- What worked well
- What needed adjustment
- Any gotchas discovered

## Component Priority Queue

Based on usage frequency in codebase:

### Next to Migrate (High Priority)
1. **EuiButton** - 127 usages found <!-- TODO: Verify current usage count -->
2. **EuiFlexGroup** - 89 usages found <!-- TODO: Verify current usage count -->
3. **EuiText** - 67 usages found <!-- TODO: Verify current usage count -->
4. **EuiFlexItem** - 64 usages found <!-- TODO: Verify current usage count -->

### Medium Priority
5. **EuiTitle** - 45 usages found <!-- TODO: Verify current usage count -->
6. **EuiSpacer** - 38 usages found <!-- TODO: Verify current usage count -->

### Low Priority (Specialized)
- Complex table components
- Advanced form components
- Visualization-specific components

## Update Process

### When Migrating a Component:
1. **Before migration**: Check this reference for mapping
2. **During migration**: Note any deviations or issues
3. **After migration**: Update the status and add learnings
4. **Document patterns**: Add real examples for future use

### Monthly Review Process:
- Review all "Testing" status items
- Promote successful patterns to "Confirmed"
- Update priority queue based on migration progress
- Refine mappings based on accumulated experience

## Known Issues Tracker

### [Placeholder - will be populated during actual migrations]

#### Component Name - Issue Description
- **Impact**: High/Medium/Low
- **Workaround**: Temporary solution
- **Status**: Open/In Progress/Resolved
- **Resolution**: How it was fixed

---

**🔄 Next Update Scheduled**: After first 5 component migrations
**📝 Update Instructions**: See [AI Assistant Migration Guide](./AI_ASSISTANT_MIGRATION_GUIDE.md) section on documentation updates