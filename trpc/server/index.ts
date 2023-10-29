import { router } from "@/trpc/server/trpc"
import { authRouter } from "@/trpc/server/routers/auth"
import { postRouter } from "@/trpc/server/routers/post"
import { userRouter } from "@/trpc/server/routers/user"

// ルーターの作成
export const appRouter = router({
  auth: authRouter,
  post: postRouter,
  user: userRouter,
})

// ルーターの型定義
export type AppRouter = typeof appRouter
