import { EventParticipationRequest, User, Vendor } from "@prisma/client";
import { Button } from "../ui/button";
import Image from "next/image"
import Link from "next/link"


interface EventParticipationRequestItemProps {
    eventParticipationRequest: (EventParticipationRequest & { vendor: Vendor & { user: User } })
}

const EventParticipationRequestItem = ({
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
                                <div className="text-sm hover:underline">{eventParticipationRequest.vendor.user.name}</div>
                            </div>
                        </Link>
                        <div>
                            <p className="text-gray-500">{eventParticipationRequest.status}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                            承認
                        </Button>
                        <Button size="sm" variant="ghost">
                            拒否
                        </Button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default EventParticipationRequestItem;