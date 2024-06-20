/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/jlBltejfrmZ
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
'use client'
import { getAuthSession } from "@/lib/nextauth"

import { Event, User, Comment, CommentLike, EventParticipationRequest, Vendor } from "@prisma/client"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { Pencil, Trash2 } from "lucide-react"
import { trpc } from "@/trpc/react"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"
import CommentDetail from "@/components/comment/CommentDetail"

import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import EventParticipationRequestDetail from "@/components/EventParticipation/EventParticipationRequestDetail"
import EventParticipationSettleDetail from "@/components/EventParticipation/EventParticipationSettleDetail"
import genreMapping from "@/components/objects/mapping"

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
  user: User | null
  eventParticipationRequests: (EventParticipationRequest & { vendor: Vendor & { user: User } })[]
}

const EventDetail = ({
  event: event,
  userId,
  comments,
  pageCount,
  totalComments,
  user,
  eventParticipationRequests,
}: EventDetailProps) => {

  const router = useRouter()

  // 投稿内容を200文字に制限
  const content = event.content.length > 200
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

  // 既存のコードに追加
  const { mutate: sendParticipationRequest, isLoading: isRequestLoading } = trpc.event.createEventParticipationRequest.useMutation({
    onSuccess: () => {
      toast.success("参加リクエストを送りました");
      router.refresh();
    },
    onError: (error) => {
      toast.error(`リクエスト送信エラー: ${error.message}`);
    },
  });

  // ユーザーがベンダーかどうか
  const isVendor = user?.role == 'vendor'

  // pendingとapprovedに分ける
  const pendingRequests = eventParticipationRequests.filter(
    (request) => request.status === "pending"
  )
  const approvedRequests = eventParticipationRequests.filter(
    (request) => request.status === "approved"
  )

  const isOrganizer = user?.role == 'organizer'

  // ユーザーがイベントのオーガナイザーかどうか
  const isEventAuthor = event.userId == user?.id

  // 申請リスト一覧にログインしているvendorがいるか
  const isVendorRequested = eventParticipationRequests.some(request => 
    request.vendor.user.id === userId
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
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
                  {event.user.name} |{" "}
                  {format(new Date(event.updatedAt), "yyyy/MM/dd HH:mm")}
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4 mt-2 text-gray-500">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <span>June 15, 2023 - 6:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5" />
              <span>123 Main St, Anytown USA</span>
            </div>
          </div>
        </div>
        <div className="aspect-[16/9] relative">
          <Image
            fill
            src={event.image || "/noImage.png"}
            alt="thumbnail"
            className="object-cover rounded-md"
            sizes="100%"
          />
        </div>
        <div className="font-bold text-2xl break-words">内容</div>
        <div className="leading-relaxed break-words whitespace-pre-wrap">
          <p>{event.content}</p>
        </div>
        <div className="font-bold text-2xl break-words">ジャンル</div>
        <div className="leading-relaxed break-words whitespace-pre-wrap">
          <p>{genreMapping[event.genre]}</p>
        </div>
        <div className="font-bold text-2xl break-words">開催場所</div>
        <div className="leading-relaxed break-words whitespace-pre-wrap">
          {event.location}
        </div>
        {isVendor && (
          <div className="mt-4">
            <Button
              className="w-full sm:w-auto"
              onClick={() => sendParticipationRequest({ eventId: event.id, status: "pending" })}
              disabled={isRequestLoading}
            >
              {isVendorRequested && '参加リクエスト送信済み' || '参加リクエストを送る'}
            </Button>
          </div>
        )}
        <div className="grid gap-6">
          {(isEventAuthor || isVendorRequested) && <EventParticipationRequestDetail eventParticipationRequests={pendingRequests} isEventAuthor={isEventAuthor}/>}
          <EventParticipationSettleDetail eventParticipationRequests={approvedRequests}/>
          
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

          <CommentDetail
            userId={userId}
            eventId={event.id}
            comments={comments}
            pageCount={pageCount}
            totalComments={totalComments}
          />
        </div>
      </div>
    </div>
  )
}
export default EventDetail

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
