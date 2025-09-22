import DeliveriesWidget from "../../components/features/deliveries/DeliveriesWidget";
import StatisticsWidget from "../../components/features/statistics/StatisticsWidget";
import ReturnedPackagesWidget from "../../components/features/packages/ReturnedPackagesWidget";
import PackageReportWidget from "../../components/features/packages/PackageReportWidget";
import PackageReturnReasonsWidget from "../../components/features/packages/PackageReturnReasonsWidget";
import Cluster from "../../components/layout/Cluster";
import DashboardLayout from "../../components/layout/DashboardLayout";
import MenuWidget from "../../components/layout/MenuWidget";
import CustomerReportsWidget from "../../components/features/customers/CustomerReportsWidget";
import { Alert } from "time-locker-ui";
const Home = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-5">
        <StatisticsWidget />
        <DeliveriesWidget />
        <Cluster className="home-grid-cluster">
          <ReturnedPackagesWidget className="area-a" />

          <PackageReportWidget className="area-b" />

          <MenuWidget className="area-c" />

          <PackageReturnReasonsWidget className="area-d" />

          <CustomerReportsWidget className="area-e" />
        </Cluster>
      </div>
    </DashboardLayout>
  );
};
export default Home;
