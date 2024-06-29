import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";
import CreateEvent from "@/components/event/EventCreate";

// イベント新規作成ページ
const EventNewPage = async () => {
  // 認証情報取得
  const user = await getAuthSession();

  if (!user) {
    redirect("/login");
  }

  if (!user.isAdmin) {
    return (
      <div className="text-center text-sm text-gray-500">
        投稿権限がありません
      </div>
    );
  }

  return <CreateEvent />;
};

export default EventNewPage;
