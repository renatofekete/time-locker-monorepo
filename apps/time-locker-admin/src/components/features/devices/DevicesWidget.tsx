import { Card, Table } from "time-locker-ui";
import { DEVICES } from "@/assets/mocks/devices";

const TABLE_HEADERS = [
  { label: "Owner" },
  { label: "Model" },
  { label: "Location" },
  { label: "Status" },
];

const DevicesWidget = () => {
  return (
    <Card title="Devices">
      <div className="overflow-x-auto">
        <Table
          headers={TABLE_HEADERS}
          data={DEVICES}
          renderRow={(device) => (
            <tr key={device.owner}>
              <td className="ps-6 py-5">{device.owner}</td>
              <td className="ps-6 py-5">{device.model}</td>
              <td className="ps-6 py-5">{device.location}</td>
              <td className="ps-6 py-5">{device.status}</td>
            </tr>
          )}
        />
      </div>
    </Card>
  );
};

export default DevicesWidget;
