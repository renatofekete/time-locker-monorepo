import { useCouriers } from "@/hooks/useCouriers";
import Card from "../../ui/card/Card";
import StatisticsBox from "./StatisticsBox";

type StatisticsWidgetProps = {};

const StatisticsWidget = ({}: StatisticsWidgetProps) => {
  const { data, isLoading, error } = useCouriers(
    `/courier-company-statistics/summary?CourierCompanyId=0d446e31-fe0d-438b-9a7a-b4ee9304f06b`
  );
  return (
    <Card title="Statistics" error={error} isLoading={isLoading}>
      <div className="sm:grid sm:flex-none flex flex-col sm:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-2.5">
        <StatisticsBox
          title="Active drivers"
          value={data?.data?.activeDriversCount}
          unit="people"
          percentage={data?.data?.activeDriversCountChangePercentage}
        />
        <StatisticsBox
          title="Ongoing orders"
          value={data?.data?.ongoingOrdersCount}
          unit="orders"
          percentage={data?.data?.ongoingOrdersCountChangePercentage}
        />
        <StatisticsBox
          title="Total orders"
          value={data?.data?.totalOrdersCount}
          unit="orders"
          percentage={data?.data?.totalOrdersCountChangePercentage}
        />
        <StatisticsBox
          title="Unclaimed Shipment"
          value={data?.data?.unclaimedShipmentsCount}
          unit="shipments"
          percentage={data?.data?.unclaimedShipmentsCountChangePercentage}
        />
        <StatisticsBox
          title="Avg. courier rating"
          value={data?.data?.averageCourierRating}
          unit="stars"
          percentage={data?.data?.averageCourierRatingChangePercentage}
        />
      </div>
    </Card>
  );
};

export default StatisticsWidget;
