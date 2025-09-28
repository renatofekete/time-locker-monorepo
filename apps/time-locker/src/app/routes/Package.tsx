import { usePackage } from "@/hooks/usePackages";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "time-locker-ui";
import { useParams } from "react-router-dom";
import type { PackageType } from "@/types/PackageType";

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex flex-col py-2 border-b border-neutral-100 last:border-b-0">
    <span className="text-xs text-neutral-500">{label}</span>
    <span className="text-base text-neutral-900 font-medium">
      {value || <span className="text-neutral-400">N/A</span>}
    </span>
  </div>
);

const Package: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = usePackage(`/packages/${id}`);

  if (isLoading) {
    return (
      <DashboardLayout>
        <Card title="Package Details">
          <div className="flex justify-center items-center h-40">
            Loading...
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  if (error || !data?.data) {
    return (
      <DashboardLayout>
        <Card title="Package Details">
          <div className="flex justify-center items-center h-40 text-red-500">
            Error loading package details.
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  const pkg: PackageType = data.data;

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto mt-10">
        <Card
          title={
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold">Package #{pkg.id}</span>
              <span className="ml-auto px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                {pkg.stateId}
              </span>
            </div>
          }
          className="shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-lg p-5">
              <InfoRow label="Tracking Number" value={pkg.trackingNumber} />
              <InfoRow
                label="Pickup Method"
                value={pkg.packagePickupMethodId}
              />
              <InfoRow
                label="Recipient Type"
                value={pkg.packageRecipientTypeId}
              />
              <InfoRow label="Created Time" value={pkg.createdTime} />
              <InfoRow label="Updated Time" value={pkg.updatedTime} />
            </div>
            <div className="bg-slate-50 rounded-lg p-5">
              <InfoRow
                label="Courier Company"
                value={pkg.courierCompany?.name}
              />
              <InfoRow
                label="Courier Phone"
                value={pkg.courierCompany?.phoneNumber}
              />
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Package;
