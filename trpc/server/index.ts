import { router } from "@/trpc/server/trpc";
import { authRouter } from "@/trpc/server/routers/auth";
import { eventRouter } from "@/trpc/server/routers/event";
import { userRouter } from "@/trpc/server/routers/user";
import { commentRouter } from "@/trpc/server/routers/comment";

// ルーターの作成
export const appRouter = router({
  auth: authRouter,
  event: eventRouter,
  user: userRouter,
  comment: commentRouter,
});

// ルーターの型定義
export type AppRouter = typeof appRouter;
