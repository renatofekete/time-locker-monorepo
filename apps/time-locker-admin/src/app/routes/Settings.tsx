import GeneralSettingsWidget from "@/components/features/settings/GeneralSettingsWidget";
import DashboardLayout from "../../components/layout/DashboardLayout";

const Settings = () => {
  return (
    <DashboardLayout>
      <GeneralSettingsWidget className="w-1/2" />
    </DashboardLayout>
  );
};
export default Settings;
