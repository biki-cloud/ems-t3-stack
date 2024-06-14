import { trpc } from "@/trpc/client"
import PaginationButton from "../pagers/PaginationButton"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import EventItem from "./EventItem"
import { eventPerPage } from "@/lib/utils"

interface props {
    limit: number
    offset: number
}

const EventList = async ({ limit, offset }: props) => {
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
            <div className="flex mb-4">
                <Input className="flex-1 mr-2" placeholder="イベント名" />
                <Button variant="default" >検索</Button>
            </div>
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

export default EventList