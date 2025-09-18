import { Card } from "time-locker-ui";

type GeneralSettingsWidgetProps = {
  className?: string;
};

const GeneralSettingsWidget = ({ className }: GeneralSettingsWidgetProps) => {
  return (
    <Card title="General Settings" className={`h-full ${className || ""}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Language
        </label>
        <select
          name="status"
          value={"localFilters.status"}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Currency
        </label>
        <select
          name="status"
          value={"localFilters.status"}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </Card>
  );
};

export default GeneralSettingsWidget;
