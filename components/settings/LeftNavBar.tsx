"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

interface Item {
  title: string;
  href: string;
  icon: JSX.Element;
  isPC: boolean;
}

interface Props {
  items: Item[];
}

// サイドナビゲーション
const LeftNavBar = ({ items }: Props) => {
  const pathname = usePathname()
  return (
    <div>
      <nav className={cn("flex space-x-2 md:flex-col md:space-x-0 md:space-y-1")}>
        {items.map((item) => (
          item.isPC && (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              {item.icon}
              <span className="ml-1">
                {item.title}
              </span>
            </Link>
          )
        ))}
      </nav>
    </div>
  )
}

export default LeftNavBar
