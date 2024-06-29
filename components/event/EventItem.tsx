"use client";

import { Role, getRoleFromUser } from "@/lib/utils";
import { Event, User } from "@prisma/client";
import { formatDistance } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import UserLink from "../common/UserLink";

interface EventItemProps {
  event: Event & {
    user: User & Role;
  };
}

// 投稿一覧のアイテム
const EventItem = ({ event: event }: EventItemProps) => {
  // 投稿内容を60文字に制限
  const content =
    event.content.length > 60
      ? event.content.slice(0, 60) + "..."
      : event.content;

  // 日付
  const updatedAt = new Date(event.updatedAt ?? 0);
  const now = new Date();
  const date = formatDistance(updatedAt, now, { addSuffix: true, locale: ja });

  const user_role = getRoleFromUser(event.user);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-3 space-y-3 sm:space-y-0">
        <Link href={`/event/${event.id}`} className="relative">
          <div className="aspect-[16/9] relative col-span-3 sm:col-span-1 overflow-hidden rounded-md">
            <Image
              fill
              src={event.image || "/noImage.png"}
              alt="thumbnail"
              className="object-cover rounded-md transition-all hover:scale-105"
              sizes="100px"
            />
          </div>
        </Link>

        <div className="col-span-1 sm:col-span-2 space-y-3 break-words">
          <div className="font-bold text-lg hover:underline">
            <Link href={`/event/${event.id}`}>{event.title}</Link>
          </div>

          <div className="hover:underline">
            <Link href={`/event/${event.id}`}>{content}</Link>
          </div>

          <div>
            {user_role && (
              <UserLink
                userId={user_role.id}
                userName={event.user.name}
                userImage={event.user.image}
                userType={event.user.role as "vendor" | "organizer"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
