import type { Meta, StoryObj } from '@storybook/react';
import { CalendarDays } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components';
import { Button } from '@/components';

import { createDocsWithWarning } from './utils/warning-banner';import { Avatar, AvatarFallback, AvatarImage } from '@/components';

const meta: Meta<typeof HoverCard> = {
  title: 'UI/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A hover card component that displays additional content when hovering over a trigger element.'),
  },
  tags: ['autodocs'],
  argTypes: {
    openDelay: {
      control: { type: 'number' },
      description: 'The delay in milliseconds before the hover card opens',
    },
    closeDelay: {
      control: { type: 'number' },
      description: 'The delay in milliseconds before the hover card closes',
    },
  },
  args: {
    openDelay: 700,
    closeDelay: 300,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const UserProfile: Story = {
  render: (args) => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Hover over the usernames to see their profiles:
      </p>
      <div className="space-y-2">
        <p className="text-sm">
          Great work on the project{' '}
          <HoverCard {...args}>
            <HoverCardTrigger asChild>
              <Button variant="link" className="p-0 h-auto font-semibold">
                @johndoe
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">John Doe</h4>
                  <p className="text-sm">
                    Senior Frontend Developer at Acme Corp. Passionate about React and TypeScript.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-muted-foreground">
                      Joined March 2020
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          ! The new features look amazing.
        </p>
        
        <p className="text-sm">
          Thanks to{' '}
          <HoverCard {...args}>
            <HoverCardTrigger asChild>
              <Button variant="link" className="p-0 h-auto font-semibold">
                @janesmith
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&dpr=2&q=80" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Jane Smith</h4>
                  <p className="text-sm">
                    UX Designer with 8+ years of experience. Loves creating intuitive user experiences.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-muted-foreground">
                      Joined January 2019
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          {' '}for the excellent design work.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover cards showing user profiles in context.',
      },
    },
  },
};

export const ProductInfo: Story = {
  render: (args) => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Hover over the product names to see details:
      </p>
      <div className="space-y-2">
        <p className="text-sm">
          Our{' '}
          <HoverCard {...args}>
            <HoverCardTrigger asChild>
              <Button variant="link" className="p-0 h-auto font-semibold">
                Pro Plan
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Pro Plan</h4>
                <p className="text-sm text-muted-foreground">
                  Perfect for growing teams and businesses.
                </p>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">$29/month</div>
                  <ul className="text-xs space-y-1">
                    <li>• Up to 10 team members</li>
                    <li>• 100GB storage</li>
                    <li>• Priority support</li>
                    <li>• Advanced analytics</li>
                  </ul>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          {' '}includes everything you need for your team.
        </p>
        
        <p className="text-sm">
          Upgrade from{' '}
          <HoverCard {...args}>
            <HoverCardTrigger asChild>
              <Button variant="link" className="p-0 h-auto font-semibold">
                Basic Plan
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Basic Plan</h4>
                <p className="text-sm text-muted-foreground">
                  Great for individuals and small projects.
                </p>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">$9/month</div>
                  <ul className="text-xs space-y-1">
                    <li>• Up to 3 team members</li>
                    <li>• 10GB storage</li>
                    <li>• Email support</li>
                    <li>• Basic analytics</li>
                  </ul>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          {' '}to get more features.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hover cards showing product information and pricing.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Hover Card Examples</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">User Profile</p>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">@shadcn</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@shadcn</h4>
                    <p className="text-sm">
                      The React Framework – created and maintained by @vercel.
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                      <span className="text-xs text-muted-foreground">
                        Joined December 2021
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">Product Information</p>
            <p className="text-sm">
              Check out our{' '}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="p-0 h-auto">
                    Premium Plan
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Premium Plan</h4>
                    <p className="text-sm text-muted-foreground">
                      Everything you need for professional use.
                    </p>
                    <div className="text-2xl font-bold">$49/month</div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              {' '}for advanced features.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different hover card use cases and configurations.',
      },
    },
  },
};