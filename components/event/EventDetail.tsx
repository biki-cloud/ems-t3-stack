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
"use client";

import {
  Event,
  User,
  Comment,
  CommentLike,
  EventParticipationRequest,
  Vendor,
} from "@prisma/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { trpc } from "@/trpc/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import CommentDetail from "@/components/comment/CommentDetail";

import { Button } from "@/components/ui/button";
import EventParticipationRequestDetail from "@/components/EventParticipation/EventParticipationRequestDetail";
import EventParticipationSettleDetail from "@/components/EventParticipation/EventParticipationSettleDetail";
import genreMapping from "@/components/objects/mapping";
import { Role, getRoleFromUser } from "@/lib/utils";
import UserLink from "../common/UserLink";

interface EventDetailProps {
  event: Event & {
    user: User & Role;
  };
  userId?: string;
  comments: (Comment & { user: User & Role } & {
    hasLiked: boolean;
    commentLikeId: string | null;
  } & { likes: CommentLike[] })[];
  pageCount: number;
  totalComments: number;
  user: User | null;
  eventParticipationRequests: (EventParticipationRequest & {
    vendor: Vendor & { user: User & Role };
  })[];
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
  const user_role = getRoleFromUser(event.user);

  const router = useRouter();

  // 投稿削除
  const { mutate: deleteEvent, isLoading } = trpc.event.deleteEvent.useMutation(
    {
      onSuccess: () => {
        toast.success("投稿を削除しました");
        router.refresh();
        router.push(`/`);
      },
      onError: (error) => {
        toast.error(error.message);
        console.error(error);
      },
    },
  );

  // 削除ボタンクリック時の処理
  const handleDeleteEvent = () => {
    if (event.user.id !== userId) {
      toast.error("投稿は削除できません");
      return;
    }

    // 投稿削除
    deleteEvent({
      eventId: event.id,
    });
  };

  // 既存のコードに追加
  const { mutate: sendParticipationRequest, isLoading: isRequestLoading } =
    trpc.event.createEventParticipationRequest.useMutation({
      onSuccess: () => {
        toast.success("参加リクエストを送りました");
        router.refresh();
      },
      onError: (error) => {
        toast.error(`リクエスト送信エラー: ${error.message}`);
      },
    });

  // ユーザーがベンダーかどうか
  const isVendor = user?.role == "vendor";

  // pendingとapprovedに分ける
  const pendingRequests = eventParticipationRequests.filter(
    (request) => request.status === "pending",
  );
  const approvedRequests = eventParticipationRequests.filter(
    (request) => request.status === "approved",
  );

  // ユーザーがイベントのオーガナイザーかどうか
  const isEventAuthor = event.userId == user?.id;

  // 申請リスト一覧にログインしているvendorがいるか
  const isVendorRequested = eventParticipationRequests.some(
    (request) => request.vendor.user.id === userId,
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <div>
            {user_role && (
              <UserLink
                userId={user_role.id}
                userName={event.user.name}
                userImage={event.user.image}
                userType={event.user.role as "vendor" | "organizer"}
              />
            )}
            <div className="text-sm hover:underline break-words min-w-0">
              {format(new Date(event.updatedAt), "yyyy/MM/dd HH:mm")}
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
              onClick={() =>
                sendParticipationRequest({
                  eventId: event.id,
                  status: "pending",
                })
              }
              disabled={isRequestLoading || isVendorRequested}
            >
              {(isVendorRequested && "参加リクエスト送信済み") ||
                "参加リクエストを送る"}
            </Button>
          </div>
        )}
        <div className="grid gap-6">
          {(isEventAuthor || isVendorRequested) && (
            <EventParticipationRequestDetail
              eventParticipationRequests={pendingRequests}
              isEventAuthor={isEventAuthor}
            />
          )}
          <EventParticipationSettleDetail
            eventParticipationRequests={approvedRequests}
          />

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
  );
};
export default EventDetail;
