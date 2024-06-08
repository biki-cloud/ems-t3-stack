import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import Image from "next/image"
import { EventParticipationRequest, Organizer, User, Vendor } from "@prisma/client";

interface EventParticipationRequestDetailProps {
    eventParticipationRequests: (EventParticipationRequest & { vendor: Pick<Vendor, "id" | "vendorName"> & { user: Pick<User, "name" | "image"> } })[]
}
// 表示するもの
// vendor name, image, status

const EventParticipationRequestDetail = ({
    eventParticipationRequests,
}: EventParticipationRequestDetailProps) => {
    return (
        <div>
            {eventParticipationRequests.map((eventParticipationRequest) => (
                <p key={eventParticipationRequest.id}>{eventParticipationRequest.vendor.vendorName}: {eventParticipationRequest.status} {eventParticipationRequest.vendor.user.name}</p>
            ))}
            <h2 className="text-xl font-bold">参加リクエスト中(organizer用)</h2>
            <ul className="grid gap-4 mt-4">
                <li className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="aspect-[16/9] relative col-span-3 sm:col-span-1 overflow-hidden rounded-md">
                            {/* <Image
                                fill
                                src={vendor.image || "/noImage.png"}
                                alt="thumbnail"
                                className="object-cover rounded-md transition-all hover:scale-105"
                                sizes="100px"
                            /> */}
                        </div>
                        <Avatar>
                            <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-gray-500">Acme Inc.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                            Approve
                        </Button>
                        <Button size="sm" variant="ghost">
                            Decline
                        </Button>
                    </div>
                </li>
                <li className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                            <AvatarFallback>JA</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">Jane Appleseed</p>
                            <p className="text-gray-500">Widgets Inc.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                            Approve
                        </Button>
                        <Button size="sm" variant="ghost">
                            Decline
                        </Button>
                    </div>
                </li>
            </ul>
        </div>
    )
};

export default EventParticipationRequestDetail;