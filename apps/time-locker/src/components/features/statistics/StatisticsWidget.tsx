import Card from "../../ui/card/Card";
import StatisticsBox from "./StatisticsBox";

type StatisticsWidgetProps = {};

const StatisticsWidget = ({}: StatisticsWidgetProps) => {
  return (
    <Card title="Statistics">
      <div className="sm:grid sm:flex-none flex flex-col sm:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-2.5">
        <StatisticsBox
          title="Ongoine drivers"
          value="826"
          unit="people"
          percentage={1.3}
        />
        <StatisticsBox
          title="Total orders"
          value="2351"
          unit="orders"
          percentage={1.3}
        />
        <StatisticsBox
          title="Total orders"
          value="2351"
          unit="orders"
          percentage={1.3}
        />
        <StatisticsBox
          title="Active drivers"
          value="372"
          unit="people"
          percentage={-1.3}
        />
        <StatisticsBox
          title="Avg. courier rating"
          value="4.84"
          unit="stars"
          percentage={0.01}
        />
      </div>
    </Card>
  );
};

export default StatisticsWidget;
