import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components';
import { Button } from '@/components';
import { Label } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';
import React from 'react';

const meta: Meta<typeof InputOTP> = {
  title: 'UI/InputOTP',
  component: InputOTP,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('An input component specifically designed for one-time password (OTP) entry with individual character fields.'),
  },
  tags: ['autodocs'],
  argTypes: {
    maxLength: {
      control: { type: 'number' },
      description: 'Maximum number of characters',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
  },
  args: {
    maxLength: 6,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp">One-Time Password</Label>
          <InputOTP
            id="otp"
            maxLength={6}
            value={value}
            onChange={setValue}
            {...args}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="text-center text-sm">
          {value === "" ? (
            <>Enter your one-time password.</>
          ) : (
            <>You entered: {value}</>
          )}
        </div>
      </div>
    );
  },
};

export const WithSeparator: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp-separator">Verification Code</Label>
          <InputOTP
            id="otp-separator"
            maxLength={6}
            value={value}
            onChange={setValue}
            {...args}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Please enter the 6-digit code sent to your phone.
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'OTP input with separator between groups.',
      },
    },
  },
};

export const FourDigit: Story = {
  args: {
    maxLength: 4,
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp-four">PIN Code</Label>
          <InputOTP
            id="otp-four"
            maxLength={4}
            value={value}
            onChange={setValue}
            {...args}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Enter your 4-digit PIN.
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '4-digit OTP input for PIN codes.',
      },
    },
  },
};

export const TwoFactor: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
      if (value.length === 6) {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
          setIsSubmitting(false);
          setValue("");
        }, 2000);
      }
    };

    return (
      <div className="w-[350px] space-y-6">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
          <p className="text-sm text-muted-foreground">
            We sent a verification code to your authenticator app.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp-2fa" className="sr-only">
              Verification code
            </Label>
            <InputOTP
              id="otp-2fa"
              maxLength={6}
              value={value}
              onChange={setValue}
              disabled={isSubmitting}
              {...args}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <Button 
            onClick={handleSubmit} 
            disabled={value.length !== 6 || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Verifying..." : "Verify Code"}
          </Button>
          
          <div className="text-center">
            <Button variant="link" className="text-sm">
              Didn't receive a code? Resend
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete two-factor authentication form with OTP input.',
      },
    },
  },
};

export const PhoneVerification: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);

    React.useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      }
    }, [timeLeft]);

    return (
      <div className="w-[400px] space-y-6">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">Verify Your Phone Number</h3>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to +1 (555) 123-4567
          </p>
        </div>
        
        <div className="space-y-4">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={setValue}
            {...args}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {timeLeft > 0 ? `Resend code in ${timeLeft}s` : "Code expired"}
            </span>
            <Button 
              variant="link" 
              className="p-0 h-auto text-sm"
              disabled={timeLeft > 0}
              onClick={() => setTimeLeft(60)}
            >
              Resend Code
            </Button>
          </div>
          
          <Button 
            disabled={value.length !== 6}
            className="w-full"
          >
            Verify Phone Number
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Phone verification with countdown timer and resend functionality.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">OTP Input Examples</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-2">Basic 6-digit OTP</p>
              <InputOTP maxLength={6} value={value1} onChange={setValue1}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">With Separator</p>
              <InputOTP maxLength={6} value={value2} onChange={setValue2}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">4-digit PIN</p>
              <InputOTP maxLength={4} value={value3} onChange={setValue3}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different OTP input configurations and layouts.',
      },
    },
  },
};