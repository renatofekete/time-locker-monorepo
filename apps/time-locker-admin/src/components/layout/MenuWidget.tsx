import { Card } from "time-locker-ui";
import HeadphonesRound from "../../assets/icons/HeadphonesRound.svg?react";
import UserPlus from "../../assets/icons/UserPlus.svg?react";

type MenuWidgetProps = {
  className?: string;
};

const MenuWidget = ({ className }: MenuWidgetProps) => {
  return (
    <Card title="Quick menu" className={`h-full ${className || ""}`}>
      <div className="flex gap-5 mb-5 mt-1.5">
        <a
          href="/#"
          className="bg-blue-500 text-white py-6 px-4 text-center border border-neutral-300/50 flex-1 rounded-xs"
        >
          <UserPlus className="mx-auto mb-3" />{" "}
          <p className="font-semibold mb-1.5">Add new courier</p>{" "}
          <p className="text-xs font-light leading-[100%]">
            Create a new user profile for your courier
          </p>
        </a>

        <a
          href="/#"
          className="py-6 px-4 text-center border border-neutral-300/50 flex-1 rounded-xs"
        >
          <HeadphonesRound className="mx-auto mb-3" />{" "}
          <p className="font-semibold mb-1.5">Contact support</p>{" "}
          <p className="text-xs font-light leading-[100%] mt-1.5">
            Send a message or gives us a call
          </p>
        </a>
      </div>
    </Card>
  );
};

export default MenuWidget;
