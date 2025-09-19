import { COURIERS } from "../../../assets/mocks/couriers";
import Alert from "../../ui/alert/Alert";
import Card from "../../ui/card/Card";
import Table from "../../ui/table/Table";
import Tuning from "../../../assets/icons/Tuning.svg?react";
import SortVertical from "../../../assets/icons/SortVertical.svg?react";
import { useState, useMemo, useEffect, useCallback } from "react";
import TabNavigation from "../../ui/tab/TabNavigation";
import SearchBar from "@/components/ui/search/SearchBar";
import Button from "@/components/ui/button/Button";
import CouriersFilterModal from "@/components/features/couriers/CouriersFilterModal";
import { useCouriers } from "@/hooks/useCouriers";
import { useDebounce } from "@/hooks/useDebounce";

type CouriersWidgetProps = {
  className?: string;
};

const TABLE_HEADERS = [
  { label: "Courier ID" },
  { label: "Courier name" },
  { label: "Status" },
  { label: "Activation Date" },
  { label: "Deactivation Date" },
];

const TABS = ["all", "active", "inactive"];

const PER_PAGE = 6;

const CouriersWidget = ({ className }: CouriersWidgetProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    status: "",
    dateRange: {
      start: "",
      end: "",
    },
  });

  useEffect(() => {
    setFilterCriteria((prev) => ({
      ...prev,
      pageNumber: currentPage.toString(),
    }));
  }, [currentPage]);

  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useCouriers(`/courier-companies`);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilterCriteria(newFilters);
    setIsFilterModalOpen(false);

    if (newFilters.status) {
      setActiveTab(newFilters.status);
    }
  };

  const totalCount = data?.data?.totalCount ?? 0;
  const pageSize = data?.data?.pageSize ?? PER_PAGE;
  const MAX_PAGES = Math.ceil(totalCount / pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= MAX_PAGES) {
      setCurrentPage(page);
    }
  };

  const updateSearch = useCallback((value: string) => {
    setFilterCriteria((prev) => ({
      ...prev,
      query: value,
      pageNumber: "1",
    }));
    setCurrentPage(1);
  }, []);

  const handleSearch = useDebounce(updateSearch, 400);

  const couriers: any[] = data?.data.items ?? [];
  const totalLength: number = data?.data?.totalCount ?? 0;

  return (
    <Card
      title="Couriers (PLACEHOLDER DATA)"
      className={`h-full ${className || ""}`}
      isLoading={isLoading}
      error={error}
      header={
        <div>
          <SearchBar
            onSearch={handleSearch}
            value={searchTerm}
            placeholder="Search for couriers"
          />
          <div className="flex mb-5 gap-2.5">
            <Button variant="tertiary">
              Sort{" "}
              <span>
                <SortVertical />
              </span>
            </Button>
            <Button variant="tertiary" onClick={toggleFilterModal}>
              Filter{" "}
              <span>
                <Tuning />
              </span>
            </Button>
            <TabNavigation
              tabs={TABS}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              className={"ms-auto"}
            />
          </div>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <Table
          headers={TABLE_HEADERS}
          data={couriers}
          renderRow={(courier, index) => (
            <tr key={index} className="border-b border-neutral-300/50">
              <td className="ps-6 py-5">{courier.id}</td>
              <td className="ps-6 py-5">{courier.name}</td>
              <td className="ps-6 py-5">
                <Alert
                  className={`w-[132px] flex items-center justify-center`}
                  text={courier.status}
                  type={courier.status === "active" ? "success" : "error"}
                />
              </td>
              <td className="ps-6 py-5">
                {new Date(courier.activationDate).toLocaleString()}
              </td>
              <td className="ps-6 py-5">
                {courier.deactivationDate
                  ? new Date(courier.deactivationDate).toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          )}
        />
      </div>

      {isFilterModalOpen && (
        <CouriersFilterModal
          isOpen={isFilterModalOpen}
          onClose={toggleFilterModal}
          filters={filterCriteria}
          onApplyFilters={handleFilterChange}
        />
      )}
    </Card>
  );
};

export default CouriersWidget;
