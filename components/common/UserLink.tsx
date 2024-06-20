import Link from "next/link"
import Image from "next/image"

interface UserLinkProps {
  userId: string | null
  userName: string | null
  userImage: string | null
  userType: "vendor" | "organizer"
}

const UserLink = ({ userId, userName, userImage, userType }: UserLinkProps) => (
  <Link href={`/${userType}/${userId}`}>
    <div className="flex items-center space-x-1">
      <div className="relative w-6 h-6 flex-shrink-0">
        <Image
          src={userImage || "/default.png"}
          className="rounded-full object-cover"
          alt={userName || "avatar"}
          fill
          sizes="24px"
        />
      </div>
      <div className="text-sm hover:underline">{userName}</div>
    </div>
  </Link>
)

export default UserLink