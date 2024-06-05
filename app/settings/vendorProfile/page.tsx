import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import VendorProfile from "@/components/settings/vendorProfile"
import prisma from "@/lib/prisma"

// プロフィールページ
const VendorProfilePage = async () => {
    // 認証情報取得
    const user = await getAuthSession()

    if (!user) {
        redirect("/login")
    }

    const vendor = await prisma.vendor.findUnique({
        where: {
            userId: user.id,
        },
    })

    if (!vendor) {
        redirect("/login")
    }

    return <VendorProfile vendor={vendor} />
}

export default VendorProfilePage
