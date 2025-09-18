import { Card, Table, Alert } from "time-locker-ui";
import { CUSTOMER_REPORTS } from "../../../assets/mocks/customerReports";

const TABLE_HEADERS = [
  { label: "Package ID" },
  { label: "Report date" },
  { label: "Delivery method" },
  { label: "Report reason" },
];

type CustomerReportsWidgetProps = {
  className?: string;
};

const CustomerReportsWidget = ({ className }: CustomerReportsWidgetProps) => {
  return (
    <Card title="Customer reports" className={`h-full ${className || ""}`}>
      <div className="overflow-x-auto">
        <Table
          headers={TABLE_HEADERS}
          data={CUSTOMER_REPORTS}
          renderRow={(report, index) => {
            return (
              <tr key={index} className="border-b border-neutral-300/50">
                <td className="ps-6 py-5">{report.packageId}</td>
                <td className="ps-6 py-5">
                  {new Date(report.report_date).toLocaleString()}
                </td>
                <td className="ps-6 py-5">{report.delivery_method}</td>
                <td className="ps-6 py-5 flex justify-center">
                  <Alert
                    className={`w-[165px] flex items-center justify-center`}
                    text={report.report_reason}
                    type={report.type as "error" | "warning"}
                  />
                </td>
              </tr>
            );
          }}
        />
      </div>
    </Card>
  );
};

export default CustomerReportsWidget;
