import { Card, Table } from "time-locker-ui";
import USERS from "@/assets/mocks/users";

type UsersListWidgetProps = {
  className?: string;
};

const TABLE_HEADERS = [
  { label: "User ID" },
  { label: "Name" },
  { label: "Email" },
  { label: "Role" },
  { label: "Status" },
];

const UsersListWidget = ({ className }: UsersListWidgetProps) => {
  return (
    <Card title="Users List" className={`h-full ${className || ""}`}>
      <div className="overflow-x-auto">
        <Table
          headers={TABLE_HEADERS}
          data={USERS}
          renderRow={(user: any, index: number) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
            </tr>
          )}
        />
      </div>
    </Card>
  );
};

export default UsersListWidget;
