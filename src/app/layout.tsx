import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { ThemeProvider } from '@/contexts/theme-provider';
import AuthProvider from '@/contexts/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | adfusion',
    default: 'adfusion',
    absolute: 'Marketing những người sáng tạo nội dung | adfusion',
  },
  description: 'Marketing những người sáng tạo nội dung một cách dễ dàng và chuyên nghiệp',
  openGraph: {
    title: {
      template: '%s | adfusion',
      default: 'adfusion',
      absolute: 'Marketing những người sáng tạo nội dung | adfusion',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} data-scroll-locked="1">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
