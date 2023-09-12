import './global.css';
import { getServerSession } from 'next-auth';
import { NextUiClientProvider, SessionProvider } from 'ui';
import { Poppins } from 'next/font/google';
import { Metadata } from 'next';
import { siteConfig } from 'config';
import { NavBarComponent } from 'ui/server';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '700'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <SessionProvider session={session}>
          <NextUiClientProvider>
            <NavBarComponent />
            {children}
          </NextUiClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
