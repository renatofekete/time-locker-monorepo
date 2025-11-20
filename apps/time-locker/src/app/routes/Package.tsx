import { usePackage } from "@/hooks/usePackages";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "time-locker-ui";
import { useParams } from "react-router-dom";
import type { PackageType } from "@/types/PackageType";
import { readableDateTime } from "@/utils/date";

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
              <span className="text-xl font-bold">
                Package {pkg.trackingNumber}
              </span>
            </div>
          }
          className="shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-lg p-5">
              <InfoRow label="Tracking Number" value={pkg.trackingNumber} />
              <InfoRow label="Sender" value={pkg.sender.fullName} />
              <InfoRow label="Sender Email" value={pkg.sender.email} />
              <InfoRow
                label="Sender Phone Number"
                value={pkg.sender.phoneNumber}
              />
              <InfoRow label="Recipient" value={pkg.recipient.fullName} />
              <InfoRow label="Recipient Email" value={pkg.recipient.email} />
              <InfoRow
                label="Recipient Phone Number"
                value={pkg.recipient.phoneNumber}
              />
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
              <InfoRow
                label="Pickup Time"
                value={readableDateTime(pkg.pickupTime)}
              />
              <InfoRow
                label="Delivery Time"
                value={readableDateTime(pkg.deliveryTime)}
              />
              <InfoRow
                label="Delivery Address"
                value={pkg.recipient.location.address}
              />
              <InfoRow
                label="Delivery City"
                value={`${pkg.recipient.location.city} ${pkg.recipient.location.zipCode}`}
              />
              <InfoRow
                label="Shipment Price"
                value={`$${pkg.shipmentPrice.toFixed(2)}`}
              />
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Package;
