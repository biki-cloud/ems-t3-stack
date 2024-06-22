import { notFound } from "next/navigation"
import VendorProfile from "@/components/settings/vendorProfile"
import prisma from "@/lib/prisma"

interface VendorProfilePageProps {
  params: {
    vendorId: string
  }
}

// ベンダープロフィールページ
const VendorProfilePage = async ({ params }: VendorProfilePageProps) => {
  const { vendorId } = params

  const vendor = await prisma.vendor.findUnique({
    where: {
      id: vendorId,
    },
  })

  if (!vendor) {
    notFound()
  }

  return <VendorProfile vendor={vendor} />
}

export default VendorProfilePage