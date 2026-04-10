'use client';

import React from 'react';
import { Skeleton as ShadcnSkeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}) => {
  const variantStyles: Record<string, string> = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <ShadcnSkeleton
      className={cn(
        variantStyles[variant],
        animation === 'none' && 'animate-none',
        className
      )}
      style={style}
    />
  );
};

// Predefined skeleton components for common use cases
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={cn('bg-card rounded-2xl border border-border p-6', className)}>
    <div className="flex items-start gap-4">
      <Skeleton variant="circular" width={60} height={60} />
      <div className="flex-1 space-y-3">
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="40%" height={16} />
        <Skeleton variant="text" width="80%" height={16} />
      </div>
    </div>
  </div>
);

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = '',
}) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        width={i === lines - 1 ? '70%' : '100%'}
        height={16}
      />
    ))}
  </div>
);

export const SkeletonButton: React.FC<{ width?: string; className?: string }> = ({
  width = '120px',
  className = '',
}) => (
  <Skeleton variant="rounded" width={width} height={40} className={className} />
);

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => (
  <Skeleton variant="circular" width={size} height={size} className={className} />
);

export const SkeletonList: React.FC<{ count?: number; className?: string }> = ({
  count = 3,
  className = '',
}) => (
  <div className={cn('space-y-4', className)}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);
