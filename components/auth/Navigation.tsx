"use client";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import UserNavigation from "@/components/auth/UserNavigation";
import Link from "next/link";
import { ThemeModeToggle } from "../ui/theme";
import { Role } from "@/lib/utils";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

interface NavigationProps {
  user: (User & Role) | null;
}

// ナビゲーション
const Navigation = ({ user }: NavigationProps) => {
  return (
    <header className="shadow-lg shadow-gray-100 mb-10">
      <div className="container mx-auto flex max-w-screen-md items-center justify-between px-2 py-3">
        <Link href="/" className="cursor-pointer text-xl font-bold">
          イベントマッチングサービス
        </Link>

        {user ? (
          <div className="flex items-center justify-center space-x-3">
            <UserNavigation user={user} />
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <Button asChild variant="ghost" className="font-bold">
              <Link href="/login">
                <LoginIcon />
                <span className="ml-1">ログイン</span>
              </Link>
            </Button>
            <Button asChild variant="default" className="font-bold">
              <Link href="/signup">
                <PersonAddIcon />
                <span className="ml-1"> 新規登録</span>
              </Link>
            </Button>
          </div>
        )}

        <ThemeModeToggle />
      </div>
    </header>
  );
};

export default Navigation;
