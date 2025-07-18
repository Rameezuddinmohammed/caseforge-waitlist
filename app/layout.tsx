import type React from "react"
import type { Viewport } from "next"
import { Geist } from "next/font/google"
import { Providers } from "@/context"
import { Header } from "@/components/header"
import { supabaseAdmin } from "@/lib/supabase/server"
import SpotlightContainer from "@/components/spotlight-container" // Updated import
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true,
  display: "swap",
})

export const dynamic = "force-dynamic"

export const viewport: Viewport = {
  maximumScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data: settings } = await supabaseAdmin.from("settings").select("*").single()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.className} antialiased max-w-screen min-h-svh bg-black text-slate-12`}>
        <Providers defaultTheme={settings?.default_theme || "system"} forcedTheme={settings?.forced_theme}>
          <SpotlightContainer>
            {" "}
            {/* Wrapped content with SpotlightContainer */}
            <div className="max-w-screen-sm mx-auto w-full relative z-[1] flex flex-col min-h-screen">
              <div className="px-5 gap-8 flex flex-col flex-1 py-[12vh]">
                <Header />
                <main className="flex justify-center">{children}</main>
              </div>
            </div>
          </SpotlightContainer>
        </Providers>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
