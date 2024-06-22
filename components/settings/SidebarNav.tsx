"use client"

import { usePathname } from "next/navigation"
import { Role, cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { get } from "http"
import { getAuthSession } from "@/lib/nextauth"
import { User } from "@prisma/client"

// ナビゲーション
const items = [
  {
    title: "イベント一覧",
    href: "/"
  },
  {
    title: "ユーザプロフィール",
    href: "/settings/userProfile",
  },
  {
    title: "イベント主催者プロフィール",
    href: "/settings/organizerProfile",
  },
  {
    title: "イベント出店者プロフィール",
    href: "/settings/vendorProfile",
  },
  {
    title: "パスワード変更",
    href: "/settings/password",
  },
]

interface SidebarNavProps {
  user: (User & Role) | null;
}

// サイドナビゲーション
const SidebarNav = ({user}: SidebarNavProps) => {
  const pathname = usePathname()

  const [isDevicePC, setIsDevicePC] = useState(false)

  // ユーザーの役割に基づいてナビゲーションアイテムをフィルタリング
  const filteredItems = items.filter(item => {
    if (user?.role === "organizer" && item.href === "/settings/vendorProfile") {
      return false
    }
    if (user?.role === "vendor" && item.href === "/settings/organizerProfile") {
      return false
    }
    if (user?.role !== "organizer" && user?.role !== "vendor" && 
        (item.href === "/settings/vendorProfile" || item.href === "/settings/organizerProfile")) {
      return false
    }
    return true
  })

  useEffect(() => {
    const handleResize = () => {
      // 画面の幅が700px以上、高さが700px以上の場合はPCと判定
      setIsDevicePC(window.innerWidth > 700 && window.innerHeight > 700)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return (
    <div>
      {isDevicePC && (
        <nav className={cn("flex space-x-2 md:flex-col md:space-x-0 md:space-y-1")}>
          {filteredItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}

export default SidebarNav
