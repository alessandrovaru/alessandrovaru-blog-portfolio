import Footer from "@/components/Footer";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import localFont from "next/font/local";
import Script from "next/script";
import SmoothScrolling from "@/components/SmoothScrolling";
import { SITE_URL } from "@/lib/site";

const questrial = localFont({
  src: "../../public/fonts/questrial.ttf",
  variable: "--questrial-font",
});

const microgramma = localFont({
  src: "../../public/fonts/micro.otf",
  variable: "--microgramma-font",
});

const description =
  "Portafolio de Alessandro Varuzza: desarrollo de software, fotografía y arte digital desde Caracas. Mandalas, Mixtapes de Caracas, Fantasías y DLHTYNQN.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alessandrovaru",
    template: "%s | Alessandrovaru",
  },
  description,
  applicationName: "Alessandrovaru",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Alessandro Varuzza",
    "Alessandrovaru",
    "Gian Alessandro Varuzza",
    "Portafolio",
    "Mandalas",
    "Arte digital",
    "Mixtapes de Caracas",
    "Caracas",
    "Fotografía",
    "Fantasías",
    "DLHTYNQN",
    "Jung",
  ],
  creator: "Alessandro Varuzza",
  publisher: "Alessandro Varuzza",
  formatDetection: { telephone: false, email: false, address: false },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Alessandrovaru",
    description,
    url: "/",
    siteName: "Alessandrovaru",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Alessandrovaru" }],
    locale: "es_VE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@alessandrovaru",
  },
};

const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${microgramma.className} ${questrial.variable}`}>
        <SmoothScrolling>
          {children}
          <Footer />
        </SmoothScrolling>
        <Analytics />
        <SpeedInsights />
        {clarityId && (
          <Script id="clarity-script" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", ${JSON.stringify(clarityId)});
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
