"use client"

import { Event, User, Comment, CommentLike } from "@prisma/client"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { Pencil, Trash2 } from "lucide-react"
import { trpc } from "@/trpc/react"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"
import CommentDetail from "@/components/comment/CommentDetail"

interface EventDetailProps {
  event: Event & {
    user: Pick<User, "id" | "name" | "image">
  }
  userId?: string
  comments: (Comment & { user: Pick<User, "id" | "name" | "image"> } & {
    hasLiked: boolean
    commentLikeId: string | null
  } & { likes: CommentLike[] })[]
  pageCount: number
  totalComments: number
  isSubscribed: boolean
}

// 投稿詳細
const EventDetail = ({
  event: event,
  userId,
  comments,
  pageCount,
  totalComments,
  isSubscribed,
}: EventDetailProps) => {
  const router = useRouter()

  // 表示内容判定
  const isSubscribedEvent =
    event.premium && !isSubscribed && event.userId !== userId

  // 投稿内容を200文字に制限
  const content =
    isSubscribedEvent && event.content.length > 200
      ? event.content.slice(0, 200) + "..."
      : event.content

  // 投稿削除
  const { mutate: deleteEvent, isLoading } = trpc.event.deleteEvent.useMutation({
    onSuccess: () => {
      toast.success("投稿を削除しました")
      router.refresh()
      router.push(`/`)
    },
    onError: (error) => {
      toast.error(error.message)
      console.error(error)
    },
  })

  // 削除ボタンクリック時の処理
  const handleDeleteEvent = () => {
    if (event.user.id !== userId) {
      toast.error("投稿は削除できません")
      return
    }

    // 投稿削除
    deleteEvent({
      eventId: event.id,
    })
  }

  return (
    <div className="space-y-5">
      {event.premium && (
        <div className="bg-gradient-radial from-blue-500 to-sky-500 rounded-md text-white font-semibold px-3 py-1 text-xs inline-block">
          有料会員限定
        </div>
      )}

      <div className="font-bold text-2xl break-words">{event.title}</div>
      <div>
        <Link href={`/author/${event.user.id}`}>
          <div className="flex items-center space-x-1">
            <div className="relative w-6 h-6 flex-shrink-0">
              <Image
                src={event.user.image || "/default.png"}
                className="rounded-full object-cover"
                alt={event.user.name || "avatar"}
                fill
              />
            </div>
            <div className="text-sm hover:underline break-words min-w-0">
              {event.user.name} |{" "}
              {format(new Date(event.updatedAt), "yyyy/MM/dd HH:mm")}
            </div>
          </div>
        </Link>
      </div>

      <div className="aspect-[16/9] relative">
        <Image
          fill
          src={event.image || "/noImage.png"}
          alt="thumbnail"
          className="object-cover rounded-md"
        />
      </div>

      <div className="leading-relaxed break-words whitespace-pre-wrap">
        {content}
      </div>

      {userId === event.user.id && (
        <div className="flex items-center justify-end space-x-1">
          <Link href={`/event/${event.id}/edit`}>
            <div className="hover:bg-gray-100 p-2 rounded-full">
              <Pencil className="w-5 h-5" />
            </div>
          </Link>
          <button
            className="hover:bg-gray-100 p-2 rounded-full"
            disabled={isLoading}
            onClick={handleDeleteEvent}
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      )}

      {isSubscribedEvent && (
        <div className="bg-gradient-radial from-blue-500 to-sky-500 text-white rounded-md p-5 sm:p-10 text-center space-y-5">
          <div>この記事の続きは有料会員になるとお読みいただけます。</div>

          <div className="inline-block">
            {userId ? (
              <Link href="/payment">
                <div className="w-[300px] bg-white text-blue-500 hover:bg-white/90 font-bold shadow rounded-md py-2">
                  有料プランをみる
                </div>
              </Link>
            ) : (
              <Link href="/login">
                <div className="w-[300px] bg-white text-blue-500 hover:bg-white/90 font-bold shadow rounded-md py-2">
                  ログインする
                </div>
              </Link>
            )}
          </div>

          <div className="text-xs">※いつでも解約可能です</div>
          <div className="font-bold">有料会員特典</div>
          <div className="text-sm">有料記事が読み放題</div>
        </div>
      )}

      <CommentDetail
        userId={userId}
        eventId={event.id}
        comments={comments}
        pageCount={pageCount}
        totalComments={totalComments}
      />
    </div>
  )
}

export default EventDetail
