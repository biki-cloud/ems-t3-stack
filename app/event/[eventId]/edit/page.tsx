import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import { trpc } from "@/trpc/client"
import EventEdit from "@/components/event/EventEdit"

interface EventEditPageProps {
  params: {
    eventId: string
  }
}

// 投稿編集ページ
const EventEditPage = async ({ params }: EventEditPageProps) => {
  const { eventId: eventId } = params

  // 認証情報取得
  const user = await getAuthSession()

  if (!user) {
    redirect("/login")
  }

  // 投稿詳細取得
  const event = await trpc.event.getEventById({ eventId: eventId })

  if (!event) {
    return (
      <div className="text-center text-sm text-gray-500">投稿はありません</div>
    )
  }

  if (event.userId !== user.id) {
    return <div className="text-center">編集できません</div>
  }

  return <EventEdit event={event} />
}

export default EventEditPage
