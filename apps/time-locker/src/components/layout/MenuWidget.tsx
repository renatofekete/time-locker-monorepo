import Card from "../ui/card/Card";
import HeadphonesRound from "../../assets/icons/HeadphonesRound.svg?react";
import UserPlus from "../../assets/icons/UserPlus.svg?react";
import { Link } from "react-router-dom";
import paths from "@/config/paths";
import { useState } from "react";
import InfoModal from "./InfoModal";

type MenuWidgetProps = {
  className?: string;
};

const MenuWidget = ({ className }: MenuWidgetProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <Card title="Quick menu" className={`h-full ${className || ""}`}>
      <div className="flex gap-5 mb-5 mt-1.5">
        <Link
          to={paths.courierRegister.getHref()}
          className="bg-blue-500 text-white py-6 px-4 text-center border border-neutral-300/50 flex-1 rounded-xs"
        >
          <UserPlus className="mx-auto mb-3" />{" "}
          <p className="font-semibold mb-1.5">Add new courier</p>{" "}
          <p className="text-xs font-light leading-[100%]">
            Create a new user profile for your courier
          </p>
        </Link>

        <div
          onClick={toggleModal}
          className="py-6 px-4 text-center border border-neutral-300/50 flex-1 rounded-xs cursor-pointer"
        >
          <HeadphonesRound className="mx-auto mb-3" />{" "}
          <p className="font-semibold mb-1.5">Contact support</p>{" "}
          <p className="text-xs font-light leading-[100%] mt-1.5">
            Send a message or gives us a call
          </p>
        </div>
      </div>
      {isModalOpen && <InfoModal isOpen={isModalOpen} onClose={toggleModal} />}
    </Card>
  );
};

export default MenuWidget;
