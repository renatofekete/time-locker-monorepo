//import Card from "@/components/ui/card/Card";
import Tuning from "../../../assets/icons/Tuning.svg?react";
import SortVertical from "../../../assets/icons/SortVertical.svg?react";
import Table from "../../ui/table/Table";
import Pagination from "../../ui/pagination/Pagination";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";
import { usePackages } from "@/hooks/usePackages";
import { useDebounce } from "@/hooks/useDebounce";
import SearchBar from "@/components/ui/search/SearchBar";
import { getQueryParams } from "@/utils/query";
import type { PackageType } from "@/types/PackageType";
import PackagesFilterModal from "./PackagesFilterModal";
import { Card } from "time-locker-ui";

const TABLE_HEADERS = [
  { label: "Package ID" },
  { label: "Status" },
  { label: "Time" },
  { label: "Location" },
  { label: "Pickup method" },
  { label: "Recipient" },
  { label: "Courier driver" },
];

const PER_PAGE = 6;

const PackagesWidget = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    pickUpTimeFrom: "",
    pickUpTimeTo: "",
    pickUpMethod: "",
    location: "",
    isDelivered: "",
    query: "",
    pageNumber: "1",
    pageSize: PER_PAGE.toString(),
  });

  useEffect(() => {
    setFilterCriteria((prev) => ({
      ...prev,
      pageNumber: currentPage.toString(),
    }));
  }, [currentPage]);

  const handleFilterChange = (newFilters: typeof filterCriteria) => {
    setCurrentPage(1);

    setFilterCriteria({
      ...newFilters,
      pageNumber: "1",
      pageSize: PER_PAGE.toString(),
    });

    setIsFilterModalOpen(false);
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  const { data, isLoading, error } = usePackages(
    `/packages?${getQueryParams(filterCriteria)}`
  );

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

  const packages: PackageType[] = data?.data.items ?? [];
  const totalLength: number = data?.data?.totalCount ?? 0;

  return (
    <Card
      isLoading={isLoading}
      error={error}
      title="Packages"
      subtitle={`(${totalLength})`}
      header={
        <div>
          <SearchBar
            value={filterCriteria.query}
            onSearch={handleSearch}
            placeholder="Search packages"
          />
          <div className="flex mb-5 gap-2.5">
            <Button>
              Sort{" "}
              <span>
                <SortVertical />
              </span>
            </Button>
            <Button onClick={toggleFilterModal}>
              Filter{" "}
              <span>
                <Tuning />
              </span>
            </Button>
          </div>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <Table
          headers={TABLE_HEADERS}
          data={packages}
          renderRow={(packages) => (
            <tr key={packages.code} className="border-b border-neutral-300/50">
              <td className="ps-6 py-5">{packages.code}</td>
              <td className="ps-6 py-5">{packages.state?.name}</td>
              <td className="ps-6 py-5">{packages.pickupTime}</td>
              <td className="ps-6 py-5">{packages.recipientAdressSnapshot}</td>
              <td className="ps-6 py-5">
                {packages.packagePickupMethod?.name}
              </td>
              <td className="ps-6 py-5">{packages.recipientName}</td>
              <td className="ps-6 py-5">{packages.courierCompany?.name}</td>
            </tr>
          )}
        />
      </div>
      <Pagination
        totalPages={MAX_PAGES}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        className="justify-end mt-8"
      />
      {isFilterModalOpen && (
        <PackagesFilterModal
          isOpen={isFilterModalOpen}
          onClose={toggleFilterModal}
          filters={filterCriteria}
          onApplyFilters={handleFilterChange}
        />
      )}
    </Card>
  );
};

export default PackagesWidget;
