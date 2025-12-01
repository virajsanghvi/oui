import type { Meta, StoryObj } from '@storybook/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components';
import { Card, CardContent } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';

const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A carousel component for displaying multiple items in a scrollable container with navigation controls.'),
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the carousel',
    },
  },
  args: {
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-xs mx-auto">
      <Carousel {...args}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const WithImages: Story = {
  render: (args) => (
    <div className="w-full max-w-sm mx-auto">
      <Carousel {...args}>
        <CarouselContent>
          {[
            'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&dpr=2&q=80',
            'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400&dpr=2&q=80',
            'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&dpr=2&q=80',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&dpr=2&q=80',
          ].map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="p-0">
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const MultipleItems: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel
        {...args}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="text-center">
                      <div className="text-2xl font-semibold">{index + 1}</div>
                      <p className="text-sm text-muted-foreground">Item {index + 1}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="w-full max-w-xs mx-auto">
      <Carousel {...args} className="w-full max-w-xs">
        <CarouselContent className="-mt-1 h-[300px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const ProductShowcase: Story = {
  render: (args) => (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel
        {...args}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {[
            { name: 'Wireless Headphones', price: '$199', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&dpr=2&q=80' },
            { name: 'Smart Watch', price: '$299', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&dpr=2&q=80' },
            { name: 'Laptop Computer', price: '$999', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&dpr=2&q=80' },
            { name: 'Smartphone', price: '$699', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&dpr=2&q=80' },
            { name: 'Tablet Device', price: '$449', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&dpr=2&q=80' },
          ].map((product, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-2xl font-bold text-primary">{product.price}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Product showcase carousel with realistic e-commerce content.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Carousel Variations</h3>
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium mb-4">Basic Carousel</p>
            <div className="w-full max-w-xs mx-auto">
              <Carousel>
                <CarouselContent>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-2xl font-semibold">{index + 1}</span>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-4">Multiple Items</p>
            <div className="w-full max-w-2xl mx-auto">
              <Carousel opts={{ align: 'start' }}>
                <CarouselContent>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-xl font-semibold">{index + 1}</span>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different carousel configurations and layouts.',
      },
    },
  },
};