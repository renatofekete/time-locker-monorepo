import { Link } from "react-router-dom";
import BestPerformingCouriersWidget from "../../components/features/couriers/BestPerformingCouriersWidget";
import CouriersWidget from "../../components/features/couriers/CouriersWidget";
import Cluster from "../../components/layout/Cluster";
import DashboardLayout from "../../components/layout/DashboardLayout";
import UserPlus from "../../assets/icons/UserPlus.svg?react";
import paths from "@/config/paths";

const Couriers = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-3.5 lg:gap-0 justify-between mb-10">
        <div>
          <h2 className="font-bold text-[28px] text-neutral-900 mb-1">
            Detailed courier performance overview
          </h2>
          <p className="text-neutral-900/80 text-[18px] ">
            Select an individual courier to see detailed stats
          </p>
        </div>
        <div className="flex gap-2 flex-col sm:flex-row items-center">
          <Link
            to={paths.courierRegister.getHref()}
            className="inline-flex items-center gap-2 text-white w-full lg:w-auto justify-center bg-blue-500 border border-neutral-300/50 text-sm py-4 px-4.5 rounded-xs"
          >
            <UserPlus className="w-6 h-6" /> Add new courier
          </Link>
          <Link
            to={"/#"}
            className="inline-flex items-center gap-2  w-full lg:w-auto justify-center text-blue-500 border border-blue-500 text-sm py-4 px-4.5 rounded-xs"
          >
            <span className="h-6 inline-flex items-center">
              Send a message to couriers
            </span>
          </Link>
        </div>
      </div>
      <Cluster className="courier-grid-cluster">
        <CouriersWidget className="area-a" />
        <BestPerformingCouriersWidget className="area-b" />
      </Cluster>
    </DashboardLayout>
  );
};
export default Couriers;
