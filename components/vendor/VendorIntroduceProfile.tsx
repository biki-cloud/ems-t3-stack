"use client";

import { Vendor, User } from "@prisma/client";
import { trpc } from "@/trpc/react";

interface ProfileProps {
  vendor: Vendor & {
    user: User;
  };
}

// プロフィール
const VendorIntroduceProfile = ({ vendor: vendor }: ProfileProps) => {
  const { data: user } = trpc.user.getUserByUserId.useQuery(
    {
      userId: vendor.user.id,
    },
    {
      //  オプションにより、新しいデータがロードされる間、前のデータが表示され続けます。
      keepPreviousData: true,
    },
  );

  return (
    <div>
      <div className="text-xl font-bold text-center mb-5">
        イベント出店者プロフィール
      </div>
      <p>事業者名: {vendor.vendorName}</p>
      <p>名前: {user?.name}</p>
    </div>
  );
};

export default VendorIntroduceProfile;
