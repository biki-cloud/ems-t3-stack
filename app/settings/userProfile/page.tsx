import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import UserProfile from "@/components/settings/UserProfile"

// プロフィールページ
const ProfilePage = async () => {
  // 認証情報取得
  const user = await getAuthSession()

  if (!user) {
    redirect("/login")
  }

  return <UserProfile user={user} />
}

export default ProfilePage
