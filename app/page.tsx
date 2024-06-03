import { trpc } from "@/trpc/client"
import { eventPerPage as eventPerPage } from "@/lib/utils"
import EventItem from "@/components/event/EventItem"
import PaginationButton from "@/components/pagers/PaginationButton"

interface HomeProps {
  searchParams: {
    [key: string]: string | undefined
  }
}

const Home = async ({ searchParams }: HomeProps) => {
  const { page, perPage } = searchParams

  const limit = typeof perPage === "string" ? parseInt(perPage) : eventPerPage
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0

  const { events: events, totalEvents: totalEvents } = await trpc.event.getEvents({
    limit,
    offset,
  })

  // 投稿がない場合
  if (events.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500">投稿はありません</div>
    )
  }

  const pageCount = Math.ceil(totalEvents / limit)

  return (
    <div className="space-y-5">
      <div className="space-y-5">
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>

      {events.length !== 0 && (
        <PaginationButton pageCount={pageCount} displayPerPage={eventPerPage} />
      )}
    </div>
  )
}

export default Home
