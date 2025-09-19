import { useState } from "react";
import Modal from "@/components/ui/modal/Modal";

type FilterProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    status: string;
    dateRange: {
      start: string;
      end: string;
    };
  };
  onApplyFilters: (filters: any) => void;
};

const CouriersFilterModal = ({
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
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setLocalFilters({
        ...localFilters,
        [parent]: {
          ...(localFilters as any)[parent],
          [child]: value,
        },
      });
    } else {
      setLocalFilters({
        ...localFilters,
        [name]: value,
      });
    }
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  const handleReset = () => {
    setLocalFilters({
      status: "",
      dateRange: { start: "", end: "" },
    });
  };

  return (
    <Modal title="Filter Couriers" isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={localFilters.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Activation Date Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              name="dateRange.start"
              value={localFilters.dateRange.start}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Start date"
            />
            <input
              type="date"
              name="dateRange.end"
              value={localFilters.dateRange.end}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="End date"
            />
          </div>
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

export default CouriersFilterModal;
