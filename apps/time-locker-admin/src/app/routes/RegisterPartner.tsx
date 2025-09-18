import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Card, Button, Select, MultipleSelect } from "time-locker-ui";

type PartnerType =
  | "Courier service"
  | "Device rental partner"
  | "Soft Point"
  | "Advertiser"
  | "";

type RegisterPartnerFormData = {
  email: string;
  name: string;
  type: PartnerType;
  address: string;
  regions: string[];
  iban: string;
};

const regionOptions = [
  { value: "zagreb", label: "Zagreb" },
  { value: "split-dalmatia", label: "Split-Dalmatia" },
  { value: "rijeka", label: "Rijeka" },
  { value: "osijek-baranja", label: "Osijek-Baranja" },
];

const partnerTypeOptions = [
  { value: "Courier service", label: "Courier service" },
  { value: "Device rental partner", label: "Device rental partner" },
  { value: "Soft Point", label: "Soft Point" },
  { value: "Advertiser", label: "Advertiser" },
];

const RegisterPartner = () => {
  const [formData, setFormData] = useState<RegisterPartnerFormData>({
    email: "",
    name: "",
    type: "",
    address: "",
    regions: [],
    iban: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value as PartnerType }));
    if (errors.type) {
      setErrors((prev) => ({ ...prev, type: "" }));
    }
  };

  const handleRegionsChange = (selectedRegions: string[]) => {
    setFormData((prev) => ({ ...prev, regions: selectedRegions }));
    if (errors.regions) {
      setErrors((prev) => ({ ...prev, regions: "" }));
    }
  };
  return (
    <DashboardLayout>
      <Card title="Register New Partner" className="w-1/2 mx-auto p-6">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <Select
              id="type"
              label="Type"
              options={partnerTypeOptions}
              value={formData.type}
              onChange={handleTypeChange}
              placeholder="Select type"
              required
              error={errors.type}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <MultipleSelect
              id="regions"
              label="Regions (Croatia)"
              options={regionOptions}
              value={formData.regions}
              onChange={handleRegionsChange}
              required
              error={errors.regions || null}
              className="mb-4"
            />
          </div>
          <div>
            <label
              htmlFor="iban"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              IBAN <span className="text-red-500">*</span>
            </label>
            <input
              id="iban"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="flex justify-end pt-6">
            <Button variant="primary" type="submit">
              Register Partner
            </Button>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default RegisterPartner;
