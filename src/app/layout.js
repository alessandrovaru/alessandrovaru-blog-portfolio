import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Questrial } from "next/font/google";

import localFont from "next/font/local";

const questrial = Questrial({ 
  subsets: ["latin"],
  weight: '400', 
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${microgramma.className} ${questrial.variable}`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
