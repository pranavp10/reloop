'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';
import { cn } from '../lib/utils';
import Spinner from './spinner';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer item-center relative",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        success:
          'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700/90 focus-visible:ring-emerald-600/20 dark:focus-visible:ring-emerald-600/40 dark:bg-emerald-600/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonState = 'idle' | 'loading' | 'success' | 'error';

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    status?: ButtonState;
    spinner?: { size?: number; color?: string };
    successContent?: React.ReactNode;
    errorContent?: React.ReactNode;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  spinner,
  isLoading = false,
  status = 'idle',
  successContent,
  errorContent,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  const content: Record<ButtonState, React.ReactNode> = {
    idle: children,
    loading: (
      <Spinner size={spinner?.size ?? 20} color={spinner?.color ?? '#fff'} />
    ),
    success: successContent ?? (
      <span className="inline-flex items-center gap-1.5">
        <Check className="size-4" />
        Success
      </span>
    ),
    error: errorContent ?? (
      <span className="inline-flex items-center gap-1.5">
        <X className="size-4" />
        Oops!
      </span>
    ),
  };

  const currentKey: ButtonState = isLoading ? 'loading' : status;
  const effectiveVariant: VariantProps<typeof buttonVariants>['variant'] =
    status === 'error'
      ? 'destructive'
      : status === 'success'
        ? 'success'
        : (variant ?? 'default');
  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant: effectiveVariant, size, className }),
      )}
      disabled={isLoading || props.disabled || status === 'loading'}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={currentKey}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap outline-none item-center relative"
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
        >
          {content[currentKey]}
        </motion.span>
      </AnimatePresence>
    </Comp>
  );
}

export { Button, buttonVariants, type ButtonProps };
