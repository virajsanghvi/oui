import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const meta: Meta<typeof Dialog> = {
    title: 'UI/Dialog',
    component: Dialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        open: {
            control: { type: 'boolean' },
            description: 'Whether the dialog is open',
        },
        onOpenChange: {
            action: 'openChanged',
            description: 'Callback when the open state changes',
        },
        modal: {
            control: { type: 'boolean' },
            description: 'Whether the dialog is modal',
            table: {
                defaultValue: { summary: 'true' },
            },
        },
    },
    args: {
        modal: true,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogDescription>
                        This is a dialog description.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A basic dialog matching the Figma design with standard title and description.',
            },
        },
    },
};

export const ConfirmationDialog: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Delete Account</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A confirmation dialog for destructive actions with clear warning messaging.',
            },
        },
    },
};

export const FormDialog: Story = {
    render: () => {
        const [name, setName] = useState('');
        const [username, setUsername] = useState('');

        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Open Form Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogDescription>
                            This is a dialog description.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Placeholder"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="Placeholder"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'A form dialog matching the Figma design with Name and Username fields.',
            },
        },
    },
};

export const SmallDialog: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Small Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share Link</DialogTitle>
                    <DialogDescription>
                        Anyone with this link will be able to view the document.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue="https://ui.shadcn.com/docs/installation"
                            readOnly
                        />
                    </div>
                    <Button size="sm" className="px-3">
                        Copy
                    </Button>
                </div>
                <DialogFooter>
                    <Button variant="outline">Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A smaller dialog with constrained width for simple interactions.',
            },
        },
    },
};

export const TextContentDialog: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Text Content Dialog</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogDescription>
                        This is a dialog description.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <h3 className="text-lg font-medium leading-7">Lorem ipsum</h3>
                    <p className="text-base leading-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales.
                        Donec id leo ipsum. Phasellus volutpat aliquet mauris, et blandit nulla laoreet vitae. Quisque ante dui,
                        porta eu felis nec, scelerisque pharetra turpis.
                    </p>
                    <p className="text-base leading-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales.
                        Donec id leo ipsum. Phasellus volutpat aliquet mauris, et blandit nulla laoreet vitae. Quisque ante dui,
                        porta eu felis nec, scelerisque pharetra turpis.
                    </p>
                    <p className="text-base leading-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales.
                        Donec id leo ipsum. Phasellus volutpat aliquet mauris, et blandit nulla laoreet vitae. Quisque ante dui,
                        porta eu felis nec, scelerisque pharetra turpis.
                    </p>
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A text content dialog matching the Figma design with Lorem ipsum content.',
            },
        },
    },
};

export const LargeDialog: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Large Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Project Settings</DialogTitle>
                    <DialogDescription>
                        Configure your project settings and preferences.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="project-name">Project Name</Label>
                        <Input
                            id="project-name"
                            placeholder="Enter project name"
                            defaultValue="My Awesome Project"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter project description"
                            defaultValue="A comprehensive project management solution built with modern technologies."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="start-date">Start Date</Label>
                            <Input
                                id="start-date"
                                type="date"
                                defaultValue="2024-01-15"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="end-date">End Date</Label>
                            <Input
                                id="end-date"
                                type="date"
                                defaultValue="2024-06-15"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A larger dialog with more complex content and form fields.',
            },
        },
    },
};

export const AlertDialog: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Show Alert</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>System Maintenance</DialogTitle>
                    <DialogDescription>
                        The system will be undergoing scheduled maintenance on Sunday, January 15th from 2:00 AM to 4:00 AM EST.
                        During this time, some features may be unavailable.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button>Understood</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    parameters: {
        docs: {
            description: {
                story: 'An alert-style dialog with informational content and single action.',
            },
        },
    },
};

export const NoCloseButton: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">No Close Button</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Important Notice</DialogTitle>
                    <DialogDescription>
                        This dialog requires you to make a choice before continuing. The close button has been disabled.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">Decline</Button>
                    <Button>Accept</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A dialog without the close button, forcing user interaction with the provided actions.',
            },
        },
    },
};

export const Showcase: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Basic</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Basic Dialog</DialogTitle>
                        <DialogDescription>
                            A simple dialog example.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive">Confirmation</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Item</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this item?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive">Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button>Form Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogDescription>
                            This is a dialog description.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="showcase-name">Name</Label>
                            <Input id="showcase-name" placeholder="Placeholder" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="showcase-username">Username</Label>
                            <Input id="showcase-username" placeholder="Placeholder" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary">Text Content</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogDescription>
                            This is a dialog description.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <h3 className="text-lg font-medium leading-7">Lorem ipsum</h3>
                        <p className="text-base leading-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary">Alert</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Information</DialogTitle>
                        <DialogDescription>
                            This is an informational alert.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button>Got it</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All dialog variants displayed together for easy comparison.',
            },
        },
    },
};