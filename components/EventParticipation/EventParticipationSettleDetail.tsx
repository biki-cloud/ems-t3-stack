import { EventParticipationRequest, User, Vendor } from "@prisma/client";
import EventParticipationSettleItem from "./EventParticipationSettleItem";
import { Role } from "@/lib/utils";

interface EventParticipationRequestDetailProps {
  // 型安全性、自動補完を考慮し、interfaceを使う
  //EventParticipationRequest.vendor.userなどの情報を扱う場合は下記のように型を定義する。定義した内容しか使用できない。
  eventParticipationRequests: (EventParticipationRequest & {
    vendor: Vendor & { user: User & Role };
  })[];
}

const EventParticipationSettleDetail = ({
  eventParticipationRequests,
}: EventParticipationRequestDetailProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold">出店者</h2>
      {eventParticipationRequests.map((eventParticipationRequest) => (
        <div key={eventParticipationRequest.id}>
          <EventParticipationSettleItem
            eventParticipationRequest={eventParticipationRequest}
          />
        </div>
      ))}
    </div>
  );
};

export default EventParticipationSettleDetail;
