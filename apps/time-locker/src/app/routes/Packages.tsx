import PackageStatisticsWidget from "@/components/features/packages/PackageStatisticsWidget";
import Cluster from "../../components/layout/Cluster";
import DashboardLayout from "../../components/layout/DashboardLayout";

import PackagesWidget from "@/components/features/packages/PackagesWidget";
import DispatchLocationListWidget from "@/components/features/packages/DispatchLocationListWidget";
import DeliveriesMapWidget from "@/components/features/deliveries/DeliveriesMapWidget";

const Packages = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-5 mb-5">
        <PackagesWidget />
        <Cluster className="packages-grid-cluster">
          <PackageStatisticsWidget className="area-a h-fit" />
          <DispatchLocationListWidget className="area-b" />
        </Cluster>
      </div>
      <DeliveriesMapWidget />
    </DashboardLayout>
  );
};
export default Packages;
