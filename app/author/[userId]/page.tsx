import { trpc } from "@/trpc/client";
import { userEventPerPage } from "@/lib/utils";
import AuthorDetail from "@/components/author/AuthorDetail";

interface AuthorPageProps {
  params: {
    userId: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
}

// ユーザー投稿詳細ページ
const AuthorDetailPage = async ({ params, searchParams }: AuthorPageProps) => {
  const { userId } = params;
  const { page, perPage } = searchParams;

  const limit =
    typeof perPage === "string" ? parseInt(perPage) : userEventPerPage;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  // ユーザー投稿詳細取得
  const { user, totalEvents } = await trpc.user.getUserByIdEvent({
    userId,
    limit,
    offset,
  });

  if (!user) {
    return <div className="text-center">ユーザーは存在しません</div>;
  }

  const pageCount = Math.ceil(totalEvents / limit);

  return (
    <AuthorDetail user={user} pageCount={pageCount} totalEvents={totalEvents} />
  );
};

export default AuthorDetailPage;
