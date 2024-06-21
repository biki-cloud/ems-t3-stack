import { publicProcedure, privateProcedure, router } from "@/trpc/server/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createCloudImage, deleteCloudImage } from "@/actions/cloudImage";
import { extractPublicId } from "cloudinary-build-url";
import prisma from "@/lib/prisma";
import { ro } from "date-fns/locale";

export const userRouter = router({
  // ユーザー情報更新
  updateUser: privateProcedure
    .input(
      z.object({
        name: z.string(),
        introduction: z.string().optional(),
        base64Image: z.string().optional(),
      })
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

  // ユーザー投稿詳細取得
  getUserByIdEvent: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        limit: z.number(),
        offset: z.number(),
      })
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

  // ユーザーロール情報取得
  getUserRoleByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { userId } = input;

      // ユーザー情報取得
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return null;
      }

      let roleData;
      if (user.role === "organizer") {
        const organizer = await prisma.organizer.findUnique({
          where: { userId: userId },
        });
        roleData = organizer;
      } else if (user.role === "vendor") {
        const vendor = await prisma.vendor.findUnique({
          where: { userId: userId },
        });
        roleData = vendor;
      } else if (user.role == "customer") {
        const customer = await prisma.customer.findUnique({
          where: { userId: userId },
        });
        roleData = customer;
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "無効なユーザー役割です",
        });
      }
      // user_role の createdAt と updatedAt を Date 型に変換
      const formattedUserRole = roleData
        ? {
            ...roleData,
            createdAt: new Date(roleData.createdAt),
            updatedAt: new Date(roleData.updatedAt),
          }
        : null;
      return formattedUserRole;
    }),
});
