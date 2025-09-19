import Card from "../../ui/card/Card";
import StatisticsBox from "@/components/features/statistics/StatisticsBox";

type PackageStatisticsWidgetProps = {
  className?: string;
};

const PackageStatisticsWidget = ({
  className,
}: PackageStatisticsWidgetProps) => {
  return (
    <Card title="Package & delivery statistics" className={`${className}`}>
      <div className="sm:grid grid grid-cols-2 gap-2.5">
        <StatisticsBox
          title="Avg. delivery time"
          value="2.1"
          unit="days"
          percentage={-0.12}
        />
        <StatisticsBox
          title="Avg. number of packages per courier per day"
          value="9.32"
          unit="packages"
          percentage={1.3}
        />
        <StatisticsBox
          title="Success delivery rate"
          value="89,21%"
          unit="(percentage)"
          percentage={1.3}
        />
        <StatisticsBox
          title="Total deliveries made"
          value="104"
          unit="deliveries"
          percentage={-1.3}
        />
      </div>
    </Card>
  );
};

export default PackageStatisticsWidget;
