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

    const handleApprove = () => {
        updateStatus.mutate({
            requestId: eventParticipationRequest.id,
            status: 'approved'
        });
        toast.success("リクエストを承認しました");
        router.refresh(); // 画面をリロードして、リクエストを参加者リストに反映する
    };

    const handleReject = () => {
        updateStatus.mutate({
            requestId: eventParticipationRequest.id,
            status: 'rejected'
        });
        toast.success("リクエストを拒否しました");
        router.refresh(); // 画面をリロードして、リクエストを参加者リストに削除する
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
                            <Button size="sm" variant="outline" onClick={handleApprove}>
                                承認
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleReject}>
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