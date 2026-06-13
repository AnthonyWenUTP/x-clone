import type { Metadata } from 'next';



import { QueryProvider } from '@/providers/query-provider';

export const metadata: Metadata = {
  title: 'X Clone',
  description: 'Production-grade Twitter/X clone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}