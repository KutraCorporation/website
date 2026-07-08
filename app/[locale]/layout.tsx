import "../globals.css";
import type { Metadata, Viewport } from "next";
import { headers } from 'next/headers';
import { Inter } from 'next/font/google';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/components/LocaleProvider";
import { baseUrl } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const viewport: Viewport = {
  themeColor: '#0EB1D4',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const upperLocale = locale === "en" ? "" : locale.toUpperCase();
  const cleanLocale = locale.toLowerCase();
  
  let pathname = '/';

  try {
    const headersList = await headers();
    pathname = headersList.get('x-current-path') || '/';
  } catch (error) {
    console.error('Headers error:', error);
  }

  const localePrefix = `/${cleanLocale}`;
  if (pathname.startsWith(localePrefix)) {
    pathname = pathname.slice(localePrefix.length) || '/';
  }

  const sanitizedPath = pathname.replace(/\/+/g, '/');
  const normalizedPath = sanitizedPath.startsWith('/') ? sanitizedPath : `/${sanitizedPath}`;
  let canonicalPath = `/${cleanLocale}${normalizedPath}`;
  canonicalPath = canonicalPath.replace(/\/+/g, '/');
  const canonicalUrl = new URL(canonicalPath, baseUrl).toString();

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `Kutra ${upperLocale}`,
      template: `%s | Kutra ${upperLocale}`,
    },
    description: "Kutra, modern teknolojiler ve yapay zeka ile uçtan uca dijital çözümler sunar.",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-video-preview': -1,
        'max-image-preview': 'large',
      },
    },
    icons: {
      icon: baseUrl + 'img/logo.png',
    },
    authors: [{ name: "Kutra Corporation", url: `${baseUrl}humans.txt` }],
    creator: "Kutra Corporation",
    publisher: "Kutra Corporation",
    formatDetection: { telephone: false },
    themeColor: '#0EB1D4',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': `${baseUrl}en`,
        'en': `${baseUrl}en`,
        'tr': `${baseUrl}tr`,
      },
    },
    appleWebApp: {
      capable: true,
      title: "Kutra Ecosystem",
      statusBarStyle: "black-translucent",
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const currentLocale = locale as 'en' | 'tr';

  return (
    <html lang={currentLocale} prefix="og: https://ogp.me/ns#" className={`${inter.variable} dark h-full scrollbar_Cer45 scroll-smooth`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
      </head>
      <body className="min-h-screen font-inter antialiased bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          >
          <LocaleProvider defaultLocale={currentLocale}>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main id="main-content" className="grow" role="main" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}