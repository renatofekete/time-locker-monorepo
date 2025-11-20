import { useCouriers, useDeleteCourier } from "@/hooks/useCouriers";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, Button } from "time-locker-ui";
import { useParams, useNavigate } from "react-router-dom";
import paths from "@/config/paths";
import { useState } from "react";

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

const Courier: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCouriers(`/couriers/${id}`);
  const deleteCourier = useDeleteCourier();
  const [confirming, setConfirming] = useState(false);

  if (isLoading) {
    return (
      <DashboardLayout>
        <Card title="Courier Details">
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
        <Card title="Courier Details">
          <div className="flex justify-center items-center h-40 text-red-500">
            Error loading courier details.
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  const courier = data.data;

  const handleDelete = () => {
    setConfirming(true);
  };

  const confirmDelete = () => {
    deleteCourier.mutate(`/couriers/${courier.id}`, {
      onSuccess: () => {
        navigate(paths.couriers.getHref());
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto mt-10">
        <Card
          title={
            <div className="flex items-center justify-between w-100">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold flex-1 text-center">
                  {courier.fullName}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    courier.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {courier.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          }
          className="shadow-lg"
        >
          {confirming && (
            <div className="mb-4 p-4 bg-red-50 rounded text-red-700 flex items-center justify-between">
              <span>Are you sure you want to delete this courier?</span>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setConfirming(false)}
                  disabled={deleteCourier.isPending}
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={confirmDelete}
                  isLoading={deleteCourier.isPending}
                  disabled={deleteCourier.isPending}
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-lg p-5">
              <InfoRow label="First Name" value={courier.firstName} />
              <InfoRow label="Last Name" value={courier.lastName} />
              <InfoRow label="Username" value={courier.userName} />
              <InfoRow label="Email" value={courier.email} />
              <InfoRow label="Phone Number" value={courier.phoneNumber} />
            </div>
            <div className="bg-slate-50 rounded-lg p-5">
              <InfoRow
                label="Courier Company"
                value={courier.courierCompanyName}
              />
              <InfoRow label="Location Name" value={courier.location?.name} />
              <InfoRow label="Address" value={courier.location?.address} />
              <InfoRow label="City" value={courier.location?.city} />
              <InfoRow label="Country" value={courier.location?.country} />
              <InfoRow label="ZIP Code" value={courier.location?.zipCode} />
            </div>
          </div>
          <div className="flex gap-2 ml-4 mt-4 justify-end">
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              aria-label="Back"
              size="sm"
              className="flex"
            >
              &larr; Back
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(paths.editCourier.getHref(courier.id))}
              aria-label="Edit"
              size="sm"
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              onClick={handleDelete}
              aria-label="Delete"
              size="sm"
              isLoading={deleteCourier.isPending}
              disabled={deleteCourier.isPending}
            >
              Delete
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Courier;
