"use client"

import { Comment, User, CommentLike } from "@prisma/client"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { Pencil, Trash2 } from "lucide-react"
import { trpc } from "@/trpc/react"
import CommentLikeDetail from "@/components/comment/CommentLikeDetail"
import Link from "next/link"
import toast from "react-hot-toast"
import Image from "next/image"
import { Role, getRoleFromUser } from "@/lib/utils"
import UserLink from "../common/UserLink"

interface CommentItemProps {
  comment: Comment & { user: User & Role } & {
    hasLiked: boolean
    commentLikeId: string | null
  } & { likes: CommentLike[] }
  userId?: string
}

// コメント一覧のアイテム
const CommentItem = ({ comment, userId }: CommentItemProps) => {
  const router = useRouter()

  // コメント削除
  const { mutate: deleteComment, isLoading } =
    trpc.comment.deleteComment.useMutation({
      onSuccess: () => {
        toast.success("コメントを削除しました")
        router.refresh()
      },
      onError: (error) => {
        toast.error("コメントの削除に失敗しました")
        console.error(error)
      },
    })

  const handleDeleteComment = () => {
    // コメント削除
    deleteComment({
      commentId: comment.id,
    })
  }

  let user_role = getRoleFromUser(comment.user)
  console.log(comment.user)
  console.log(user_role)

  return (
    <div>
      <div className="flex items-center justify-between p-2 sm:p-5 border-b">
        {user_role && (
          <UserLink userId={user_role.id} userName={comment.user.name} userImage={comment.user.image} userType={comment.user.role as "vendor" | "organizer"} />
        )}

        <div className="text-sm">
          {format(new Date(comment.updatedAt), "yyyy/MM/dd HH:mm")}
        </div>
      </div>

      <div className="p-2 sm:p-5 leading-relaxed break-words whitespace-pre-wrap">
        <div>{comment.content}</div>
      </div>

      <div className="flex items-center justify-end space-x-1 pr-1 pb-1">
        <CommentLikeDetail comment={comment} userId={userId} />

        {userId === comment.user.id && (
          <>
            <Link href={`/comment/${comment.id}/edit`}>
              <div className="hover:bg-gray-100 p-2 rounded-full">
                <Pencil className="w-5 h-5" />
              </div>
            </Link>

            <button
              className="hover:bg-gray-100 p-2 rounded-full"
              disabled={isLoading}
              onClick={handleDeleteComment}
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default CommentItem
