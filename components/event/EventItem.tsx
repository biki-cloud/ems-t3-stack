"use client"

import { Event, User } from "@prisma/client"
import { formatDistance } from "date-fns"
import { ja } from "date-fns/locale"
import Image from "next/image"
import Link from "next/link"

interface EventItemProps {
  event: Event & {
    user: Pick<User, "id" | "name" | "image">
  }
}

// 投稿一覧のアイテム
const EventItem = ({ event: event }: EventItemProps) => {
  // 投稿内容を60文字に制限
  const content =
    event.content.length > 60 ? event.content.slice(0, 60) + "..." : event.content

  // 日付
  const updatedAt = new Date(event.updatedAt ?? 0)
  const now = new Date()
  const date = formatDistance(updatedAt, now, { addSuffix: true, locale: ja })

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-3 space-y-3 sm:space-y-0">
        <Link href={`/event/${event.id}`} className="relative">
          {event.premium && (
            <div className="absolute top-0 z-10 bg-gradient-radial from-blue-500 to-sky-500 rounded-md text-white font-semibold px-3 py-1 text-xs">
              有料会員限定
            </div>
          )}

          <div className="aspect-[16/9] relative col-span-3 sm:col-span-1 overflow-hidden rounded-md">
            <Image
              fill
              src={event.image || "/noImage.png"}
              alt="thumbnail"
              className="object-cover rounded-md transition-all hover:scale-105"
              sizes="100px"
            />
          </div>
        </Link>

        <div className="col-span-1 sm:col-span-2 space-y-3 break-words">
          <div className="font-bold text-lg hover:underline">
            <Link href={`/event/${event.id}`}>{event.title}</Link>
          </div>

          <div className="hover:underline">
            <Link href={`/event/${event.id}`}>{content}</Link>
          </div>

          <div>
            <Link href={`/author/${event.user.id}`}>
              <div className="flex items-center space-x-1">
                <div className="relative w-6 h-6 flex-shrink-0">
                  <Image
                    src={event.user.image || "/default.png"}
                    className="rounded-full object-cover"
                    alt={event.user.name || "avatar"}
                    fill
                    sizes="24px"
                  />
                </div>
                <div className="text-sm hover:underline break-words min-w-0">
                  {event.user.name} | {date}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventItem
