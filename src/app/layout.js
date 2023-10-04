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
  title: "Alessandrovaru",
  description: "Alessandro Varuzza personal website",
  generator: "Next.js",
  applicationName: "alessandrovaru-blog-portfolio",
  referrer: 'origin-when-cross-origin',
  keywords:['Next.js', 'React', 'Portfolio', 'Blog', 'Alessandro Varuzza', 'Alessandrovaru', 'Varuzza', 'Alessandro', 'Gian Alessandro Varuzza', 'Gian Alessandro', 'Gian', 'Mandalas', 'Mandala', 'Mandala Art', 'Mandala Artist', 'Mandala Art', 'Mixtapes De Caracas', 'Mixtapes', 'Caracas', 'Fantasías'],
  colorScheme: 'dark',
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
    images: '/public/mandala.ico',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script async src="https://kit.fontawesome.com/0634a1d485.js" crossorigin="anonymous"></script>
      </head>
      <body className={`${microgramma.className} ${questrial.variable}`}>
          <Nav />
          {children}
          <Footer />
          <Analytics />
      </body>
    </html>
  );
}
