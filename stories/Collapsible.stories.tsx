import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components';
import { Button } from '@/components';



const meta: Meta<typeof Collapsible> = {
    title: 'UI/Collapsible',
    component: Collapsible,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A collapsible component that allows content to be expanded and collapsed with smooth animations.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        open: {
            control: { type: 'boolean' },
            description: 'Whether the collapsible is open',
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the collapsible is disabled',
        },
        onOpenChange: {
            action: 'openChanged',
            description: 'Callback fired when the open state changes',
        },
    },
    args: {
        open: false,
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args: any) => {
        const [isOpen, setIsOpen] = useState(args.open || false);
        
        useEffect(() => {
            setIsOpen(args.open || false);
        }, [args.open]);

        return (
            <div className="w-[350px]">
                <Collapsible open={isOpen} onOpenChange={setIsOpen} disabled={args.disabled}>
                    <div className="flex items-center justify-between space-x-4 px-4">
                        <h4 className="text-sm font-semibold">
                            @peduarte starred 3 repositories
                        </h4>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-9 p-0">
                                <ChevronsUpDown className="h-4 w-4 text-foreground" />
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <div className="rounded-md border px-4 py-3 font-mono text-sm mb-2">
                        @radix-ui/primitives
                    </div>
                    <CollapsibleContent className="space-y-2">
                        <div className="rounded-md border px-4 py-3 font-mono text-sm">
                            @radix-ui/colors
                        </div>
                        <div className="rounded-md border px-4 py-3 font-mono text-sm">
                            @stitches/react
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        );
    },
};

export const Navigation: Story = {
    render: (args: any) => {
        const [openSections, setOpenSections] = useState<string[]>(['dashboard']);

        const toggleSection = (section: string) => {
            setOpenSections(prev =>
                prev.includes(section)
                    ? prev.filter(s => s !== section)
                    : [...prev, section]
            );
        };

        const navItems = [
            {
                id: 'dashboard',
                title: 'Dashboard',
                items: ['Overview', 'Analytics', 'Reports']
            },
            {
                id: 'projects',
                title: 'Projects',
                items: ['Active Projects', 'Archived', 'Templates']
            },
            {
                id: 'team',
                title: 'Team',
                items: ['Members', 'Roles', 'Permissions']
            },
            {
                id: 'settings',
                title: 'Settings',
                items: ['General', 'Security', 'Integrations']
            }
        ];

        return (
            <div className="w-[280px] border rounded-lg p-4">
                <h3 className="font-semibold mb-4">Navigation</h3>
                <div className="space-y-2">
                    {navItems.map((section) => (
                        <Collapsible
                            key={section.id}
                            open={openSections.includes(section.id)}
                            onOpenChange={() => toggleSection(section.id)}
                            disabled={args.disabled}
                        >
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-left hover:bg-accent rounded-md">
                                <span className="font-medium">{section.title}</span>
                                <ChevronsUpDown className="h-4 w-4 text-foreground" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="ml-4 mt-1">
                                <div className="space-y-1">
                                    {section.items.map((item) => (
                                        <button
                                            key={item}
                                            className="block w-full text-left p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Navigation menu with collapsible sections for organizing hierarchical content.',
            },
        },
    },
};
