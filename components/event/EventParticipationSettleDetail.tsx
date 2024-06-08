import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";


const EventParticipationSettleDetail = () => {
    return (
        <div>
            <h2 className="text-xl font-bold">参加確定</h2>
            <ul className="grid gap-4 mt-4">
                <li className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage alt="Avatar" src="/placeholder-user.jpg"/>
                            <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">Sarah Miller</p>
                            <p className="text-gray-500">Acme Inc.</p>
                        </div>
                    </div>
                    <Button size="sm" variant="ghost">
                        <XIcon className="w-5 h-5" />
                        <span className="sr-only">Remove</span>
                    </Button>
                </li>
                <li className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                            <AvatarFallback>TW</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">Tom Wilson</p>
                            <p className="text-gray-500">Widgets Inc.</p>
                        </div>
                    </div>
                    <Button size="sm" variant="ghost">
                        <XIcon className="w-5 h-5" />
                        <span className="sr-only">Remove</span>
                    </Button>
                </li>
            </ul>
        </div>
    )
};

export default EventParticipationSettleDetail;

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

