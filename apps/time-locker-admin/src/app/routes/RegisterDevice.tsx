import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, Button, Select, Input } from "time-locker-ui";

type DoorDimension = {
  width: number;
  height: number;
};

type RegisterDeviceFormData = {
  model: string;
  doors: number;
  doorDimensions: DoorDimension[];
};

const modelOptions = [
  { value: "Personal Parcel", label: "Personal Parcel" },
  { value: "Group Parcel", label: "Group Parcel" },
  { value: "Smart Lock", label: "Smart Lock" },
];

const RegisterDevice = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RegisterDeviceFormData>({
    defaultValues: {
      model: "",
      doors: 1,
      doorDimensions: [{ width: 0, height: 0 }],
    },
  });

  // Sync doorDimensions array with doors count
  const { fields, append, remove } = useFieldArray({
    control,
    name: "doorDimensions",
  });

  // Update doorDimensions when doors count changes
  const handleDoorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setValue("doors", value);

    if (value > fields.length) {
      for (let i = fields.length; i < value; i++) {
        append({ width: 0, height: 0 });
      }
    } else if (value < fields.length) {
      for (let i = fields.length; i > value; i--) {
        remove(i - 1);
      }
    }
  };

  const onSubmit = async (data: RegisterDeviceFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      // Submit logic here
      setSubmitSuccess(true);
      reset();
    } catch (error: any) {
      setSubmitError("Failed to register device.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <Card title="Register Device">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700"
            >
              Model
            </label>
            <Select
              id="model"
              options={modelOptions}
              placeholder="Select model"
              disabled={isSubmitting}
              value={watch("model")}
              onChange={(selectedValue: string) =>
                setValue("model", selectedValue, { shouldValidate: true })
              }
            />
            {errors.model && (
              <span className="text-red-500 text-sm">
                {errors.model.message}
              </span>
            )}
          </div>
          <div>
            <Input
              id="doors"
              label="Number of doors"
              type="number"
              min={1}
              error={errors.doors?.message}
              {...register("doors", {
                required: "Number of doors is required",
                min: { value: 1, message: "At least one door is required" },
                valueAsNumber: true,
              })}
              onChange={handleDoorsChange}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Door Dimensions
            </label>
            <div className="space-y-4">
              {fields.map((field, idx) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <Input
                    id={`doorDimensions.${idx}.width`}
                    label="Width"
                    type="number"
                    step="any"
                    min={0}
                    error={errors.doorDimensions?.[idx]?.width?.message}
                    {...register(`doorDimensions.${idx}.width`, {
                      required: "Width is required",
                      min: { value: 0, message: "Width must be positive" },
                      valueAsNumber: true,
                    })}
                    disabled={isSubmitting}
                    size="medium"
                  />
                  <Input
                    id={`doorDimensions.${idx}.height`}
                    label="Height"
                    type="number"
                    step="any"
                    min={0}
                    error={errors.doorDimensions?.[idx]?.height?.message}
                    {...register(`doorDimensions.${idx}.height`, {
                      required: "Height is required",
                      min: { value: 0, message: "Height must be positive" },
                      valueAsNumber: true,
                    })}
                    disabled={isSubmitting}
                    size="medium"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="secondary"
              onClick={() => reset()}
              type="button"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register Device"}
            </Button>
          </div>
          {submitError && (
            <div className="text-red-500 text-sm mt-2">{submitError}</div>
          )}
          {submitSuccess && (
            <div className="text-green-500 text-sm mt-2">
              Device registered successfully!
            </div>
          )}
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default RegisterDevice;
