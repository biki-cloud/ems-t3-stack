import { EventParticipationRequest, User, Vendor } from "@prisma/client";
import { Button } from "../ui/button";
import Image from "next/image"


interface EventParticipationRequestItemProps {
    eventParticipationRequest: (EventParticipationRequest & { vendor: Pick<Vendor, "id" | "vendorName"> & { user: Pick<User, "name" | "image"> } })
}

const EventParticipationRequestItem = ({
    eventParticipationRequest,
}: EventParticipationRequestItemProps) => {
    return (
        <div>
            <ul className="grid gap-4 mt-4">
                <li className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative w-10 h-10 flex-shrink-0">
                            <Image
                                src={eventParticipationRequest.vendor.user.image || "/default.png"}
                                className="rounded-full object-cover"
                                alt={eventParticipationRequest.vendor.user.name || "avatar"}
                                fill
                                sizes="40px"
                            />
                        </div>
                        <div>
                            <p className="font-medium">{eventParticipationRequest.vendor.user.name}</p>
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