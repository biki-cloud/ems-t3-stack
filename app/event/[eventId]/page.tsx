import { trpc } from "@/trpc/client";
import { getAuthSession } from "@/lib/nextauth";
import { commentPerPage } from "@/lib/utils";
import EventDetail from "@/components/event/EventDetail";

interface EventDetailPageProps {
  params: {
    eventId: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
}

// 投稿詳細ページ
const EventDetailPage = async ({
  params,
  searchParams,
}: EventDetailPageProps) => {
  const { eventId: eventId } = params;
  const { page, perPage } = searchParams;

  const limit =
    typeof perPage === "string" ? parseInt(perPage) : commentPerPage;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  // 認証情報取得
  const user = await getAuthSession();

  // 投稿詳細取得
  const event = await trpc.event.getEventById({ eventId: eventId });

  if (!event) {
    return (
      <div className="text-center text-sm text-gray-500">投稿はありません</div>
    );
  }

  // コメント一覧取得
  const { comments, totalComments } = await trpc.comment.getComments({
    userId: user?.id,
    eventId: eventId,
    limit,
    offset,
  });

  // イベント参加リクエスト一覧取得
  const eventParticipationRequests = await trpc.event.getParticipationRequests({
    eventId: eventId,
  });

  const pageCount = Math.ceil(totalComments / limit);

  return (
    <EventDetail
      event={event}
      userId={user?.id}
      comments={comments}
      pageCount={pageCount}
      totalComments={totalComments}
      user={user}
      eventParticipationRequests={eventParticipationRequests}
    />
  );
};

export default EventDetailPage;
