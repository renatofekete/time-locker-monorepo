import { useState } from "react";
import Modal from "@/components/ui/modal/Modal";
import { formatDateForApi, formatDateForInput } from "@/utils/date";
import { usePackageStates } from "@/hooks/usePackages";

type FilterProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    pickUpTimeFrom: string;
    pickUpTimeTo: string;
    pickUpMethod: string;
    receiverLocation: string;
    senderLocation: string;
    isDelivered: string;
    query: string;
    pageNumber: string;
    pageSize: string;
    state: string;
  };
  onApplyFilters: (filters: any) => void;
};

const PackagesFilterModal = ({
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
      receiverLocation: "",
      senderLocation: "",
      isDelivered: "",
      query: "",
      state: "",
    });
  };

  const { data, isLoading, error } = usePackageStates(`/packages/states`);

  return (
    <Modal
      title="Filter Packages"
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
            Delivery State
          </label>
          <select
            name="state"
            value={localFilters.state}
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
            Receiver Location
          </label>
          <input
            type="text"
            name="receiverLocation"
            value={localFilters.receiverLocation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sender Location
          </label>
          <input
            type="text"
            name="senderLocation"
            value={localFilters.senderLocation}
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

export default PackagesFilterModal;
