import DashboardLayout from "../../components/layout/DashboardLayout";
import PackagesWidget from "@/components/features/packages/PackagesWidget";

const Packages = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-5 mb-5">
        <PackagesWidget />
      </div>
    </DashboardLayout>
  );
};
export default Packages;
