import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/trpc/server";
import { getBaseUrl } from "../url";

// バックエンドtRPCクライアント
export const trpc = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
