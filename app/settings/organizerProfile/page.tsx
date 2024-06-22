import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import OrganizerProfileEdit from "@/components/settings/OrganizerProfileEdit"
import prisma from "@/lib/prisma"

// プロフィール編集ページ
const OrganizerProfileEditPage = async () => {
  // 認証情報取得
  const user = await getAuthSession()

  if (!user) {
    redirect("/login")
  }

  const organizer = await prisma.organizer.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  })

  if (!organizer) {
    redirect("/login")
  }

  return <OrganizerProfileEdit organizer={organizer} />
}

export default OrganizerProfileEditPage