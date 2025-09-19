import Card from "../../ui/card/Card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ReturnedPackagesWidgetProps = {
  className?: string;
};

const data = [
  { day: "Mon", date: 10, returns: 15 },
  { day: "Tue", date: 11, returns: 13 },
  { day: "Wed", date: 12, returns: 14 },
  { day: "Thu", date: 13, returns: 18 },
  { day: "Fri", date: 14, returns: 12 },
  { day: "Sat", date: 15, returns: 11 },
];

const averageReturns = (
  data.reduce((sum, d) => sum + d.returns, 0) / data.length
).toFixed(2);

const todayReturns = data.find((d) => d.date === 14)?.returns || 0;

const ReturnedPackagesWidget = ({ className }: ReturnedPackagesWidgetProps) => {
  return (
    <Card title="Returned Packages" className={`xl:h-full ${className || ""}`}>
      <div className=" bg-white rounded-xl w-full max-w-3xl mx-auto">
        <h2 className="text-center text-lg font-semibold mb-4">
          Overall Performance
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#3b82f6" stopOpacity={1} />
                <stop offset="90%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#e5e7eb"
              vertical={true}
              horizontal={false}
            />
            <XAxis
              dataKey="day"
              orientation="top"
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip contentStyle={{ borderRadius: 8 }} />
            <Area
              type="monotone"
              dataKey="returns"
              stroke="#3b82f6"
              fill="url(#colorReturns)"
              strokeWidth={2}
              activeDot={{ r: 5, fill: "#2563eb" }}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex justify-between items-center mt-4 text-sm font-medium">
          <span>AVG return rate per day</span>
          <span>{averageReturns}</span>
        </div>
        <div className="flex justify-between items-center mt-1 text-sm font-medium">
          <span>Today's number of returns</span>
          <span>{todayReturns}</span>
        </div>
      </div>
    </Card>
  );
};

export default ReturnedPackagesWidget;
