import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import OrganizerProfile from "@/components/settings/OrganizerProfile"
import prisma from "@/lib/prisma"

// プロフィールページ
const OrganizerProfilePage = async () => {
    // 認証情報取得
    const user = await getAuthSession()

    if (!user) {
        redirect("/login")
    }

    const organizer = await prisma.organizer.findUnique({
        where: {
            userId: user.id,
        },
    })

    if (!organizer) {
        redirect("/login")
    }

    return <OrganizerProfile organizer={organizer} />
}

export default OrganizerProfilePage
