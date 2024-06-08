import { publicProcedure, privateProcedure, router } from "@/trpc/server/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createCloudImage, deleteCloudImage } from "@/actions/cloudImage";
import { extractPublicId } from "cloudinary-build-url";
import prisma from "@/lib/prisma";

export const eventRouter = router({
  // イベント新規作成
  createEvent: privateProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        location: z.string(),
        base64Image: z.string().optional(),
        premium: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { title, content, location, base64Image, premium } = input;
        const userId = ctx.user.id;

        if (!ctx.user.isAdmin) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "投稿権限がありません",
          });
        }

        let image_url;

        // 画像をアップロードした場合はCloudinaryに保存
        if (base64Image) {
          image_url = await createCloudImage(base64Image);
        }

        // 投稿保存
        const event = await prisma.event.create({
          data: {
            userId,
            title,
            content,
            location,
            image: image_url,
            premium,
          },
        });

        return event;
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
            message: "投稿に失敗しました",
          });
        }
      }
    }),
  // 投稿一覧取得
  getEvents: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        offset: z.number(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { offset, limit } = input;

        // 投稿一覧取得
        const events = await prisma.event.findMany({
          skip: offset,
          take: limit,
          orderBy: {
            updatedAt: "desc",
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        });

        // 投稿の総数を取得
        const totalEvents = await prisma.event.count();

        return { events: events, totalEvents: totalEvents };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "投稿一覧取得に失敗しました",
        });
      }
    }),

  // 投稿詳細取得
  getEventById: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { eventId: eventId } = input;

        // 投稿詳細取得
        const event = await prisma.event.findUnique({
          where: { id: eventId },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        });

        return event;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "投稿詳細取得に失敗しました",
        });
      }
    }),

  // 投稿編集
  updateEvent: privateProcedure
    .input(
      z.object({
        eventId: z.string(),
        title: z.string(),
        content: z.string(),
        location: z.string(),
        base64Image: z.string().optional(),
        premium: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const {
          eventId: eventId,
          title,
          content,
          location,
          base64Image,
          premium,
        } = input;
        const userId = ctx.user.id;
        let image_url;

        if (!ctx.user.isAdmin) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "編集権限がありません",
          });
        }

        if (base64Image) {
          const event = await prisma.event.findUnique({
            where: { id: eventId },
            include: {
              user: {
                select: {
                  id: true,
                },
              },
            },
          });

          if (!event) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "投稿が見つかりませんでした",
            });
          }

          if (userId !== event.user.id) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "投稿の編集権限がありません",
            });
          }

          // 古い画像を削除
          if (event.image) {
            const publicId = extractPublicId(event.image);
            await deleteCloudImage(publicId);
          }

          // 新しい画像をアップロード
          image_url = await createCloudImage(base64Image);
        }

        // 投稿更新
        await prisma.event.update({
          where: {
            id: eventId,
          },
          data: {
            title,
            content,
            location,
            premium,
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
            message: "投稿の編集に失敗しました",
          });
        }
      }
    }),
  // 投稿削除
  deleteEvent: privateProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { eventId: eventId } = input;
        const userId = ctx.user.id;

        const event = await prisma.event.findUnique({
          where: { id: eventId },
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
        });

        if (!event) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "投稿が見つかりませんでした",
          });
        }

        if (userId !== event.user.id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "投稿の削除権限がありません",
          });
        }

        // 画像を削除
        if (event.image) {
          const publicId = extractPublicId(event.image);
          await deleteCloudImage(publicId);
        }

        await prisma.event.delete({
          where: {
            id: eventId,
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
            message: "投稿の削除に失敗しました",
          });
        }
      }
    }),

  // 参加リクエストの作成
  createEventParticipationRequest: privateProcedure
    .input(
      z.object({
        eventId: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { eventId, status } = input;
      const vendorId = ctx.user.id; // ベンダーIDをセッションから取得

      // ユーザからvendorを取得
      const vendor = await prisma.vendor.findUnique({
        where: { userId: vendorId },
      });
      if (!vendor) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "ベンダーが見つかりませんでした",
        });
      }

      // vendor がすでにリクエストを送っているか確認
      const existingRequest = await prisma.eventParticipationRequest.findFirst({
        where: {
          eventId: eventId,
          vendorId: vendor.id,
        },
      });
      if (existingRequest) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "すでにリクエストがあります",
        });
      }

      const request = await prisma.eventParticipationRequest.create({
        data: {
          eventId: eventId,
          vendorId: vendor.id,
          status: status,
        },
      });

      return request;
    }),

  // 参加リクエストの一覧取得
  getParticipationRequests: privateProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { eventId } = input;

      const requests = await prisma.eventParticipationRequest.findMany({
        where: {
          eventId: eventId,
        },
        // eventParticipationRequestに紐ずくvendor情報も取得
        // vendor情報に紐ずくuser情報も取得 
        include: {
          vendor: {
            include: {
              user: true,
            },
          },
          event: true,
        },
      });

      return requests;
    }),

  // 参加リクエストのステータスを更新
  updateParticipationRequestStatus: privateProcedure
    .input(
      z.object({
        requestId: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { requestId, status } = input;
      return await prisma.eventParticipationRequest.update({
        where: { id: requestId },
        data: { status },
      });
    }),
});
