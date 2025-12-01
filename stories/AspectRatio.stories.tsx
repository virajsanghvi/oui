import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';

const meta: Meta<typeof AspectRatio> = {
  title: 'UI/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A wrapper component that maintains a specific aspect ratio for its content, commonly used for responsive images and media.'),
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'The desired aspect ratio (width/height)',
    },
  },
  args: {
    ratio: 16 / 9,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[450px]">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  args: {
    ratio: 1,
  },
  render: (args) => (
    <div className="w-[300px]">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&dpr=2&q=80"
          alt="Photo by Pawel Czerwinski"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  args: {
    ratio: 3 / 4,
  },
  render: (args) => (
    <div className="w-[300px]">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&dpr=2&q=80"
          alt="Photo by Milad Fakurian"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
};

export const VideoRatio: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-[500px]">
      <AspectRatio {...args}>
        <div className="flex items-center justify-center w-full h-full bg-muted rounded-md">
          <div className="text-center">
            <div className="text-4xl mb-2">▶️</div>
            <p className="text-sm text-muted-foreground">Video Content</p>
            <p className="text-xs text-muted-foreground">16:9 Aspect Ratio</p>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Showcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Common Aspect Ratios</h3>
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          <div>
            <p className="text-sm font-medium mb-2">16:9 (Widescreen)</p>
            <AspectRatio ratio={16 / 9}>
              <div className="flex items-center justify-center w-full h-full bg-blue-100 rounded-md">
                <span className="text-sm text-blue-800">16:9</span>
              </div>
            </AspectRatio>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">4:3 (Standard)</p>
            <AspectRatio ratio={4 / 3}>
              <div className="flex items-center justify-center w-full h-full bg-green-100 rounded-md">
                <span className="text-sm text-green-800">4:3</span>
              </div>
            </AspectRatio>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">1:1 (Square)</p>
            <AspectRatio ratio={1}>
              <div className="flex items-center justify-center w-full h-full bg-purple-100 rounded-md">
                <span className="text-sm text-purple-800">1:1</span>
              </div>
            </AspectRatio>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">3:4 (Portrait)</p>
            <AspectRatio ratio={3 / 4}>
              <div className="flex items-center justify-center w-full h-full bg-orange-100 rounded-md">
                <span className="text-sm text-orange-800">3:4</span>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common aspect ratios used in web design and media.',
      },
    },
  },
};