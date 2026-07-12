'use client';

import { memo } from 'react';
import type { ButtonProps } from '@heroui/react';
import { cn } from '@heroui/react';
import { buttonVariants } from '@heroui/styles';
import type { LinkProps } from 'next/link';
import NextLink from 'next/link';

export interface ButtonLinkProps {
  'aria-label'?: ButtonProps['aria-label'];
  className?: ButtonProps['className'];
  download?: boolean | string;
  fullWidth?: ButtonProps['fullWidth'];
  href: LinkProps['href'];
  id?: ButtonProps['id'];
  isDisabled?: ButtonProps['isDisabled'];
  isIconOnly?: ButtonProps['isIconOnly'];
  rel?: string;
  size?: ButtonProps['size'];
  target?: string;
  variant?: ButtonProps['variant'];
  onPress?: () => void;
  children?: React.ReactNode;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  target,
  rel,
  id,
  className,
  variant,
  size,
  fullWidth,
  isIconOnly,
  isDisabled,
  download,
  'aria-label': ariaLabel,
  onPress,
  children
}) => (
  <NextLink
    aria-disabled={isDisabled}
    aria-label={ariaLabel}
    className={cn(buttonVariants({
      fullWidth,
      isIconOnly,
      size,
      variant
    }), className)}
    download={download}
    href={href}
    id={id}
    rel={rel}
    target={target}
    onClick={isDisabled ? undefined : onPress}
  >
    {children}
  </NextLink>
);

export default memo(ButtonLink);
