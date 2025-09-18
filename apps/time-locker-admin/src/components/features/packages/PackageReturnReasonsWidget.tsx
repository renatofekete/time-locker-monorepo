import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "time-locker-ui";

const data = [
  {
    name: "Failed alternative methods",
    value: 40,
    description:
      "The recipient did not properly configure their alternative drop-off methods, preventing the courier from delivering the package.",
  },
  {
    name: "Failed relocation",
    value: 60,
    description:
      "The package relocation was too far for the courier to deliver, and no nearby parcel machines were available.",
  },
];

type PackageReturnReasonsWidgetProps = {
  className?: string;
};

const PackageReturnReasonsWidget = ({
  className,
}: PackageReturnReasonsWidgetProps) => {
  return (
    <Card
      title="Reasons for package returns"
      className={`h-full ${className || ""}`}
    >
      <div className="w-full flex">
        <div style={{ display: "flex" }}>
          <div style={{ width: "300px", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#FF6384" : "#36A2EB"}
                      stroke="#fff"
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value}%`,
                    props.payload.description,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            paddingLeft: "20px",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {data.map((item, index) => (
              <li key={index} style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: index === 0 ? "#FF6384" : "#36A2EB",
                      marginRight: "8px",
                    }}
                  ></div>
                  <strong>{item.name}</strong>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default PackageReturnReasonsWidget;
