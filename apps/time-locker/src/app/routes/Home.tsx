import DeliveriesWidget from "../../components/features/deliveries/DeliveriesWidget";
import StatisticsWidget from "../../components/features/statistics/StatisticsWidget";
import ReturnedPackagesWidget from "../../components/features/packages/ReturnedPackagesWidget";
import PackageReportWidget from "../../components/features/packages/PackageReportWidget";
import Cluster from "../../components/layout/Cluster";
import DashboardLayout from "../../components/layout/DashboardLayout";
import MenuWidget from "../../components/layout/MenuWidget";
import CustomerReportsWidget from "../../components/features/customers/CustomerReportsWidget";
import { Alert } from "time-locker-ui";
import DispatchLocationListWidget from "@/components/features/packages/DispatchLocationListWidget";
import PackageStatisticsWidget from "@/components/features/packages/PackageStatisticsWidget";
import DeliveriesMapWidget from "@/components/features/deliveries/DeliveriesMapWidget";
const Home = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-5">
        <Alert
          type="success"
          className="mb-4"
          text="This is a demo version of Time Locker. Data is reset every hour."
        />
        <StatisticsWidget />
        <DeliveriesWidget />
        <Cluster className="home-grid-cluster">
          <ReturnedPackagesWidget className="area-a" />

          <PackageReportWidget className="area-b" />

          <MenuWidget className="area-c" />

          <DispatchLocationListWidget className="area-d" />

          <CustomerReportsWidget className="area-e" />
        </Cluster>
        {/*<PackageStatisticsWidget className="h-fit" />*/}
        <DeliveriesMapWidget />
      </div>
    </DashboardLayout>
  );
};
export default Home;
