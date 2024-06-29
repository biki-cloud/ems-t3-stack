import { publicProcedure, privateProcedure, router } from "@/trpc/server/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createCloudImage, deleteCloudImage } from "@/actions/cloudImage";
import { extractPublicId } from "cloudinary-build-url";
import prisma from "@/lib/prisma";
import { ro, tr } from "date-fns/locale";

export const userRouter = router({
  // ユーザー情報更新
  updateUser: privateProcedure
    .input(
      z.object({
        name: z.string(),
        introduction: z.string().optional(),
        base64Image: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { name, introduction, base64Image } = input;
        const userId = ctx.user.id;
        let image_url;

        if (base64Image) {
          // ユーザーの検索
          const user = await prisma.user.findUnique({
            where: { id: userId },
          });

          if (!user) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "ユーザーが見つかりませんでした",
            });
          }

          // 古い画像の削除
          if (user.image) {
            const publicId = extractPublicId(user.image);
            await deleteCloudImage(publicId);
          }

          // 新しい画像のアップロード
          image_url = await createCloudImage(base64Image);
        }

        // ユーザー情報更新
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            name,
            introduction,
            ...(image_url && { image: image_url }),
          },
        });
      } catch (error) {
        console.log(error);

        if (error instanceof TRPCError && error.code === "BAD_REQUEST") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "プロフィール編集に失敗しました",
          });
        }
      }
    }),

  // 主催者情報更新
  updateOrganizer: privateProcedure
    .input(
      z.object({
        organizationName: z
          .string()
          .min(3, { message: "3文字以上入力する必要があります" }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { organizationName } = input;
        const userId = ctx.user.id;

        // 主催者の検索
        const organizer = await prisma.organizer.findUnique({
          where: { userId },
        });

        if (!organizer) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "主催者が見つかりませんでした",
          });
        }

        // 主催者情報更新
        await prisma.organizer.update({
          where: {
            userId,
          },
          data: {
            organizationName,
          },
        });
      } catch (error) {
        console.log(error);

        if (error instanceof TRPCError && error.code === "BAD_REQUEST") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "プロフィール編集に失敗しました",
          });
        }
      }
    }),

  updateVendor: privateProcedure
    .input(
      z.object({
        vendorName: z
          .string()
          .min(3, { message: "3文字以上入力する必要があります" }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { vendorName } = input;
        const userId = ctx.user.id;

        // ベンダーの検索
        const vendor = await prisma.vendor.findUnique({
          where: { userId },
        });

        if (!vendor) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "ベンダーが見つかりませんでした",
          });
        }

        // ベンダー情報更新
        await prisma.vendor.update({
          where: {
            userId,
          },
          data: {
            vendorName,
          },
        });
      } catch (error) {
        console.log(error);

        if (error instanceof TRPCError && error.code === "BAD_REQUEST") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "プロフィール編集に失敗しました",
          });
        }
      }
    }),

  // ユーザー投稿詳細取得
  getUserByIdEvent: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        limit: z.number(),
        offset: z.number(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { userId, limit, offset } = input;

        if (!userId) {
          return { user: null, totalEvents: 0 };
        }

        // ユーザー投稿詳細取得
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: {
            events: {
              skip: offset,
              take: limit,
              orderBy: {
                updatedAt: "desc",
              },
            },
          },
        });

        if (!user) {
          return { user: null, totalEvents: 0 };
        }

        // 投稿の総数を取得
        const totalEvents = await prisma.event.count({
          where: { userId },
        });

        return { user, totalEvents };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "ユーザー投稿詳細の取得に失敗しました",
        });
      }
    }),

  // 特定のユーザーの詳細を取得
  getUserByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { userId } = input;

        // ユーザー詳細を取得
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!user) {
          return null;
        }

        return user;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "ユーザー詳細の取得に失敗しました",
        });
      }
    }),
});
