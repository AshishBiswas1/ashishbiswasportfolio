"use client";

import { useEffect } from "react";
import { initSuppressWarnings } from "@/utils/suppressWarnings";

export default function SuppressWarnings() {
 useEffect(() => {
  initSuppressWarnings();
 }, []);

 return null;
}
