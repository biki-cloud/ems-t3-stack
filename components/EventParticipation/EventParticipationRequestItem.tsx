import { EventParticipationRequest, User, Vendor } from "@prisma/client";
import { Button } from "../ui/button";
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns";
import { trpc } from "@/trpc/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"


interface EventParticipationRequestItemProps {
    eventParticipationRequest: (EventParticipationRequest & { vendor: Vendor & { user: User }})
    isEventAuthor: boolean
}

const EventParticipationRequestItem = ({
    eventParticipationRequest,
    isEventAuthor
}: EventParticipationRequestItemProps) => {
    const router = useRouter();
    const updateStatus = trpc.event.updateParticipationRequestStatus.useMutation();

    const {mutate: updateParticipationRequestStatus, isLoading} = trpc.event.updateParticipationRequestStatus.useMutation({
        onSuccess: () => {
            toast.success("更新しました");
            router.refresh(); // 画面をリロードして、リクエストを参加者リストに反映する
        },
        onError: (error) => {
            toast.error("更新に失敗しました");
            console.error(error);
        }
    });

    const handleUpdateStatus = (status: string) => {
        updateParticipationRequestStatus({
            requestId: eventParticipationRequest.id,
            status,
        });
        router.refresh()
    }

    return (
        <div>
            <ul className="grid gap-4 mt-4">
                <li className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={`/author/${eventParticipationRequest.vendor.user.id}`}>
                            <div className="flex items-center space-x-1">
                                <div className="relative w-6 h-6 flex-shrink-0">
                                    <Image
                                        src={eventParticipationRequest.vendor.user.image || "/default.png"}
                                        className="rounded-full object-cover"
                                        alt={eventParticipationRequest.vendor.user.name || "avatar"}
                                        fill
                                        sizes="24px"
                                    />
                                </div>
                                <div className="text-sm hover:underline break-words min-w-0">
                                    {eventParticipationRequest.vendor.user.name} |{" "}
                                    {format(new Date(eventParticipationRequest.createdAt), "yyyy/MM/dd HH:mm")}
                                </div>
                            </div>
                        </Link>
                    </div>
                    {isEventAuthor &&
                        <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleUpdateStatus("approved")} disabled={isLoading}>
                                承認
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleUpdateStatus("rejected")} disabled={isLoading}>
                                拒否
                            </Button>
                        </div>
                    }
                </li>
            </ul>
        </div>
    )
}

export default EventParticipationRequestItem;