import "../globals.css";
import { i18n } from '@/i18n/i18n';
import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/components/LocaleProvider";
import { baseUrl } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
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

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Kutra",
      template: `%s | Kutra ${locale.toUpperCase()}`,
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
    alternates: {
      canonical: `${baseUrl + locale}`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const safeLocale = i18n.defaultLocale;
  const lang = safeLocale === "tr" ? "tr-TR" : "en-US";

  return (
    <html lang={lang} prefix="og: https://ogp.me/ns#" className={`${inter.variable} dark h-full scrollbar_Cer45 scroll-smooth`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen font-inter antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <LocaleProvider defaultLocale={safeLocale}>
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