import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";
import VendorProfileEdit from "@/components/vendor/VendorProfileEdit";
import prisma from "@/lib/prisma";

// プロフィール編集ページ
const VendorProfileEditPage = async () => {
  // 認証情報取得
  const user = await getAuthSession();

  if (!user) {
    redirect("/login");
  }

  const vendor = await prisma.vendor.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  if (!vendor) {
    redirect("/login");
  }

  return <VendorProfileEdit vendor={vendor} />;
};

export default VendorProfileEditPage;
