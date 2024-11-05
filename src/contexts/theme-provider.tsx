'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { Toaster } from '@/components/ui/sonner';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import ConfirmDialog from '@/components/confirm-dialog';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
      <Toaster position="top-right" richColors toastOptions={{ duration: 3000 }} className="top-16" />
      <ProgressBar height="4px" color="hsl(var(--primary))" options={{ showSpinner: false }} shallowRouting />
      <ConfirmDialog />
    </NextThemesProvider>
  );
}
