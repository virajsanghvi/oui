import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';
import { useState } from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A date picker component that allows users to select dates from a calendar interface.'),
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'range'],
      description: 'The selection mode of the calendar',
    },
    showOutsideDays: {
      control: { type: 'boolean' },
      description: 'Show days outside the current month',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the calendar',
    },
    captionLayout: {
      control: { type: 'select' },
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: 'Layout of the month caption',
    },
  },
  args: {
    mode: 'single',
    showOutsideDays: true,
    disabled: false,
    captionLayout: 'label',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        {...args}
        selected={date}
        onSelect={setDate}
      />
    );
  },
};

export const SingleSelection: Story = {
  args: {
    mode: 'single',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <Calendar
        {...args}
        selected={date}
        onSelect={setDate}
      />
    );
  },
};

export const MultipleSelection: Story = {
  args: {
    mode: 'multiple',
  },
  render: (args) => {
    const [dates, setDates] = useState<Date[] | undefined>([]);
    return (
      <Calendar
        {...args}
        selected={dates}
        onSelect={setDates}
      />
    );
  },
};

export const RangeSelection: Story = {
  args: {
    mode: 'range',
  },
  render: (args) => {
    const [range, setRange] = useState<{ from: Date | undefined; to: Date | undefined } | undefined>();
    return (
      <Calendar
        {...args}
        selected={range}
        onSelect={setRange}
      />
    );
  },
};

export const WithDropdowns: Story = {
  args: {
    captionLayout: 'dropdown',
    fromYear: 2020,
    toYear: 2030,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        {...args}
        selected={date}
        onSelect={setDate}
      />
    );
  },
};

export const DisabledDates: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>();
    const disabledDays = [
      new Date(2024, 10, 15),
      new Date(2024, 10, 20),
      { from: new Date(2024, 10, 25), to: new Date(2024, 10, 28) }
    ];
    
    return (
      <Calendar
        {...args}
        selected={date}
        onSelect={setDate}
        disabled={disabledDays}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with specific dates disabled.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="oui:space-y-8">
      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Calendar Modes</h3>
        <div className="oui:grid oui:grid-cols-1 oui:md:grid-cols-2 oui:lg:grid-cols-3 oui:gap-6">
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-2">Single Selection</p>
            <Calendar mode="single" />
          </div>
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-2">Range Selection</p>
            <Calendar mode="range" />
          </div>
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-2">With Dropdowns</p>
            <Calendar 
              captionLayout="dropdown" 
              fromYear={2020} 
              toYear={2030}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different calendar configurations and selection modes.',
      },
    },
  },
};