"use client";

import { Organizer, User } from "@prisma/client";
import { trpc } from "@/trpc/react";

interface ProfileProps {
  organizer: Organizer & {
    user: User;
  };
}

// プロフィール
const OrganizerIntroduceProfile = ({ organizer }: ProfileProps) => {
  const { data: user } = trpc.user.getUserByUserId.useQuery(
    {
      userId: organizer.user.id,
    },
    {
      //  オプションにより、新しいデータがロードされる間、前のデータが表示され続けます。
      keepPreviousData: true,
    },
  );

  return (
    <div>
      <div className="text-xl font-bold text-center mb-5">
        イベント主催者プロフィール
      </div>
      <p>事業者名: {organizer.organizationName}</p>
      <p>名前: {user?.name}</p>
    </div>
  );
};

export default OrganizerIntroduceProfile;
