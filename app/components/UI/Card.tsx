'use client';

import React from 'react';
import {
  Card as ShadcnCard,
  CardHeader as ShadcnCardHeader,
  CardContent as ShadcnCardContent,
  CardFooter as ShadcnCardFooter,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', hover = false, padding = 'md', shadow = 'sm', ...props }, ref) => {
    const paddingStyles: Record<string, string> = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const shadowStyles: Record<string, string> = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    };

    return (
      <ShadcnCard
        ref={ref}
        className={cn(
          'rounded-2xl border border-border bg-card text-card-foreground',
          paddingStyles[padding],
          shadowStyles[shadow],
          hover && 'hover:shadow-lg transition-shadow duration-300 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </ShadcnCard>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <ShadcnCardHeader ref={ref} className={cn('mb-4', className)} {...props}>
        {children}
      </ShadcnCardHeader>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <ShadcnCardContent ref={ref} className={cn('', className)} {...props}>
        {children}
      </ShadcnCardContent>
    );
  }
);

CardBody.displayName = 'CardBody';

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <ShadcnCardFooter ref={ref} className={cn('mt-4 pt-4 border-t border-border', className)} {...props}>
        {children}
      </ShadcnCardFooter>
    );
  }
);

CardFooter.displayName = 'CardFooter';
