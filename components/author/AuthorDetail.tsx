"use client"

import { Event, User } from "@prisma/client"
import { userEventPerPage } from "@/lib/utils"
import Image from "next/image"
import AuthorEventItem from "@/components/author/AuthorEventItem"
import PaginationButton from "@/components/pagers/PaginationButton"

interface AuthorDetailProps {
  user: User & {
    events: Event[]
  }
  pageCount: number
  totalEvents: number
}

// 投稿者詳細
const AuthorDetail = ({ user, pageCount, totalEvents }: AuthorDetailProps) => {
  return (
    <div>
      <div className="flex justify-center mb-5">
        <div className="relative w-28 h-28 flex-shrink-0">
          <Image
            src={user.image || "/default.png"}
            className="rounded-full object-cover"
            alt={user.name || "avatar"}
            fill
          />
        </div>
      </div>
      <div className="space-y-5 break-words whitespace-pre-wrap mb-5">
        <div className="font-bold text-xl text-center">{user.name}</div>
        <div className="leading-relaxed">{user.introduction}</div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="font-bold mb-1">投稿 {totalEvents}</div>
          <hr />
        </div>

        {user.events.length === 0 ? (
          <div className="text-center text-sm text-gray-500">
            投稿はありません
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 break-words">
            {user.events.map((event) => (
              <AuthorEventItem key={event.id} event={event} />
            ))}
          </div>
        )}

        {user.events.length !== 0 && (
          <PaginationButton
            pageCount={pageCount}
            displayPerPage={userEventPerPage}
          />
        )}
      </div>
    </div>
  )
}

export default AuthorDetail
