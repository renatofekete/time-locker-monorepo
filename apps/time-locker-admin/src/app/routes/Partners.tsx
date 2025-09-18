import PartnersListWidget from "@/components/features/partners/PartnersListWidget";
import DashboardLayout from "@/components/layout/DashboardLayout";
import paths from "@/config/paths";
import { Link } from "react-router-dom";
import UserPlus from "@/assets/icons/UserPlus.svg?react";

const Partners = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-3.5 lg:gap-0 justify-between mb-10">
        <div className="flex gap-2 flex-col sm:flex-row items-center">
          <Link
            to={paths.partnerRegister.getHref()}
            className="inline-flex items-center gap-2 text-white w-full lg:w-auto justify-center bg-blue-500 border border-neutral-300/50 text-sm py-4 px-4.5 rounded-xs"
          >
            <UserPlus className="w-6 h-6" /> Add new partner
          </Link>
        </div>
      </div>
      <PartnersListWidget className="w-full" />
    </DashboardLayout>
  );
};

export default Partners;
