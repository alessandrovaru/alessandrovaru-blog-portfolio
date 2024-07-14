import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Analytics } from '@vercel/analytics/react';


import localFont from "next/font/local";
import { AuthContextProvider } from "@/context/AuthContext";

const questrial = localFont({ 
  src: "../../public/fonts/questrial.ttf",
  variable: '--questrial-font'
})

// config your font
const microgramma = localFont({
  src: "../../public/fonts/micro.otf",
  variable: "--microgramma-font",
});


export const metadata = {
  metadataBase: new URL('https://alessandrovaru.com/'),
  title: {
    default: 'Alessandrovaru',
    template: '%s | Alessandrovaru',
  },
  generator: "Next.js",
  applicationName: "alessandrovaru-blog-portfolio",
  referrer: 'origin-when-cross-origin',
  keywords:['Next.js', 'React', 'Portfolio', 'Blog', 'Alessandro Varuzza', 'Alessandrovaru', 'Varuzza', 'Alessandro', 'Gian Alessandro Varuzza', 'Gian Alessandro', 'Gian', 'Mandalas', 'Mandala', 'Mandala Art', 'Mandala Artist', 'Mandala Art', 'Mixtapes De Caracas', 'Mixtapes', 'Caracas', 'Fantasías', 'Jung'],
  creator: 'Alessandro Varuzza',
  publisher: 'Alessandro Varuzza',
  formatDetection: ['telephone=no', 'email=no', 'address=no'],
  metadataBase: new URL('https://alessandrovaru.com/'),
  alternates: {
    canonical: '/',
    languages: {
      'es-VE': '/es',
    }
  },
  openGraph: {
    description: "En la belleza del caos",
    images: '/public/p8.jpg',
    locale: 'es-VE',
    type: 'website',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script async src="https://kit.fontawesome.com/0634a1d485.js" crossOrigin="anonymous"></script>
      </head>
      <body className={`${microgramma.className} ${questrial.variable}`}>
          {children}
          <Footer />
          <Analytics />
      </body>
    </html>
  );
}
