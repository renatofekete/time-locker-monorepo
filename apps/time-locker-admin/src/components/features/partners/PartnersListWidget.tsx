import PARTNERS from "@/assets/mocks/partners";
import { Card, Table } from "time-locker-ui";

const TABLE_HEADERS = [
  { label: "Name" },
  { label: "Type" },
  { label: "Contact person" },
  { label: "Address" },
];

type PartnersListWidgetProps = {
  className?: string;
};

const PartnersListWidget = ({ className }: PartnersListWidgetProps) => {
  return (
    <Card title="Partners List" className={`"h-full" ${className || ""}`}>
      <div className="overflow-x-auto">
        <Table
          headers={TABLE_HEADERS}
          data={PARTNERS}
          renderRow={(partner: any, index: number) => (
            <tr key={index}>
              <td>{partner.name}</td>
              <td>{partner.type}</td>
              <td>{partner.contactPerson}</td>
              <td>{partner.address}</td>
            </tr>
          )}
        />
      </div>
    </Card>
  );
};

export default PartnersListWidget;
