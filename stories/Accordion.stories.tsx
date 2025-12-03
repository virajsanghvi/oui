import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components';

type AccordionWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const AccordionWrapper = ({ children, className }: AccordionWrapperProps) => (
  <div className={className}>{children}</div>
);

const meta: Meta<typeof AccordionWrapper> = {
  title: 'UI/Accordion',
  component: AccordionWrapper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Accordion type="single" collapsible className="oui:w-96">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components' aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    className: "oui:flex oui:justify-center",
  },
};

export const Multiple: Story = {
  args: {
    children: (
      <Accordion type="multiple" className="oui:w-96">
        <AccordionItem value="item-1">
          <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
          <AccordionContent>
            Yes. With type="multiple", you can have multiple accordion items open at the same time.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            Each item can be opened independently of the others.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Any limitations?</AccordionTrigger>
          <AccordionContent>
            No limitations. Open as many items as you need.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    className: "oui:flex oui:justify-center",
  },
};

export const SingleItem: Story = {
  args: {
    children: (
      <Accordion type="single" collapsible className="oui:w-96">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is OUI?</AccordionTrigger>
          <AccordionContent>
            OUI is a comprehensive design system built on top of shadcn/ui, 
            providing consistent and accessible UI components for modern web applications.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    className: "oui:flex oui:justify-center",
  },
};