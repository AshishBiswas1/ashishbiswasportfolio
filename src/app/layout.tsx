import SuppressWarnings from "@/components/SuppressWarnings";
import "@/utils/suppressWarnings";
import "./globals.css";
import { ScrollProvider } from "@/context/ScrollContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Viewport } from "next";

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
  <html lang="en">
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
