import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '@/components';

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
    decorative: {
      control: { type: 'boolean' },
      description: 'Whether the separator is purely decorative or semantic',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the separator',
    },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default separator
export const Default: Story = {
  render: (args) => (
    <div className="w-64 space-y-4">
      <div className="text-sm font-medium">Navigation Menu</div>
      <Separator {...args} />
      <div className="text-sm text-muted-foreground">Settings and preferences</div>
    </div>
  ),
};

// Horizontal separator
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Account Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account preferences and security settings.</p>
      </div>
      <Separator {...args} />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">Choose how you want to be notified about updates.</p>
      </div>
    </div>
  ),
};

// Vertical separator
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex h-32 items-center space-x-4">
      <div className="text-center">
        <div className="text-2xl font-bold">1,234</div>
        <div className="text-sm text-muted-foreground">Total Users</div>
      </div>
      <Separator {...args} />
      <div className="text-center">
        <div className="text-2xl font-bold">567</div>
        <div className="text-sm text-muted-foreground">Active Sessions</div>
      </div>
      <Separator {...args} />
      <div className="text-center">
        <div className="text-2xl font-bold">89%</div>
        <div className="text-sm text-muted-foreground">Uptime</div>
      </div>
    </div>
  ),
};

// Non-decorative separator (semantic)
export const Semantic: Story = {
  args: {
    orientation: 'horizontal',
    decorative: false,
  },
  render: (args) => (
    <div className="w-80 space-y-4">
      <section>
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <div className="space-y-2">
          <div className="text-sm">Name: John Smith</div>
          <div className="text-sm">Email: john.smith@example.com</div>
        </div>
      </section>
      <Separator {...args} />
      <section>
        <h2 className="text-xl font-semibold mb-2">Contact Details</h2>
        <div className="space-y-2">
          <div className="text-sm">Phone: +1 (555) 123-4567</div>
          <div className="text-sm">Address: 123 Main St, City, State</div>
        </div>
      </section>
    </div>
  ),
};

// In navigation context
export const InNavigation: Story = {
  render: () => (
    <div className="w-64 bg-card border rounded-lg p-4">
      <nav className="space-y-2">
        <div className="text-sm font-medium text-foreground">Dashboard</div>
        <div className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Overview</div>
        <div className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Analytics</div>
        <div className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Reports</div>
        
        <Separator className="my-3" />
        
        <div className="text-sm font-medium text-foreground">Projects</div>
        <div className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Active Projects</div>
        <div className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Archived</div>
        <div className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Templates</div>
        
        <Separator className="my-3" />
        
        <div className="text-sm font-medium text-foreground">Settings</div>
        <div className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Account</div>
        <div className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Preferences</div>
      </nav>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Separators used in navigation menus to group related items.',
      },
    },
  },
};

// In content sections
export const InContent: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <article className="space-y-4">
        <h1 className="text-2xl font-bold">Getting Started Guide</h1>
        <p className="text-muted-foreground">
          Welcome to our platform! This guide will help you get up and running quickly.
        </p>
        
        <Separator />
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Step 1: Create Your Account</h2>
          <p className="text-sm text-muted-foreground">
            Start by creating your account with a valid email address and secure password.
          </p>
        </section>
        
        <Separator />
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Step 2: Set Up Your Profile</h2>
          <p className="text-sm text-muted-foreground">
            Complete your profile information to personalize your experience.
          </p>
        </section>
        
        <Separator />
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Step 3: Explore Features</h2>
          <p className="text-sm text-muted-foreground">
            Take a tour of the main features and discover what you can accomplish.
          </p>
        </section>
      </article>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Separators used to divide content sections in articles and documentation.',
      },
    },
  },
};

// Showcase all orientations and contexts
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Horizontal separators */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Horizontal Separators</h3>
        <div className="w-80 space-y-4">
          <div className="text-sm">Content above separator</div>
          <Separator orientation="horizontal" />
          <div className="text-sm text-muted-foreground">Content below separator</div>
        </div>
      </div>
      
      {/* Vertical separators */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Vertical Separators</h3>
        <div className="flex h-20 items-center space-x-4">
          <div className="text-sm">Left content</div>
          <Separator orientation="vertical" />
          <div className="text-sm">Middle content</div>
          <Separator orientation="vertical" />
          <div className="text-sm">Right content</div>
        </div>
      </div>
      
      {/* Different contexts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Contexts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card with separators */}
          <div className="border rounded-lg p-4 space-y-3">
            <h4 className="font-medium">Project Status</h4>
            <Separator />
            <div className="text-sm text-muted-foreground">Last updated: 2 hours ago</div>
            <div className="text-sm text-muted-foreground">Status: In Progress</div>
          </div>
          
          {/* Stats with vertical separators */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-lg font-semibold">42</div>
                <div className="text-xs text-muted-foreground">Tasks</div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-center">
                <div className="text-lg font-semibold">18</div>
                <div className="text-xs text-muted-foreground">Done</div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-center">
                <div className="text-lg font-semibold">24</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All separator orientations and common usage contexts displayed together.',
      },
    },
  },
};