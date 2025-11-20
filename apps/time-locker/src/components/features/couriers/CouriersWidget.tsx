import Alert from "../../ui/alert/Alert";
import Card from "../../ui/card/Card";
import Table from "../../ui/table/Table";
import Tuning from "../../../assets/icons/Tuning.svg?react";
import SortVertical from "../../../assets/icons/SortVertical.svg?react";
import { useState, useEffect, useCallback } from "react";
import TabNavigation from "../../ui/tab/TabNavigation";
import SearchBar from "@/components/ui/search/SearchBar";
import Button from "@/components/ui/button/Button";
import CouriersFilterModal from "@/components/features/couriers/CouriersFilterModal";
import { useCouriers } from "@/hooks/useCouriers";
import { useDebounce } from "@/hooks/useDebounce";
import { Link } from "react-router-dom";
import paths from "@/config/paths";
import { getQueryParams } from "@/utils/query";

type CouriersWidgetProps = {
  className?: string;
};

const TABLE_HEADERS = [
  { label: "Courier name" },
  { label: "Status" },
  { label: "Email" },
  { label: "Phone Number" },
];

const TABS = ["all", "active", "inactive"];

const PER_PAGE = 6;

const CouriersWidget = ({ className }: CouriersWidgetProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    orderBy: "LastName|ASC",
    isActive: "",
    status: "",
    dateRange: {
      start: "",
      end: "",
    },
    query: "",
  });

  useEffect(() => {
    setFilterCriteria((prev) => ({
      ...prev,
      pageNumber: currentPage.toString(),
      CourierCompanyId: "0d446e31-fe0d-438b-9a7a-b4ee9304f06b",
    }));
  }, [currentPage]);

  const toggleSort = useCallback(() => {
    setFilterCriteria((prev) => {
      const [field, dir] = (prev.orderBy || "LastName|ASC").split("|");
      const newDir = dir === "ASC" ? "DESC" : "ASC";
      return { ...prev, orderBy: `${field}|${newDir}`, pageNumber: "1" };
    });
    setCurrentPage(1);
  }, []);

  const currentSortDir =
    (filterCriteria.orderBy || "LastName|ASC").split("|")[1] ?? "ASC";

  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useCouriers(
    `/couriers?${getQueryParams(filterCriteria)}`
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setFilterCriteria((prev) => ({
      ...prev,
      isActive: tab === "all" ? "" : tab === "active" ? "true" : "false",
      pageNumber: "1",
    }));
    setCurrentPage(1);
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
      Query: value,
      pageNumber: "1",
    }));
    setCurrentPage(1);
  }, []);

  const handleSearch = useDebounce(updateSearch, 400);

  const couriers: any[] = data?.data.items ?? [];
  const totalLength: number = data?.data?.totalCount ?? 0;

  return (
    <Card
      title="Couriers"
      className={`h-full ${className || ""}`}
      isLoading={isLoading}
      error={error}
      header={
        <div>
          <SearchBar
            onSearch={handleSearch}
            value={filterCriteria.query}
            placeholder="Search for couriers"
          />
          <div className="flex mb-5 gap-2.5">
            <Button
              variant="tertiary"
              onClick={toggleSort}
              aria-label="Toggle sort"
            >
              Sort{" "}
              <span>
                <SortVertical />
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
              <td className="ps-6 py-5 text-blue-600">
                <Link to={`${paths.courier.getHref(courier.id)}`}>
                  {courier.fullName}
                </Link>
              </td>
              <td className="ps-6 py-5">
                <Alert
                  className={`w-[132px] flex items-center justify-center`}
                  text={courier.isActive ? "Active" : "Inactive"}
                  type={courier.isActive ? "success" : "error"}
                />
              </td>
              <td className="ps-6 py-5">{courier.email}</td>
              <td className="ps-6 py-5">{courier.phoneNumber}</td>
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
