import '@/globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kutra Corporation',
  description: 'Next.js app with dynamic language base URLs',
};

type Props = {
  children: ReactNode;
  params?: { locale?: string };
};

export default function RootLayout({ children, params }: Props) {
  const currentLocale = (params?.locale ?? 'en') as 'en' | 'tr';

  return (
    <html lang={currentLocale} className="h-full">
      <head>
        {/* Add meta tags, fonts, etc. */}
      </head>
      <body className="h-full bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}
