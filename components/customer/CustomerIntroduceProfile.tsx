"use client";

import { trpc } from "@/trpc/react";
import { Customer, User } from "@prisma/client";

interface ProfileProps {
  customer: Customer & {
    user: User;
  };
}

// プロフィール
const CustomerIntroduceProfile = ({ customer }: ProfileProps) => {
  const {
    data: user,
    isLoading,
    refetch,
  } = trpc.user.getUserByUserId.useQuery(
    {
      userId: customer.user.id,
    },
    {
      //  オプションにより、新しいデータがロードされる間、前のデータが表示され続けます。
      keepPreviousData: true,
    },
  );
  return (
    <div>
      <div className="text-xl font-bold text-center mb-5">
        イベント参加者プロフィール
      </div>
      <p>名前: {customer.customerName}</p>
      <p>名前: {user?.name}</p>
    </div>
  );
};

export default CustomerIntroduceProfile;
