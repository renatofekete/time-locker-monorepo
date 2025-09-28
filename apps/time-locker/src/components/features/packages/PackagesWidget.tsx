import Tuning from "../../../assets/icons/Tuning.svg?react";
import SortVertical from "../../../assets/icons/SortVertical.svg?react";
import Table from "../../ui/table/Table";
import Pagination from "../../ui/pagination/Pagination";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/button/Button";
import { usePackages } from "@/hooks/usePackages";
import { useDebounce } from "@/hooks/useDebounce";
import SearchBar from "@/components/ui/search/SearchBar";
import { getQueryParams } from "@/utils/query";
import type { PackageType } from "@/types/PackageType";
import PackagesFilterModal from "./PackagesFilterModal";
import { Card } from "time-locker-ui";
import { Link } from "react-router-dom";
import paths from "@/config/paths";
import toast from "react-hot-toast";

const TABLE_HEADERS = [
  { label: "Package ID" },
  { label: "Status" },
  { label: "Tracking Number" },
  { label: "Pickup method" },
  { label: "Recipient type" },
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

  // Track new package IDs, highlight only after initial load
  const [initialIds, setInitialIds] = useState<string[]>([]);
  const [newPackageIds, setNewPackageIds] = useState<string[]>([]);
  const hasSetInitialIds = useRef(false);
  const prevIdsRef = useRef<string[]>([]);
  const isInitialLoad = useRef(true);

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

  // Highlight new packages only after initial load
  useEffect(() => {
    if (data?.data?.items) {
      const currentIds = data.data.items.map((pkg: PackageType) => pkg.id);
      if (currentPage === 1) {
        if (!hasSetInitialIds.current && initialIds.length === 0) {
          setInitialIds(currentIds);
          setNewPackageIds([]);
          hasSetInitialIds.current = true;
        } else {
          const newIds = currentIds.filter(
            (id: string) => !initialIds.includes(id)
          );
          setNewPackageIds(newIds);
          if (newIds.length > 0) {
            toast.success(
              `New package${newIds.length > 1 ? "s" : ""} received!`
            );
          }
        }
      } else {
        setNewPackageIds([]);
      }
    }
  }, [data, currentPage, initialIds]);

  // ...rest of your component...

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
          renderRow={(pkg) => (
            <tr
              key={pkg.id}
              className={
                newPackageIds.includes(pkg.id)
                  ? "bg-yellow-100 font-bold"
                  : "border-b border-neutral-300/50"
              }
            >
              <td className="ps-6 py-5 text-blue-600">
                <Link to={paths.package.getHref(pkg.id)}>{pkg.id}</Link>
              </td>
              <td className="ps-6 py-5">{pkg.stateId}</td>
              <td className="ps-6 py-5">{pkg.trackingNumber}</td>
              <td className="ps-6 py-5">{pkg.packagePickupMethodId}</td>
              <td className="ps-6 py-5">{pkg.packageRecipientTypeId}</td>
              <td className="ps-6 py-5">{pkg.courierCompany?.name}</td>
              <td className="ps-6 py-5">{pkg.courierCompany?.phoneNumber}</td>
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
