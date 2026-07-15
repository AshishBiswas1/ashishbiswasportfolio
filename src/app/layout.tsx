import SuppressWarnings from "@/components/SuppressWarnings";
import "@/utils/suppressWarnings";
import "./globals.css";
import { ScrollProvider } from "@/context/ScrollContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";

const cormorant = Cormorant_Garamond({
 subsets: ["latin"],
 weight: ["300", "400", "500", "600", "700"],
 style: ["normal", "italic"],
 variable: "--font-display",
 display: "swap",
});

const inter = Inter({
 subsets: ["latin"],
 weight: ["300", "400", "500", "600"],
 variable: "--font-body",
 display: "swap",
});

const jetbrains = JetBrains_Mono({
 subsets: ["latin"],
 weight: ["400", "500"],
 variable: "--font-mono",
 display: "swap",
});

export const viewport: Viewport = {
 width: "device-width",
 initialScale: 1,
 maximumScale: 5,
 userScalable: true,
};

export const metadata = {
 title: "Ashish Biswas - Full Stack Developer",
 description: "Portfolio showcasing projects, skills, and experience",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html 
   lang="en" 
   className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}
  >
   <head>
    <meta charSet="utf-8" />
   </head>
   <body>
    <SuppressWarnings />
    <ScrollProvider>
     <Navbar />
     {children}
     <Footer />
    </ScrollProvider>
   </body>
  </html>
 );
}
