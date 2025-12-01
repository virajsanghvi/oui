import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  FileText,
  Search,
  Home,
  Mail,
} from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';
import { Button } from '@/components';

const meta: Meta<typeof Command> = {
  title: 'UI/Command',
  component: Command,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A command palette component for quickly finding and executing actions with keyboard navigation support.'),
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'The value of the command input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[450px]">
      <Command {...args}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

export const Dialog: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
        >
          Open Command Palette
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen} {...args}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Quick Actions">
              <CommandItem onSelect={() => setOpen(false)}>
                <FileText className="mr-2 h-4 w-4" />
                <span>New Document</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Search className="mr-2 h-4 w-4" />
                <span>Search Files</span>
                <CommandShortcut>⌘F</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Home className="mr-2 h-4 w-4" />
                <span>Go to Dashboard</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => setOpen(false)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Mail className="mr-2 h-4 w-4" />
                <span>Messages</span>
                <CommandShortcut>⌘M</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};

export const SearchableList: Story = {
  render: (args) => {
    const items = [
      { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
      { name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
      { name: 'Alice Brown', email: 'alice@example.com', role: 'Editor' },
      { name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin' },
      { name: 'Diana Davis', email: 'diana@example.com', role: 'Viewer' },
    ];

    return (
      <div className="w-[500px]">
        <Command {...args}>
          <CommandInput placeholder="Search team members..." />
          <CommandList>
            <CommandEmpty>No team members found.</CommandEmpty>
            <CommandGroup heading="Team Members">
              {items.map((item) => (
                <CommandItem key={item.email} value={`${item.name} ${item.email} ${item.role}`}>
                  <User className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">{item.email}</span>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs bg-secondary px-2 py-1 rounded">
                      {item.role}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Command component used as a searchable list with complex items.',
      },
    },
  },
};

export const MultipleGroups: Story = {
  render: (args) => (
    <div className="w-[450px]">
      <Command {...args}>
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="File">
            <CommandItem>
              <FileText className="mr-2 h-4 w-4" />
              <span>New File</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <FileText className="mr-2 h-4 w-4" />
              <span>Open File</span>
              <CommandShortcut>⌘O</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <FileText className="mr-2 h-4 w-4" />
              <span>Save File</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Edit">
            <CommandItem>
              <span>Copy</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Paste</span>
              <CommandShortcut>⌘V</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Cut</span>
              <CommandShortcut>⌘X</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="View">
            <CommandItem>
              <span>Zoom In</span>
              <CommandShortcut>⌘+</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Zoom Out</span>
              <CommandShortcut>⌘-</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Reset Zoom</span>
              <CommandShortcut>⌘0</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Command component with multiple groups and separators.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Command Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium mb-4">Basic Command</p>
              <Command className="w-full">
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Actions">
                    <CommandItem>
                      <Home className="mr-2 h-4 w-4" />
                      <span>Home</span>
                    </CommandItem>
                    <CommandItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-4">Command Dialog</p>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(true)}
                className="w-full"
              >
                Open Command Palette
              </Button>
              <CommandDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <CommandInput placeholder="Type a command..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Quick Actions">
                    <CommandItem onSelect={() => setDialogOpen(false)}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>New Document</span>
                      <CommandShortcut>⌘N</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => setDialogOpen(false)}>
                      <Search className="mr-2 h-4 w-4" />
                      <span>Search</span>
                      <CommandShortcut>⌘K</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </CommandDialog>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different command component configurations.',
      },
    },
  },
};