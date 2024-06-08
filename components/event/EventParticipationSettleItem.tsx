import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { EventParticipationRequest, User, Vendor } from "@prisma/client";
import Image from "next/image"
import { format } from "date-fns";


interface EventParticipationRequestItemProps {
    eventParticipationRequest: (EventParticipationRequest & { vendor: Vendor & { user: User } })
}

const EventParticipationSettleItem = ({
    eventParticipationRequest,
}: EventParticipationRequestItemProps) => {
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
                        <div>
                            <p className="text-gray-500">{eventParticipationRequest.status}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
};

export default EventParticipationSettleItem;

