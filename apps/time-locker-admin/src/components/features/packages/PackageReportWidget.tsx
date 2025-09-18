import { usePackagesStatistics } from "@/hooks/usePackages";
import { Card } from "time-locker-ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DATA = [
  { name: "Sun", collected: 12, delivered: 10 },
  { name: "Mon", collected: 19, delivered: 16 },
  { name: "Tue", collected: 15, delivered: 14 },
  { name: "Wed", collected: 18, delivered: 15 },
  { name: "Thu", collected: 14, delivered: 12 },
  { name: "Fri", collected: 20, delivered: 18 },
  { name: "Sat", collected: 10, delivered: 8 },
];

type PackageReportWidgetProps = {
  className?: string;
};

const PackageReportWidget = ({ className }: PackageReportWidgetProps) => {
  const { data, isLoading, error } = usePackagesStatistics(
    `/package-statistics/weekly`
  );
  return (
    <Card
      title="Weekly Package Report"
      className={`h-full ${className || ""}`}
      isLoading={isLoading}
      error={error}
    >
      <div style={{ width: "100%", height: 192 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={(data?.data ?? DATA).map((item: any) => ({
              ...item,
              name: item.date
                ? new Date(item.date).toLocaleDateString(undefined, {
                    weekday: "short",
                  })
                : item.name,
            }))}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              horizontal={false}
            />
            <XAxis dataKey={"name"} />
            <YAxis hide />
            <Tooltip />
            <Legend verticalAlign="top" align="left" />
            <Bar
              dataKey="collectedCount"
              stackId="a"
              fill="#407BFF"
              name="Collected"
            />
            <Bar
              dataKey="deliveredCount"
              stackId="a"
              fill="#2C498B"
              name="Delivered"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PackageReportWidget;
