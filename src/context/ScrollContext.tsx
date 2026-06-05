"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the exact shape of our context data
interface ScrollContextType {
 activeSection: string;
 setActiveSection: (section: string) => void;
}

// 2. Create the context with an undefined default, passing our custom Type
const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

// 3. Type the 'children' prop just like we did in RootLayout
export function ScrollProvider({ children }: { children: ReactNode }) {
 const [activeSection, setActiveSection] = useState("hero");

 return (
  <ScrollContext.Provider value={{ activeSection, setActiveSection }}>
   {children}
  </ScrollContext.Provider>
 );
}

// 4. Add a safety check in our custom hook
export function useScrollState() {
 const context = useContext(ScrollContext);

 // This prevents TS errors later and catches bugs if you forget the Provider
 if (context === undefined) {
  throw new Error("useScrollState must be used within a ScrollProvider");
 }

 return context;
}
