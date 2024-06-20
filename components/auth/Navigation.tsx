"use client"

import { Button } from "@/components/ui/button"
import { Customer, Organizer, User, Vendor } from "@prisma/client"
import UserNavigation from "@/components/auth/UserNavigation"
import Link from "next/link"
import { ThemeModeToggle } from "../ui/theme"
import { trpc } from "@/trpc/react"

interface NavigationProps {
  user: User | null
  isSubscribed: boolean
}

// ナビゲーション
const Navigation = ({ user, isSubscribed }: NavigationProps) => {
  const { data: user_role, isLoading, refetch } = trpc.event.getUserRoleInfo.useQuery({
    userId: user?.id ?? "",
  }, {
    //  オプションにより、新しいデータがロードされる間、前のデータが表示され続けます。
    keepPreviousData: true,
  });

  if (user_role == null && !isLoading) {
    // ログインしていない場合、何もしない
    return null
  }
  // user_role の createdAt と updatedAt を Date 型に変換
  const formattedUserRole = user_role ? {
    ...user_role,
    createdAt: new Date(user_role.createdAt),
    updatedAt: new Date(user_role.updatedAt),
  } : null;

  return (
    <header className="shadow-lg shadow-gray-100 mb-10">
      <div className="container mx-auto flex max-w-screen-md items-center justify-between px-2 py-3">
        <Link href="/" className="cursor-pointer text-xl font-bold">
          イベントマッチングサービス
        </Link>

        {user ? (
          <div className="flex items-center justify-center space-x-3">

            {formattedUserRole && (
              <UserNavigation user={user} user_role={formattedUserRole} />
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <Button asChild variant="ghost" className="font-bold">
              <Link href="/login">ログイン</Link>
            </Button>
            <Button asChild variant="default" className="font-bold">
              <Link href="/signup">新規登録</Link>
            </Button>
          </div>
        )}

        <ThemeModeToggle />
      </div>
    </header>
  )
}

export default Navigation
