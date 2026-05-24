import type {Metadata} from 'next';
import './globals.css'; // Global styles
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Latimore Life & Legacy Hub OS',
  description: 'Enterprise business operating system for lead generation, pipeline management, and customer relationship routing.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const mainGaId = process.env.NEXT_PUBLIC_MAIN_GA4_ID || "G-S0Q3E4DEBJ";

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}

        {mainGaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${mainGaId}`}
              strategy="afterInteractive"
            />
            <Script id="main-google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${mainGaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
