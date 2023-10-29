import { trpc } from "@/trpc/client"
import { getAuthSession } from "@/lib/nextauth"
import PostDetail from "@/components/post/PostDetail"

interface PostDetailPageProps {
  params: {
    postId: string
  }
}

// 投稿詳細ページ
const PostDetailPage = async ({ params }: PostDetailPageProps) => {
  const { postId } = params

  // 認証情報取得
  const user = await getAuthSession()

  // 投稿詳細取得
  const post = await trpc.post.getPostById({ postId })

  if (!post) {
    return (
      <div className="text-center text-sm text-gray-500">投稿はありません</div>
    )
  }

  return <PostDetail post={post} userId={user?.id} />
}

export default PostDetailPage
