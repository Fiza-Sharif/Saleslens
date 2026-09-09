import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { UserProvider } from '@/context/UserContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SalesLens — AI Sales Prediction',
  description:
    'SalesLens is an AI-powered Machine Learning web application utilizing Polynomial Regression to predict product sales from TV, Radio, and Newspaper advertising budgets.',
  keywords: [
    'SalesLens — AI Sales Prediction',
    'Sales Prediction',
    'Polynomial Regression',
    'Machine Learning',
    'Data Analytics',
    'Advertising Budget ROI',
    'SalesLens',
  ],
  authors: [{ name: 'SalesLens AI Team' }],
  icons: {
    icon: [
      { url: '/saleslens.PNG', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/saleslens.PNG',
    apple: '/saleslens.PNG',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/saleslens.PNG" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/saleslens.PNG" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-brand-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <UserProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
