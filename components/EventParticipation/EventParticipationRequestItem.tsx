import { EventParticipationRequest, User, Vendor } from "@prisma/client";
import { Button } from "../ui/button";
import { trpc } from "@/trpc/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Role, getRoleFromUser } from "@/lib/utils";
import UserLink from "../common/UserLink";

interface EventParticipationRequestItemProps {
  eventParticipationRequest: EventParticipationRequest & {
    vendor: Vendor & { user: User & Role };
  };
  isEventAuthor: boolean;
}

const EventParticipationRequestItem = ({
  eventParticipationRequest,
  isEventAuthor,
}: EventParticipationRequestItemProps) => {
  const router = useRouter();

  const { mutate: updateParticipationRequestStatus, isLoading } =
    trpc.event.updateParticipationRequestStatus.useMutation({
      onSuccess: () => {
        toast.success("更新しました");
        router.refresh(); // 画面をリロードして、リクエストを参加者リストに反映する
      },
      onError: (error) => {
        toast.error("更新に失敗しました");
        console.error(error);
      },
    });

  const handleUpdateStatus = (status: string) => {
    updateParticipationRequestStatus({
      requestId: eventParticipationRequest.id,
      status,
    });
    router.refresh();
  };

  const user_role = getRoleFromUser(eventParticipationRequest.vendor.user);

  return (
    <div>
      <ul className="grid gap-4 mt-4">
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {user_role && (
              <UserLink
                userId={user_role.id}
                userName={eventParticipationRequest.vendor.user.name}
                userImage={eventParticipationRequest.vendor.user.image}
                userType={
                  eventParticipationRequest.vendor.user.role as
                    | "vendor"
                    | "organizer"
                }
              />
            )}
          </div>
          {isEventAuthor && (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleUpdateStatus("approved")}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-700 text-white"
              >
                承認
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleUpdateStatus("rejected")}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-700 text-white"
              >
                拒否
              </Button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default EventParticipationRequestItem;
