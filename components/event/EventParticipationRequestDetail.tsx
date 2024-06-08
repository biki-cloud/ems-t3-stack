import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import Image from "next/image"
import { EventParticipationRequest, Organizer, User, Vendor } from "@prisma/client";
import EventParticipationRequestItem from "./EventParticipationRequestItem";

interface EventParticipationRequestDetailProps {
    // 型安全性、自動補完を考慮し、interfaceを使う
    //EventParticipationRequest.vendor.userなどの情報を扱う場合は下記のように型を定義する。定義した内容しか使用できない。 
    eventParticipationRequests: (EventParticipationRequest & { vendor: Vendor & { user: User } })[]
}

const EventParticipationRequestDetail = ({
    eventParticipationRequests,
}: EventParticipationRequestDetailProps) => {
    return (
        <div>
            <h2 className="text-xl font-bold">参加リクエスト中(organizer用)</h2>
            {eventParticipationRequests.map((eventParticipationRequest) => (
                <div
                    key={eventParticipationRequest.id}
                >
                    <EventParticipationRequestItem eventParticipationRequest={eventParticipationRequest} isOrganizer={true}/>
                </div>
            ))}
        </div>
    )
};

export default EventParticipationRequestDetail;