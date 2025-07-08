import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Torre Profile Viewer',
  description: 'View Torre.ai profiles and connect with professionals',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
