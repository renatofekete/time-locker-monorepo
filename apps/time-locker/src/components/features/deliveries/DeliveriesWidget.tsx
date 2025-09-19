import Card from "@/components/ui/card/Card";
import Tuning from "../../../assets/icons/Tuning.svg?react";
import SortVertical from "../../../assets/icons/SortVertical.svg?react";
import Table from "../../ui/table/Table";
import Pagination from "../../ui/pagination/Pagination";
import { useState, useEffect, useCallback } from "react";
import { useDeliveries } from "@/hooks/useDeliveries";
import Button from "@/components/ui/button/Button";
import type { DeliveryType } from "@/types/DeliveryType";
import { getQueryParams } from "@/utils/query";
import SearchBar from "@/components/ui/search/SearchBar";
import DeliveriesFilterModal from "./DeliveriesFilterModal";
import { readableDate } from "@/utils/date";
import { useDebounce } from "@/hooks/useDebounce";

const TABLE_HEADERS = [
  { label: "Package ID" },
  { label: "Pickup Date" },
  { label: "Location" },
  { label: "Delivery Method" },
  { label: "Delivered" },
];

const PER_PAGE = 7;

const DeliveriesWidget = () => {
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

  const { data, isLoading, error } = useDeliveries(
    `/deliveries?${getQueryParams(filterCriteria)}`
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

  const deliveries: DeliveryType[] = data?.data?.items ?? [];
  const totalLength: number = data?.data?.totalCount ?? 0;

  return (
    <Card
      isLoading={isLoading}
      error={error}
      title="Ongoing Deliveries"
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
          data={deliveries}
          renderRow={(delivery) => (
            <tr key={delivery.id} className="border-b border-neutral-300/50">
              <td className="ps-6 py-5">{delivery.id}</td>
              <td className="ps-6 py-5">{readableDate(delivery.pickUpTime)}</td>
              <td className="ps-6 py-5">
                {delivery.locationSnapshot?.address || "N/A"}{" "}
                {delivery.locationSnapshot?.city
                  ? `, ${delivery.locationSnapshot.city}`
                  : ""}
              </td>
              <td className="ps-6 py-5">
                {delivery.package?.packagePickupMethod?.name || "N/A"}
              </td>
              <td className="ps-6 py-5">
                {delivery.isDelivered ? "Yes" : "No"}
              </td>
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
        <DeliveriesFilterModal
          isOpen={isFilterModalOpen}
          onClose={toggleFilterModal}
          filters={filterCriteria}
          onApplyFilters={handleFilterChange}
        />
      )}
    </Card>
  );
};

export default DeliveriesWidget;
