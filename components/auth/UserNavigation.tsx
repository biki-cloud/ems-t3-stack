"use client";

import { Customer, Organizer, User, Vendor } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import UserLink from "../common/UserLink";
import { Role, getRoleFromUser } from "@/lib/utils";

interface UserNavigationProps {
  user: User & Role;
}

// ユーザーナビゲーション
const UserNavigation = ({ user }: UserNavigationProps) => {
  const user_role = getRoleFromUser(user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={user.image || "/default.png"}
            className="rounded-full object-cover"
            alt={user.name || "avatar"}
            fill
            sizes="40px"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white p-2 w-[300px]" align="end">
        {user_role && (
          <UserLink
            userId={user_role.id}
            userName={user.name}
            userImage={user.image}
            userType={user.role as "vendor" | "organizer"}
          />
        )}

        <DropdownMenuSeparator />

        <Link href="/">
          <DropdownMenuItem className="cursor-pointer">
            イベント一覧
          </DropdownMenuItem>
        </Link>

        {user.organizer && (
          <Link href="/event/new">
            <DropdownMenuItem className="cursor-pointer">
              イベント新規作成
            </DropdownMenuItem>
          </Link>
        )}

        <Link href="/settings/userProfile">
          <DropdownMenuItem className="cursor-pointer">
            ユーザプロフィール
          </DropdownMenuItem>
        </Link>

        {user.organizer && (
          <Link href="/settings/organizerProfile">
            <DropdownMenuItem className="cursor-pointer">
              イベント主催者プロフィール
            </DropdownMenuItem>
          </Link>
        )}

        {user.vendor && (
          <Link href="/settings/vendorProfile">
            <DropdownMenuItem className="cursor-pointer">
              イベント出店者プロフィール
            </DropdownMenuItem>
          </Link>
        )}

        <Link href="/settings/password">
          <DropdownMenuItem className="cursor-pointer">
            パスワード変更
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          onSelect={async (event) => {
            event.preventDefault();
            await signOut({ callbackUrl: "/" });
          }}
          className="text-red-600 cursor-pointer"
        >
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavigation;
