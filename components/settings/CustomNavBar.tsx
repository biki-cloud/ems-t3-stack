"use client"

import { Role, cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { User } from "@prisma/client"
import FootNavBar from "./FootNavBar"
import LeftNavBar from "./LeftNavBar"

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
const CustomNavBar = ({ user }: SidebarNavProps) => {

  const [isDevicePC, setIsDevicePC] = useState(false)
  console.log("isDevicePC", isDevicePC)

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
      setIsDevicePC(window.innerWidth > 700)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return (
    <div>
      {isDevicePC ? (
        <LeftNavBar items={filteredItems} />
      ) : (
        <FootNavBar items={filteredItems} />
      )}
    </div>
  )
}

export default CustomNavBar
