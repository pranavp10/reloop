import * as AvatarPrimitive from '@radix-ui/react-avatar';
import BAvatar from 'boring-avatars';
import * as React from 'react';
import { cn } from '#lib/utils.js';

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-muted flex size-full items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  );
}

const BoringAvatar = ({ name, size = 10 }: { name: string; size: number }) => {
  return (
    <BAvatar
      name={name}
      size={size}
      variant="pixel"
      className="shrink-0"
      colors={['#000', '#808080', '#CDCCC6']}
    />
  );
};

export { Avatar, AvatarImage, AvatarFallback, BoringAvatar };
