import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Settings, User, CreditCard, LogOut, Plus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components';
import { Button } from '@/components';
import { Input } from '@/components';
import { Label } from '@/components';
import { Separator } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components';

const meta: Meta<typeof Popover> = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A popover component that displays floating content relative to a trigger element.'),
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Whether the popover is open',
    },
    modal: {
      control: { type: 'boolean' },
      description: 'Whether the popover is modal',
    },
  },
  args: {
    modal: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const UserMenu: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">shadcn</p>
            <p className="text-xs leading-none text-muted-foreground">
              m@example.com
            </p>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
        <Separator className="my-2" />
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'User menu popover with avatar and navigation options.',
      },
    },
  },
};

export const DatePicker: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date>();

    return (
      <Popover {...args}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[280px] justify-start text-left font-normal"
          >
            {date ? date.toDateString() : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Select Date</h4>
                <p className="text-sm text-muted-foreground">
                  Choose a date from the options below.
                </p>
              </div>
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDate(new Date())}
                  className="justify-start"
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setDate(tomorrow);
                  }}
                  className="justify-start"
                >
                  Tomorrow
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const nextWeek = new Date();
                    nextWeek.setDate(nextWeek.getDate() + 7);
                    setDate(nextWeek);
                  }}
                  className="justify-start"
                >
                  Next Week
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Date picker popover with preset date options.',
      },
    },
  },
};

export const AddItem: Story = {
  render: (args) => {
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
    const [newItem, setNewItem] = useState('');
    const [open, setOpen] = useState(false);

    const addItem = () => {
      if (newItem.trim()) {
        setItems([...items, newItem]);
        setNewItem('');
        setOpen(false);
      }
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Items</h4>
          <div className="space-y-1">
            {items.map((item, index) => (
              <div key={index} className="text-sm p-2 bg-muted rounded">
                {item}
              </div>
            ))}
          </div>
        </div>
        
        <Popover open={open} onOpenChange={setOpen} {...args}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Add New Item</h4>
                <p className="text-sm text-muted-foreground">
                  Enter the name for your new item.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="item-name">Item Name</Label>
                <Input
                  id="item-name"
                  placeholder="Enter item name..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addItem();
                    }
                  }}
                />
                <div className="flex gap-2">
                  <Button onClick={addItem} size="sm" className="flex-1">
                    Add Item
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setOpen(false)} 
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive popover for adding items to a list.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Popover Examples</h3>
        <div className="flex flex-wrap gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Basic Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-medium">Basic Popover</h4>
                <p className="text-sm text-muted-foreground">
                  This is a simple popover with some content.
                </p>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Settings</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure your preferences.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" className="col-span-2 h-8" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" className="col-span-2 h-8" />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">User Menu</Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Separator className="my-1" />
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different popover configurations and use cases.',
      },
    },
  },
};