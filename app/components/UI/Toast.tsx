'use client';

import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

// Re-export Toaster component for layout
export const ToastProvider = Toaster;

// Hook-based toast utility that replaces the old store-based toast
export { toast };

// Legacy Toast component that syncs with useUIStore for backward compatibility
import { useUIStore } from '@/store/uiStore';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  // Sync store toasts with sonner
  useEffect(() => {
    toasts.forEach((t) => {
      toast[t.type](t.message, {
        id: t.id,
        onDismiss: () => removeToast(t.id),
      });
    });
  }, [toasts, removeToast]);

  return null; // The actual toasts are rendered by the Toaster in layout
};
