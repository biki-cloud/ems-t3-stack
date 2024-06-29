import { notFound } from "next/navigation";
import VendorIntroduceProfile from "@/components/vendor/VendorIntroduceProfile";
import prisma from "@/lib/prisma";

interface VendorProfilePageProps {
  params: {
    vendorId: string;
  };
}

// ベンダープロフィールページ
const VendorIntoroduceProfilePage = async ({
  params,
}: VendorProfilePageProps) => {
  const { vendorId } = params;

  const vendor = await prisma.vendor.findUnique({
    where: {
      id: vendorId,
    },
    include: {
      user: true,
    },
  });

  if (!vendor) {
    notFound();
  }

  return <VendorIntroduceProfile vendor={vendor} />;
};

export default VendorIntoroduceProfilePage;
