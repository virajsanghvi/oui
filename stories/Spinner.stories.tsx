import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from '@/components';
import { Button } from '@/components';
import { Badge } from '@/components';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components';

import { Progress } from '@/components';

const meta: Meta<typeof Spinner> = {
  title: 'UI/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the spinner',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default spinner
export const Default: Story = {
  args: {},
};

// Size variants
export const Small: Story = {
  args: {
    className: 'size-3',
  },
};

export const Medium: Story = {
  args: {
    className: 'size-4',
  },
};

export const Large: Story = {
  args: {
    className: 'size-6',
  },
};

export const ExtraLarge: Story = {
  args: {
    className: 'size-8',
  },
};

// Color variants
export const Primary: Story = {
  args: {
    className: 'text-primary',
  },
};

export const Secondary: Story = {
  args: {
    className: 'text-muted-foreground',
  },
};

export const Destructive: Story = {
  args: {
    className: 'text-destructive',
  },
};

// Contextual usage examples
export const InButton: Story = {
  render: () => (
    <Button loading>Loading...</Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button with loading prop - the easiest way to add a spinner to any button.',
      },
    },
  },
};

export const InCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Loading Data</CardTitle>
        <CardDescription>Please wait while we fetch your information</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-8">
        <Spinner className="size-6" />
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner displayed in a card while content is loading.',
      },
    },
  },
};

export const InlineWithText: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner className="size-4" />
      <span>Processing your request...</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner displayed inline with descriptive text.',
      },
    },
  },
};

// Showcase stories
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-3" />
        <span className="text-xs text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-4" />
        <span className="text-xs text-muted-foreground">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6" />
        <span className="text-xs text-muted-foreground">Large</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-8" />
        <span className="text-xs text-muted-foreground">Extra Large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available spinner sizes displayed together.',
      },
    },
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6 text-foreground" />
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6 text-primary" />
        <span className="text-xs text-muted-foreground">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6 text-destructive" />
        <span className="text-xs text-muted-foreground">Destructive</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner in different colors for various contexts.',
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button loading>Saving Changes</Button>
        <Button variant="outline" loading>Uploading File</Button>
        <Button variant="destructive" loading>Deleting Item</Button>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Spinner className="size-4" />
          <span>Syncing data...</span>
        </div>
        <div className="flex items-center gap-2">
          <Spinner className="size-4 text-primary" />
          <span>Connecting to server...</span>
        </div>
        <div className="flex items-center gap-2">
          <Spinner className="size-4 text-destructive" />
          <span>Retrying connection...</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common loading states using the new loading prop for buttons and standalone spinners.',
      },
    },
  },
};

export const ButtonVariantsWithSpinner: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">Default Size Buttons</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button loading>Submit</Button>
          <Button variant="secondary" loading>Secondary</Button>
          <Button variant="outline" loading>Outline</Button>
          <Button variant="destructive" loading>Remove</Button>
          <Button variant="ghost" loading>Ghost</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">Small Size Buttons</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" loading>Submit</Button>
          <Button variant="secondary" size="sm" loading>Secondary</Button>
          <Button variant="outline" size="sm" loading>Outline</Button>
          <Button variant="destructive" size="sm" loading>Remove</Button>
          <Button variant="ghost" size="sm" loading>Ghost</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">Large Size Buttons</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" loading>Submit</Button>
          <Button variant="secondary" size="lg" loading>Secondary</Button>
          <Button variant="outline" size="lg" loading>Outline</Button>
          <Button variant="destructive" size="lg" loading>Remove</Button>
          <Button variant="ghost" size="lg" loading>Ghost</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">Icon Buttons</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon" loading />
          <Button variant="secondary" size="icon" loading />
          <Button variant="outline" size="icon" loading />
          <Button variant="destructive" size="icon" loading />
          <Button variant="ghost" size="icon" loading />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of the loading prop in all button variants and sizes, automatically including spinners.',
      },
    },
  },
};

export const BadgeStyleButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-muted-foreground">Badge Components with Spinners</h4>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="default">
          <Spinner className="mr-1 size-3" />
          Badge
        </Badge>
        <Badge variant="outline">
          <Spinner className="mr-1 size-3" />
          Badge
        </Badge>
        <Badge variant="destructive">
          <Spinner className="mr-1 size-3" />
          Badge
        </Badge>
        <Badge variant="secondary">
          <Spinner className="mr-1 size-3" />
          Badge
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge components with spinners, matching the Figma design examples for loading badges.',
      },
    },
  },
};

// Modal-style examples from Figma
export const DownloadingModal: Story = {
  render: () => (
    <Card className="w-96 mx-auto">
      <CardHeader>
        <CardTitle>Downloading...</CardTitle>
        <CardDescription>
          Please wait while we download your files
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <Spinner className="size-8" />
        </div>
        <Progress value={65} className="w-full" />
        <div className="text-center text-sm text-muted-foreground">
          65% complete (2.1 MB of 3.2 MB)
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modal-style card with spinner and progress bar for download operations, matching Figma design.',
      },
    },
  },
};

export const ProcessingModal: Story = {
  render: () => (
    <Card className="w-80 mx-auto">
      <CardHeader>
        <CardTitle>Processing request</CardTitle>
        <CardDescription>
          This may take a few moments...
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center py-8">
        <Spinner className="size-6" />
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simple processing modal with centered spinner.',
      },
    },
  },
};

export const SpinnerWithProgress: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Spinner className="size-5" />
              <div className="flex-1">
                <div className="text-sm font-medium">Uploading files...</div>
                <div className="text-xs text-muted-foreground">3 of 12 files</div>
              </div>
            </div>
            <Progress value={25} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Spinner className="size-5 text-primary" />
              <div className="flex-1">
                <div className="text-sm font-medium">Installing packages...</div>
                <div className="text-xs text-muted-foreground">npm install in progress</div>
              </div>
            </div>
            <Progress value={78} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner combined with progress bars for detailed loading feedback.',
      },
    },
  },
};

export const TableLoadingStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <h3 className="font-medium">Data Table</h3>
        </div>
        <div className="p-8 text-center">
          <Spinner className="size-6 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Loading data...</p>
        </div>
      </div>
      
      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <h3 className="font-medium">Search Results</h3>
        </div>
        <div className="p-8 text-center">
          <Spinner className="size-5 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Searching...</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner states for tables and data loading scenarios.',
      },
    },
  },
};

export const MiniSpinners: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" disabled>
          <Spinner className="mr-2 size-3" />
          Save
        </Button>
        <Button variant="ghost" size="sm" disabled>
          <Spinner className="mr-2 size-3" />
          Delete
        </Button>
        <Button variant="ghost" size="sm" disabled>
          <Spinner className="mr-2 size-3" />
          Update
        </Button>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <Spinner className="size-3" />
          <span>Auto-saving...</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Spinner className="size-3 text-green-600" />
          <span>Synced</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Spinner className="size-3 text-orange-600" />
          <span>Pending...</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Small spinners for compact UI elements and status indicators.',
      },
    },
  },
};

