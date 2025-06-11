"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"

import React from "react"
// This component wraps the NextThemesProvider to provide theme context to the application.

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
