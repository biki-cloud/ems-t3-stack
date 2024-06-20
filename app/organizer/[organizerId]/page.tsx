import { notFound } from "next/navigation"
import OrganizerProfile from "@/components/settings/OrganizerProfile"
import prisma from "@/lib/prisma"

interface OrganizerProfilePageProps {
  params: {
    organizerId: string
  }
}

// 主催者プロフィールページ
const OrganizerProfilePage = async ({ params }: OrganizerProfilePageProps) => {
  const { organizerId } = params

  const organizer = await prisma.organizer.findUnique({
    where: {
      id: organizerId,
    },
  })

  if (!organizer) {
    notFound()
  }

  return <OrganizerProfile organizer={organizer} />
}

export default OrganizerProfilePage
