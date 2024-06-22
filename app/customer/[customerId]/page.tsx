
import { notFound } from "next/navigation"
import CustomerIntroduceProfile from "@/components/customer/CustomerIntroduceProfile"
import prisma from "@/lib/prisma"

interface CustomerProfilePageProps {
  params: {
    customerId: string
  }
}

// カスタマープロフィールページ
const CustomerIntoroduceProfilePage = async ({ params }: CustomerProfilePageProps) => {
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

  return <CustomerIntroduceProfile customer={customer} />
}

export default CustomerIntoroduceProfilePage