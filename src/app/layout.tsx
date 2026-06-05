import "./globals.css";
import { ScrollProvider } from "@/context/ScrollContext";

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="en">
   <body>
    <ScrollProvider>{children}</ScrollProvider>
   </body>
  </html>
 );
}
