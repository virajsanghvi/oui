import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '@/components';
import { useState } from 'react';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text displayed when textarea is empty',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the textarea is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the textarea is required',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Whether the textarea is read-only',
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of visible text lines',
    },
    cols: {
      control: { type: 'number', min: 10, max: 100 },
      description: 'Visible width of the text control',
    },
    maxLength: {
      control: { type: 'number', min: 1, max: 1000 },
      description: 'Maximum number of characters allowed',
    },
    'aria-invalid': {
      control: { type: 'boolean' },
      description: 'Whether the textarea has validation errors',
    },
    'aria-describedby': {
      control: { type: 'text' },
      description: 'ID of element that describes the textarea',
    },
    onChange: {
      action: 'changed',
      description: 'Function called when the textarea value changes',
    },
    onFocus: {
      action: 'focused',
      description: 'Function called when the textarea receives focus',
    },
    onBlur: {
      action: 'blurred',
      description: 'Function called when the textarea loses focus',
    },
  },
  args: {
    onChange: () => console.log('Textarea changed'),
    onFocus: () => console.log('Textarea focused'),
    onBlur: () => console.log('Textarea blurred'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default textarea
export const Default: Story = {
  args: {
    placeholder: 'Enter your message here...',
    rows: 4,
  },
};

// Different sizes
export const Small: Story = {
  args: {
    placeholder: 'Brief comment...',
    rows: 2,
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Enter your feedback...',
    rows: 4,
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Write your detailed response...',
    rows: 8,
  },
};

// State stories
export const Disabled: Story = {
  args: {
    placeholder: 'This field is disabled',
    disabled: true,
    value: 'This content cannot be edited because the textarea is disabled.',
    rows: 3,
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 'This is read-only content that provides information but cannot be modified by the user.',
    rows: 3,
  },
};

export const Required: Story = {
  args: {
    placeholder: 'This field is required',
    required: true,
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter your message',
    value: 'Too short',
    'aria-invalid': true,
    'aria-describedby': 'message-error',
    rows: 4,
  },
};

// Resize behavior examples
export const ResizeBehavior: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <label className="text-sm font-medium">Default Resize (Both)</label>
        <Textarea
          placeholder="You can resize this textarea in both directions..."
          rows={3}
          style={{ resize: 'both' }}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Vertical Resize Only</label>
        <Textarea
          placeholder="You can only resize this textarea vertically..."
          rows={3}
          style={{ resize: 'vertical' }}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Horizontal Resize Only</label>
        <Textarea
          placeholder="You can only resize this textarea horizontally..."
          rows={3}
          style={{ resize: 'horizontal' }}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">No Resize</label>
        <Textarea
          placeholder="This textarea cannot be resized..."
          rows={3}
          style={{ resize: 'none' }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different resize behaviors for textarea elements.',
      },
    },
  },
};

// Character count examples
export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 200;
    const remaining = maxLength - value.length;
    
    return (
      <div className="space-y-2 w-full max-w-md">
        <label htmlFor="char-count-textarea" className="text-sm font-medium">
          Product Review
        </label>
        <Textarea
          id="char-count-textarea"
          placeholder="Share your thoughts about this product..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
          rows={4}
          aria-describedby="char-count-help"
        />
        <div className="flex justify-between text-sm">
          <p id="char-count-help" className="text-muted-foreground">
            Share your experience to help others
          </p>
          <p className={`${remaining < 20 ? 'text-destructive' : 'text-muted-foreground'}`}>
            {remaining} characters remaining
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with character count and limit enforcement.',
      },
    },
  },
};

export const CharacterCountWarning: Story = {
  render: () => {
    const [value, setValue] = useState('This is a sample message that demonstrates how the character count warning works when approaching the limit.');
    const maxLength = 150;
    const remaining = maxLength - value.length;
    const isNearLimit = remaining <= 20;
    const isOverLimit = remaining < 0;
    
    return (
      <div className="space-y-2 w-full max-w-md">
        <label htmlFor="warning-textarea" className="text-sm font-medium">
          Feedback Message
        </label>
        <Textarea
          id="warning-textarea"
          placeholder="Enter your feedback..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
          rows={4}
          aria-describedby="warning-help"
          className={isOverLimit ? 'border-destructive focus-visible:border-destructive' : ''}
        />
        <div className="flex justify-between text-sm">
          <p id="warning-help" className="text-muted-foreground">
            Please keep your feedback concise
          </p>
          <p className={`${isOverLimit ? 'text-destructive font-medium' : isNearLimit ? 'text-orange-600' : 'text-muted-foreground'}`}>
            {Math.abs(remaining)} {remaining < 0 ? 'characters over limit' : 'characters remaining'}
          </p>
        </div>
        {isOverLimit && (
          <p className="text-sm text-destructive">
            Please reduce your message by {Math.abs(remaining)} characters
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with character count warnings and limit enforcement.',
      },
    },
  },
};

// Form integration examples
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-full max-w-md">
      <label htmlFor="message-textarea" className="text-sm font-medium">
        Message
      </label>
      <Textarea
        id="message-textarea"
        placeholder="Enter your message here..."
        rows={4}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textarea with proper label association for accessibility.',
      },
    },
  },
};

export const WithHelperText: Story = {
  render: () => (
    <div className="space-y-2 w-full max-w-md">
      <label htmlFor="description-textarea" className="text-sm font-medium">
        Project Description
      </label>
      <Textarea
        id="description-textarea"
        placeholder="Describe your project goals and requirements..."
        rows={5}
        aria-describedby="description-help"
      />
      <p id="description-help" className="text-sm text-muted-foreground">
        Provide a detailed description to help team members understand the project scope
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textarea with helper text for additional guidance.',
      },
    },
  },
};

export const WithValidationError: Story = {
  render: () => (
    <div className="space-y-2 w-full max-w-md">
      <label htmlFor="comment-error-textarea" className="text-sm font-medium">
        Comments
      </label>
      <Textarea
        id="comment-error-textarea"
        placeholder="Enter your comments..."
        value="Too short"
        aria-invalid={true}
        aria-describedby="comment-error"
        rows={4}
      />
      <p id="comment-error" className="text-sm text-destructive">
        Comments must be at least 20 characters long
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textarea with validation error state and error message.',
      },
    },
  },
};

export const WithSuccessState: Story = {
  render: () => (
    <div className="space-y-2 w-full max-w-md">
      <label htmlFor="review-success-textarea" className="text-sm font-medium">
        Product Review
      </label>
      <Textarea
        id="review-success-textarea"
        value="This product exceeded my expectations! The quality is outstanding and it arrived exactly as described. I would definitely recommend it to others looking for a reliable solution."
        aria-describedby="review-success"
        rows={4}
        className="border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20"
      />
      <p id="review-success" className="text-sm text-green-600">
        Thank you for your detailed review!
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textarea with success validation state.',
      },
    },
  },
};

// Realistic form scenarios
export const ContactForm: Story = {
  render: () => (
    <form className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <label htmlFor="contact-name" className="text-sm font-medium">
          Full Name *
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="John Smith"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-email" className="text-sm font-medium">
          Email Address *
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="john.smith@company.com"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-subject" className="text-sm font-medium">
          Subject *
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder="How can we help you?"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message *
        </label>
        <Textarea
          id="contact-message"
          placeholder="Please describe your inquiry in detail..."
          required
          rows={5}
          aria-describedby="message-help"
        />
        <p id="message-help" className="text-sm text-muted-foreground">
          The more details you provide, the better we can assist you
        </p>
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete contact form with textarea for detailed messages.',
      },
    },
  },
};

export const FeedbackForm: Story = {
  render: () => {
    const [feedback, setFeedback] = useState('');
    const minLength = 50;
    const maxLength = 500;
    const isValid = feedback.length >= minLength;
    const remaining = maxLength - feedback.length;
    
    return (
      <form className="space-y-4 w-full max-w-md">
        <div className="space-y-2">
          <label htmlFor="feedback-rating" className="text-sm font-medium">
            Overall Rating *
          </label>
          <select
            id="feedback-rating"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select a rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="feedback-comments" className="text-sm font-medium">
            Comments *
          </label>
          <Textarea
            id="feedback-comments"
            placeholder="Please share your detailed feedback about your experience..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            maxLength={maxLength}
            rows={5}
            aria-describedby="feedback-help"
            className={!isValid && feedback.length > 0 ? 'border-destructive focus-visible:border-destructive' : ''}
          />
          <div className="flex justify-between text-sm">
            <p id="feedback-help" className={!isValid && feedback.length > 0 ? 'text-destructive' : 'text-muted-foreground'}>
              {!isValid && feedback.length > 0 
                ? `Please write at least ${minLength - feedback.length} more characters`
                : 'Help us improve by sharing your experience'
              }
            </p>
            <p className={remaining < 50 ? 'text-orange-600' : 'text-muted-foreground'}>
              {remaining} remaining
            </p>
          </div>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Feedback form with validation and character count.',
      },
    },
  },
};

// Showcase stories
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <label className="text-sm font-medium">Small (2 rows)</label>
        <Textarea
          placeholder="Brief comment..."
          rows={2}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Medium (4 rows)</label>
        <Textarea
          placeholder="Standard message..."
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Large (8 rows)</label>
        <Textarea
          placeholder="Detailed description..."
          rows={8}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different textarea sizes displayed together.',
      },
    },
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <label className="text-sm font-medium">Default State</label>
        <Textarea placeholder="Enter your message..." rows={3} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Error State</label>
        <Textarea
          placeholder="Enter your message..."
          value="Too short"
          aria-invalid={true}
          rows={3}
        />
        <p className="text-sm text-destructive">Message must be at least 20 characters</p>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Success State</label>
        <Textarea
          value="This is a well-written message that meets all the requirements and provides valuable information."
          rows={3}
          className="border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20"
        />
        <p className="text-sm text-green-600">Message looks great!</p>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Disabled State</label>
        <Textarea
          disabled
          value="This field is disabled and cannot be edited."
          rows={3}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different validation and interaction states.',
      },
    },
  },
};