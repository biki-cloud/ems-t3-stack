import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { getAuthSession } from "@/lib/nextauth"
import AuthProvider from "@/components/providers/AuthProvider"
import TrpcProvider from "@/components/providers/TrpcProvider"
import ToastProvider from "@/components/providers/ToastProvider"
import Navigation from "@/components/auth/Navigation"
import { getSubscription } from "@/actions/subscription"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ThemeModeToggle } from "@/components/ui/theme"
import { Customer, Organizer, User, Vendor } from "@prisma/client"
import { Role } from "@/lib/utils"
import SidebarNav from "@/components/settings/SidebarNav"
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect"
import { useEffect, useState } from "react"
import GetWindowSize from "@/components/common/GetWindowSize"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "イベントマッチングサービス",
  description: "イベントマッチングサービス",
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  // 認証情報取得
  const user: User & Role | null = await getAuthSession()

  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <AuthProvider>
              <TrpcProvider>
                <Navigation user={user} />
                <ToastProvider />

                <div className="flex">
                  <SidebarNav />
                  <main className="container mx-auto max-w-screen-md flex-1 px-2">
                    {children}
                    <SpeedInsights />
                    <Analytics />
                  </main>
                </div>

                {/* フッター */}
                <footer className="py-5">
                  <div className="text-center text-sm">
                  </div>
                </footer>
              </TrpcProvider>
            </AuthProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
