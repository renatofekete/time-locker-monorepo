import { useCouriers, useEditCourier } from "@/hooks/useCouriers";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, Button } from "time-locker-ui";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type LocationForm = {
  address: string;
  city: string;
  floorUnit: string;
  country: string;
  region: string;
  zipCode: string;
  name: string;
};

type EditCourierForm = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  isActive: boolean;
  location: LocationForm;
};

const EditCourier: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCouriers(`/couriers/${id}`);
  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error: mutationError,
  } = useEditCourier();

  const courier = data?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditCourierForm>({
    defaultValues: courier
      ? {
          firstName: courier.firstName,
          lastName: courier.lastName,
          email: courier.email,
          userName: courier.userName,
          phoneNumber: courier.phoneNumber,
          isActive: courier.isActive,
          location: {
            address: courier.location?.address || "",
            city: courier.location?.city || "",
            floorUnit: courier.location?.floorUnit || "",
            country: courier.location?.country || "",
            region: courier.location?.region || "",
            zipCode: courier.location?.zipCode || "",
            name: courier.location?.name || "",
          },
        }
      : undefined,
  });

  // Reset form when data loads
  useEffect(() => {
    if (courier) {
      reset({
        firstName: courier.firstName,
        lastName: courier.lastName,
        email: courier.email,
        userName: courier.userName,
        phoneNumber: courier.phoneNumber,
        isActive: courier.isActive,
        location: {
          address: courier.location?.address || "",
          city: courier.location?.city || "",
          floorUnit: courier.location?.floorUnit || "",
          country: courier.location?.country || "",
          region: courier.location?.region || "",
          zipCode: courier.location?.zipCode || "",
          name: courier.location?.name || "",
        },
      });
    }
  }, [courier, reset]);

  const onSubmit = (values: EditCourierForm) => {
    mutate(
      {
        endpoint: `/couriers/${id}`,
        data: values,
      },
      {
        onSuccess: () => {
          navigate(-1); // Go back after successful update
        },
      }
    );
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <Card title="Edit Courier">
          <div className="flex justify-center items-center h-40">
            Loading...
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  if (error || !courier) {
    return (
      <DashboardLayout>
        <Card title="Edit Courier">
          <div className="flex justify-center items-center h-40 text-red-500">
            Error loading courier data.
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto mt-10">
        <Card title={`Edit Courier: ${courier.fullName}`}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  {...register("firstName", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600">Required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  {...register("lastName", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600">Required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">Required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  {...register("userName", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.userName && (
                  <p className="text-sm text-red-600">Required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber", { required: false })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-600">Required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Active
                </label>
                <select
                  {...register("isActive")}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
            {isError && (
              <div className="bg-red-50 p-4 rounded-md text-red-700">
                {mutationError instanceof Error
                  ? mutationError.message
                  : "Failed to update courier."}
              </div>
            )}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                variant="secondary"
                type="button"
                onClick={() => navigate(-1)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                type="submit"
                isLoading={isPending}
                disabled={isPending}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditCourier;
