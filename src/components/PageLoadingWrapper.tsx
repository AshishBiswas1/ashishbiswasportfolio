"use client";

import { useScrollState } from "@/context/ScrollContext";
import { LoadingSpinner } from "./LoadingSpinner";

/**
 * Wraps child components and shows loading spinner while data is being fetched
 */
export function PageLoadingWrapper({
 children,
}: {
 children: React.ReactNode;
}) {
 const { isLoading } = useScrollState();

 return (
  <>
   {isLoading && <LoadingSpinner />}
   <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
    {children}
   </div>
  </>
 );
}
