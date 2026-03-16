import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ud Platform Starter',
  description: 'Udemy-like architecture starter built with Next.js + TypeScript'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
