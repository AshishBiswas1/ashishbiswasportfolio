import "./globals.css";
import { ScrollProvider } from "@/context/ScrollContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="en">
   <body>
    <ScrollProvider>
     <Navbar />
     {children}
     <Footer />
    </ScrollProvider>
   </body>
  </html>
 );
}
