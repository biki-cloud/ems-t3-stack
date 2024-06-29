"use client";

import { Role, cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import FootNavBar from "./FootNavBar";
import LeftNavBar from "./LeftNavBar";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { is } from "date-fns/locale";

// ナビゲーション
const items = [
  {
    title: "イベント",
    href: "/",
    icon: <EventNoteIcon />,
    isSP: true,
    isPC: true,
  },
  {
    title: "ユーザ",
    href: "/settings/userProfile",
    icon: <AccountCircleIcon />,
    isSP: true,
    isPC: true,
  },
  {
    title: "イベント主催者",
    href: "/settings/organizerProfile",
    icon: <AssignmentIndIcon />,
    isSP: true,
    isPC: true,
  },
  {
    title: "イベント出店者",
    href: "/settings/vendorProfile",
    icon: <AssignmentIndIcon />,
    isSP: true,
    isPC: true,
  },
  {
    title: "パスワード変更",
    href: "/settings/password",
    icon: <LockIcon />,
    isSP: false,
    isPC: true,
  },
];

interface SidebarNavProps {
  user: (User & Role) | null;
}

// サイドナビゲーション
const CustomNavBar = ({ user }: SidebarNavProps) => {
  const [isDevicePC, setIsDevicePC] = useState(false);

  // ユーザーの役割に基づいてナビゲーションアイテムをフィルタリング
  const filteredItems = items.filter((item) => {
    if (user?.role === "organizer" && item.href === "/settings/vendorProfile") {
      return false;
    }
    if (user?.role === "vendor" && item.href === "/settings/organizerProfile") {
      return false;
    }
    if (
      user?.role !== "organizer" &&
      user?.role !== "vendor" &&
      (item.href === "/settings/vendorProfile" ||
        item.href === "/settings/organizerProfile")
    ) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDevicePC(window.innerWidth > 700);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      {isDevicePC ? (
        <LeftNavBar items={filteredItems} />
      ) : (
        <FootNavBar items={filteredItems} />
      )}
    </div>
  );
};

export default CustomNavBar;
