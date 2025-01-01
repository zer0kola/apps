import '@repo/ui/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';

import {
  ThemeProvider,
  QueryProvider,
  // createServerSupabaseClient,
  // AuthProvider,
} from '../utils';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Playground',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const supabase = await createServerSupabaseClient();

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  return (
    <QueryProvider>
      <html lang="ko" suppressHydrationWarning>
        {/* <AuthProvider accessToken={session?.access_token ?? ''}> */}
        <body
          className={`${pretendard.variable} font-pretendard`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <SpeedInsights />
          </ThemeProvider>
        </body>
        {/* </AuthProvider> */}
      </html>
    </QueryProvider>
  );
}
