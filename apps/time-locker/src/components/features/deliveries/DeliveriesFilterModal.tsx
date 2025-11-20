import { useState } from "react";
import Modal from "@/components/ui/modal/Modal";
import { formatDateForApi, formatDateForInput } from "@/utils/date";
import { usePackagesPickupMethod } from "@/hooks/usePackages";

type FilterProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    pickUpTimeFrom: string;
    pickUpTimeTo: string;
    pickUpMethod: string;
    location: string;
    isDelivered: string;
    query: string;
    pageNumber: string;
    pageSize: string;
  };
  onApplyFilters: (filters: any) => void;
};

const DeliveriesFilterModal = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
}: FilterProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value,
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  const handleReset = () => {
    setLocalFilters({
      ...filters,
      pickUpTimeFrom: "",
      pickUpTimeTo: "",
      pickUpMethod: "",
      location: "",
      isDelivered: "",
      query: "",
    });
  };

  const { data, isLoading, error } = usePackagesPickupMethod(
    `/packages/pickup-methods`
  );

  return (
    <Modal
      title="Filter Deliveries"
      isOpen={isOpen}
      onClose={onClose}
      error={error}
      isLoading={isLoading}
    >
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Date Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              name="pickUpTimeFrom"
              value={formatDateForInput(localFilters.pickUpTimeFrom)}
              onChange={(e) => {
                setLocalFilters({
                  ...localFilters,
                  pickUpTimeFrom: e.target.value
                    ? formatDateForApi(e.target.value)
                    : "",
                });
              }}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Start date"
            />

            <input
              type="date"
              name="pickUpTimeTo"
              value={formatDateForInput(localFilters.pickUpTimeTo)}
              onChange={(e) => {
                setLocalFilters({
                  ...localFilters,
                  pickUpTimeTo: e.target.value
                    ? formatDateForApi(e.target.value)
                    : "",
                });
              }}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="End date"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Method
          </label>
          <select
            name="pickUpMethod"
            value={localFilters.pickUpMethod}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {data?.data.items.map((state: string) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={localFilters.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter location"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeliveriesFilterModal;
