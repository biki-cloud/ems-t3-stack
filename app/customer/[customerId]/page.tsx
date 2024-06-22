
import { notFound } from "next/navigation"
import CustomerProfile from "@/components/settings/CustomerProfile"
import prisma from "@/lib/prisma"

interface CustomerProfilePageProps {
  params: {
    customerId: string
  }
}

// カスタマープロフィールページ
const CustomerProfilePage = async ({ params }: CustomerProfilePageProps) => {
  const { customerId } = params

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
    include: {
      user: true,
    },
  })

  if (!customer) {
    notFound()
  }

  return <CustomerProfile customer={customer} />
}

export default CustomerProfilePage