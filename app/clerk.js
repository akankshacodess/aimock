"use client"; // Ensure it's a Client Component

import { ClerkProvider } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function Clerk({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent hydration error by not rendering on SSR
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
