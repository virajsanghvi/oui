import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarImage, AvatarFallback } from '@/components';
import { User, UserCheck, Crown, Shield } from 'lucide-react';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the avatar',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default avatar with image
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

// Squared avatar variant
export const Squared: Story = {
  render: () => (
    <Avatar variant="squared">
      <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
      <AvatarFallback variant="squared">CN</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar with squared corners using the squared variant.',
      },
    },
  },
};

// Avatar with fallback (no image)
export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar displaying fallback initials when no image is available.',
      },
    },
  },
};

// Variant comparison
export const VariantComparison: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Circular Avatar" />
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
        <p className="text-xs mt-2 text-muted-foreground">Circular</p>
      </div>
      <div className="text-center">
        <Avatar variant="squared">
          <AvatarImage src="https://github.com/shadcn.png" alt="Squared Avatar" />
          <AvatarFallback variant="squared">SQ</AvatarFallback>
        </Avatar>
        <p className="text-xs mt-2 text-muted-foreground">Squared</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between circular (default) and squared avatar variants.',
      },
    },
  },
};

// Avatar with icon fallback
export const WithIconFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>
        <User className="size-4" />
      </AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar using an icon as fallback when no image or initials are available.',
      },
    },
  },
};

// Different sizes
export const Small: Story = {
  render: () => (
    <Avatar className="size-6">
      <AvatarImage src="https://github.com/shadcn.png" alt="Small Avatar" />
      <AvatarFallback className="text-xs">SM</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Small avatar (24px) suitable for compact layouts.',
      },
    },
  },
};

export const Medium: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="Medium Avatar" />
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Medium avatar (32px) - the default size.',
      },
    },
  },
};

export const Large: Story = {
  render: () => (
    <Avatar className="size-12">
      <AvatarImage src="https://github.com/shadcn.png" alt="Large Avatar" />
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Large avatar (48px) for profile pages and prominent displays.',
      },
    },
  },
};

export const ExtraLarge: Story = {
  render: () => (
    <Avatar className="size-16">
      <AvatarImage src="https://github.com/shadcn.png" alt="Extra Large Avatar" />
      <AvatarFallback className="text-lg">XL</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Extra large avatar (64px) for detailed profile views.',
      },
    },
  },
};

// User profile examples
export const UserProfiles: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Sarah Chen" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="Alex Rodriguez" />
        <AvatarFallback>AR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>
          <User className="size-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Collection of user profile avatars with different fallback states.',
      },
    },
  },
};

// Status indicators with avatars
export const WithStatusIndicators: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Online User" />
          <AvatarFallback>ON</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 border-2 border-background rounded-full"></div>
      </div>
      <div className="relative">
        <Avatar>
          <AvatarFallback>AW</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-yellow-500 border-2 border-background rounded-full"></div>
      </div>
      <div className="relative">
        <Avatar>
          <AvatarFallback>OF</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-gray-400 border-2 border-background rounded-full"></div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars with status indicators showing online, away, and offline states.',
      },
    },
  },
};

// Team member avatars with roles
export const TeamMembers: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Team Lead" />
          <AvatarFallback>TL</AvatarFallback>
        </Avatar>
        <div className="absolute -top-1 -right-1 size-4 bg-yellow-500 rounded-full flex items-center justify-center">
          <Crown className="size-2.5 text-white" />
        </div>
      </div>
      <div className="relative">
        <Avatar>
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div className="absolute -top-1 -right-1 size-4 bg-blue-500 rounded-full flex items-center justify-center">
          <Shield className="size-2.5 text-white" />
        </div>
      </div>
      <Avatar>
        <AvatarFallback>DV</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="Developer" />
        <AvatarFallback>
          <UserCheck className="size-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Team member avatars with role indicators (lead, admin, regular members).',
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-4">Circular Avatars</p>
        <div className="flex items-end gap-4">
          <div className="text-center">
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="Small" />
              <AvatarFallback className="text-xs">XS</AvatarFallback>
            </Avatar>
            <p className="text-xs mt-2 text-muted-foreground">Small (24px)</p>
          </div>
          <div className="text-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Default" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <p className="text-xs mt-2 text-muted-foreground">Default (32px)</p>
          </div>
          <div className="text-center">
            <Avatar className="size-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="Large" />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <p className="text-xs mt-2 text-muted-foreground">Large (48px)</p>
          </div>
          <div className="text-center">
            <Avatar className="size-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="Extra Large" />
              <AvatarFallback className="text-lg">LG</AvatarFallback>
            </Avatar>
            <p className="text-xs mt-2 text-muted-foreground">XL (64px)</p>
          </div>
          <div className="text-center">
            <Avatar className="size-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="Extra Extra Large" />
              <AvatarFallback className="text-xl">XL</AvatarFallback>
            </Avatar>
            <p className="text-xs mt-2 text-muted-foreground">XXL (80px)</p>
          </div>
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-4">Squared Avatars</p>
        <div className="flex items-end gap-4">
          <div className="text-center">
            <Avatar variant="squared" className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="Small" />
              <AvatarFallback variant="squared" className="text-xs">XS</AvatarFallback>
            </Avatar>
            <p className="text-xs mt-2 text-muted-foreground">Small (24px)</p>
          </div>
          <div className="text-center">
            <Avatar variant="squared">
              <AvatarImage src="https://github.com/shadcn.png" alt="Default" />
              <AvatarFallback variant="squared">SM</AvatarFallback>
            </Avatar>
            <p className="text-xs mt-2 text-muted-foreground">Default (32px)</p>
          </div>
          <div className="text-center">
            <Avatar variant="squared" className="size-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="Large" />
              <AvatarFallback variant="squared">MD</AvatarFallback>
            </Avatar>
            <p className="text-xs mt-2 text-muted-foreground">Large (48px)</p>
          </div>
          <div className="text-center">
            <Avatar variant="squared" className="size-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="Extra Large" />
              <AvatarFallback variant="squared" className="text-lg">LG</AvatarFallback>
            </Avatar>
            <p className="text-xs mt-2 text-muted-foreground">XL (64px)</p>
          </div>
          <div className="text-center">
            <Avatar variant="squared" className="size-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="Extra Extra Large" />
              <AvatarFallback variant="squared" className="text-xl">XL</AvatarFallback>
            </Avatar>
            <p className="text-xs mt-2 text-muted-foreground">XXL (80px)</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available avatar sizes displayed for both circular and squared variants.',
      },
    },
  },
};

// Avatar groups - overlapping avatars
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex items-center">
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 border-2 border-background">
        <AvatarImage src="https://github.com/vercel.png" alt="User 2" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 border-2 border-background">
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 border-2 border-background">
        <AvatarFallback>U4</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Group of overlapping avatars commonly used to show team members or collaborators.',
      },
    },
  },
};

// Avatar group with count indicator
export const AvatarGroupWithCount: Story = {
  render: () => (
    <div className="flex items-center">
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="Sarah Chen" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 border-2 border-background">
        <AvatarImage src="https://github.com/vercel.png" alt="Alex Rodriguez" />
        <AvatarFallback>AR</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 border-2 border-background">
        <AvatarFallback>MJ</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 border-2 border-background bg-muted">
        <AvatarFallback className="text-xs font-medium">+5</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar group with a count indicator showing additional members not displayed.',
      },
    },
  },
};



// Different sized avatar groups
export const AvatarGroupSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Small Group</p>
        <div className="flex items-center">
          <Avatar className="size-6 border-2 border-background">
            <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
            <AvatarFallback className="text-xs">U1</AvatarFallback>
          </Avatar>
          <Avatar className="size-6 -ml-1.5 border-2 border-background">
            <AvatarFallback className="text-xs">U2</AvatarFallback>
          </Avatar>
          <Avatar className="size-6 -ml-1.5 border-2 border-background">
            <AvatarFallback className="text-xs">U3</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Medium Group (Default)</p>
        <div className="flex items-center">
          <Avatar className="border-2 border-background">
            <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar className="-ml-2 border-2 border-background">
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar className="-ml-2 border-2 border-background">
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Large Group</p>
        <div className="flex items-center">
          <Avatar className="size-12 border-2 border-background">
            <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar className="size-12 -ml-3 border-2 border-background">
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar className="size-12 -ml-3 border-2 border-background">
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar groups in different sizes with appropriate spacing adjustments. Groups always use circular avatars for better overlap.',
      },
    },
  },
};

// Fallback variations showcase
export const FallbackVariations: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <p className="text-xs mt-2 text-muted-foreground">Initials</p>
      </div>
      <div className="text-center">
        <Avatar>
          <AvatarFallback>
            <User className="size-4" />
          </AvatarFallback>
        </Avatar>
        <p className="text-xs mt-2 text-muted-foreground">User Icon</p>
      </div>
      <div className="text-center">
        <Avatar>
          <AvatarFallback>
            <UserCheck className="size-4" />
          </AvatarFallback>
        </Avatar>
        <p className="text-xs mt-2 text-muted-foreground">Verified Icon</p>
      </div>
      <div className="text-center">
        <Avatar>
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            JD
          </AvatarFallback>
        </Avatar>
        <p className="text-xs mt-2 text-muted-foreground">Custom Style</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different fallback options including initials, icons, and custom styling.',
      },
    },
  },
};