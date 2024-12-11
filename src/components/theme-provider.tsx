'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import dynamic from 'next/dynamic'

export const ThemeProvider = dynamic(() => Promise.resolve(ThemeProviderImpl), {
  ssr: false,
})

function ThemeProviderImpl({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
