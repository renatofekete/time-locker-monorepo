import { useState } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/card/Card";
import Button from "@/components/ui/button/Button";
import { apiPost } from "@/lib/api/restClient";
import { useNavigate } from "react-router-dom";

type CourierFormData = {
  email: string;
  phoneNumber: string;
  referralCode: string;
  languageCode: string;
  roleId: number;
  courierServiceId: string;
};

const COURIER_SERVICES = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Express Delivery",
  },
  {
    id: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    name: "City Couriers",
  },
  {
    id: "5fa85f64-5717-4562-b3fc-2c963f66afa8",
    name: "Same-Day Delivery",
  },
];

const RegisterCourier = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CourierFormData>({
    defaultValues: {
      roleId: 1,
      languageCode: "en_US",
      courierServiceId: COURIER_SERVICES[0].id,
    },
  });

  const onSubmit = async (data: CourierFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await apiPost("/couriers/register", data);

      console.log("Courier registered successfully:", response);
      setSubmitSuccess(true);
      reset(); // Clear form
    } catch (error) {
      console.error("Failed to register courier:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to register courier. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto">
        <Card title="Courier Registration Form">
          {submitSuccess ? (
            <div className="bg-green-50 p-4 rounded-md mb-6">
              <p className="text-green-800 font-medium">
                Courier registered successfully!
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-2 text-sm text-green-700 underline"
              >
                Register another courier
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {submitError && (
                <div className="bg-red-50 p-4 rounded-md">
                  <p className="text-red-700">{submitError}</p>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full p-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => navigate(-1)}
                  type="button"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Register Courier
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RegisterCourier;
