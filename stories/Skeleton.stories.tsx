import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@/components';
import { Card, CardContent, CardHeader } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A skeleton component that shows placeholder content while data is loading.'),
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" {...args} />
      <Skeleton className="h-4 w-[200px]" {...args} />
    </div>
  ),
};

export const UserCard: Story = {
  render: (args) => (
    <div className="w-[350px]">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" {...args} />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" {...args} />
          <Skeleton className="h-4 w-[200px]" {...args} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loading state for a user card with avatar.',
      },
    },
  },
};

export const ArticleCard: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <Card>
        <CardHeader>
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" {...args} />
            <Skeleton className="h-3 w-1/2" {...args} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-[200px] w-full rounded-md" {...args} />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" {...args} />
              <Skeleton className="h-3 w-full" {...args} />
              <Skeleton className="h-3 w-2/3" {...args} />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Skeleton className="h-6 w-6 rounded-full" {...args} />
              <Skeleton className="h-3 w-20" {...args} />
              <Skeleton className="h-3 w-16" {...args} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loading state for an article card with image and metadata.',
      },
    },
  },
};

export const UserProfile: Story = {
  render: (args) => (
    <div className="w-[300px] space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-24 w-24 rounded-full" {...args} />
        <div className="space-y-2 text-center">
          <Skeleton className="h-6 w-32 mx-auto" {...args} />
          <Skeleton className="h-4 w-24 mx-auto" {...args} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" {...args} />
          <Skeleton className="h-8 w-full" {...args} />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" {...args} />
          <Skeleton className="h-8 w-full" {...args} />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" {...args} />
          <Skeleton className="h-20 w-full" {...args} />
        </div>
      </div>

      <div className="flex space-x-2">
        <Skeleton className="h-10 flex-1" {...args} />
        <Skeleton className="h-10 flex-1" {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loading state for a user profile form.',
      },
    },
  },
};

export const DataTable: Story = {
  render: (args) => (
    <div className="w-[600px] space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" {...args} />
        <Skeleton className="h-8 w-[100px]" {...args} />
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-4">
          <Skeleton className="h-4 w-full" {...args} />
          <Skeleton className="h-4 w-full" {...args} />
          <Skeleton className="h-4 w-full" {...args} />
          <Skeleton className="h-4 w-full" {...args} />
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4">
            <Skeleton className="h-6 w-full" {...args} />
            <Skeleton className="h-6 w-full" {...args} />
            <Skeleton className="h-6 w-full" {...args} />
            <Skeleton className="h-6 w-full" {...args} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-[100px]" {...args} />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8" {...args} />
          <Skeleton className="h-8 w-8" {...args} />
          <Skeleton className="h-8 w-8" {...args} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loading state for a data table with pagination.',
      },
    },
  },
};

export const Dashboard: Story = {
  render: (args) => (
    <div className="w-[800px] space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-[200px]" {...args} />
        <Skeleton className="h-4 w-[300px]" {...args} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" {...args} />
                <Skeleton className="h-8 w-[80px]" {...args} />
                <Skeleton className="h-3 w-[120px]" {...args} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" {...args} />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" {...args} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[120px]" {...args} />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton className="h-8 w-8 rounded-full" {...args} />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-3 w-full" {...args} />
                    <Skeleton className="h-3 w-2/3" {...args} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loading state for a complete dashboard layout.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Skeleton Examples</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-4">Basic Skeletons</p>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-4">User Card</p>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-4">Content Card</p>
            <div className="w-[300px] space-y-3">
              <Skeleton className="h-[120px] w-full rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
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
        story: 'Different skeleton loading patterns and layouts.',
      },
    },
  },
};