import { notFound } from "next/navigation"
import OrganizerIntroduceProfile from "@/components/organizer/OrganizerIntroduceProfile"
import prisma from "@/lib/prisma"

interface OrganizerProfilePageProps {
  params: {
    organizerId: string
  }
}

// 主催者プロフィールページ
const OrganizerIntoroduceProfilePage = async ({ params }: OrganizerProfilePageProps) => {
  const { organizerId } = params

  const organizer = await prisma.organizer.findUnique({
    where: {
      id: organizerId,
    },
    include: {
      user: true,
    },
  })

  if (!organizer) {
    notFound()
  }

  return <OrganizerIntroduceProfile organizer={organizer} />
}

export default OrganizerIntoroduceProfilePage
