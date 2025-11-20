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
import { readableDateTime } from "@/utils/date";

const TABLE_HEADERS = [
  { label: "Tracking Number" },
  { label: "Sender" },
  { label: "Recipient" },
  { label: "Pickup time" },
  { label: "Delivery time" },
  { label: "Location" },
  { label: "State" },
];

const PER_PAGE = 6;

const PackagesWidget = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    orderBy: "deliveryTime|asc",
    pickUpTimeFrom: "",
    pickUpTimeTo: "",
    pickUpMethod: "",
    location: "",
    isDelivered: "",
    query: "",
    pageNumber: "1",
    pageSize: PER_PAGE.toString(),
    state: "",
  });

  // highlight tracking using createdTime
  const [newPackageIds, setNewPackageIds] = useState<string[]>([]);
  const [removedHighlightIds, setRemovedHighlightIds] = useState<string[]>([]);
  const lastSeenCreatedAtRef = useRef<string | null>(null);
  const toastedIdsRef = useRef<Set<string>>(new Set());
  const highlightedOnceRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    setFilterCriteria((prev) => ({
      ...prev,
      pageNumber: currentPage.toString(),
      CourierCompanyId: "0d446e31-fe0d-438b-9a7a-b4ee9304f06b",
    }));
  }, [currentPage]);

  const toggleSort = useCallback(() => {
    setFilterCriteria((prev) => {
      const [field, dir] = (prev.orderBy || "deliveryTime|asc").split("|");
      const newDir = dir === "asc" ? "desc" : "asc";
      return { ...prev, orderBy: `${field}|${newDir}`, pageNumber: "1" };
    });
    setCurrentPage(1);
  }, []);

  const currentSortDir =
    (filterCriteria.orderBy || "deliveryTime|asc").split("|")[1] ?? "asc";

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

  useEffect(() => {
    // Only detect new packages on page 1
    if (!data?.data?.items || currentPage !== 1) {
      setNewPackageIds([]);
      return;
    }

    const items = data.data.items as PackageType[];

    const parseTime = (t?: string | number | null) =>
      t ? new Date(t).getTime() : 0;

    // newest createdTime in this fetch
    const currentMaxMs = items.reduce(
      (acc, it) => Math.max(acc, parseTime((it as any).createdTime)),
      0
    );

    // first time seeing page 1 — initialize lastSeen and don't highlight/toast
    if (!lastSeenCreatedAtRef.current) {
      lastSeenCreatedAtRef.current = currentMaxMs
        ? new Date(currentMaxMs).toISOString()
        : null;
      setNewPackageIds([]);
      return;
    }

    const lastSeenMs = parseTime(lastSeenCreatedAtRef.current);

    // packages strictly newer than lastSeen and not already highlighted
    const newItems = items.filter((it) => {
      const itMs = parseTime((it as any).createdTime);
      return itMs > lastSeenMs && !highlightedOnceRef.current.has(it.id);
    });

    const newIds = newItems.map((it) => it.id);
    setNewPackageIds(newIds);

    // toast only for ids that haven't been toasted
    const toastIds = newIds.filter((id) => !toastedIdsRef.current.has(id));
    if (toastIds.length > 0) {
      toast.success(`New package${toastIds.length > 1 ? "s" : ""} received!`);
      toastIds.forEach((id) => toastedIdsRef.current.add(id));
    }

    // advance lastSeen so we won't re-detect same packages later
    if (currentMaxMs > lastSeenMs) {
      lastSeenCreatedAtRef.current = new Date(currentMaxMs).toISOString();
    }
  }, [data, currentPage]);

  const handleRowMouseEnter = (pkgId: string) => {
    if (newPackageIds.includes(pkgId) && !removedHighlightIds.includes(pkgId)) {
      setRemovedHighlightIds((prev) => [...prev, pkgId]);
      highlightedOnceRef.current.add(pkgId);
      // ensure it won't trigger toast again
      toastedIdsRef.current.add(pkgId);
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
            <Button onClick={toggleSort} aria-label="Toggle sort">
              Sort {currentSortDir === "asc" ? "↑" : "↓"}{" "}
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
          renderRow={(pkg) => {
            const isHighlighted =
              newPackageIds.includes(pkg.id) &&
              !removedHighlightIds.includes(pkg.id);

            return (
              <tr
                key={pkg.id}
                className={
                  isHighlighted
                    ? "bg-yellow-100 font-bold"
                    : "border-b border-neutral-300/50"
                }
                onMouseEnter={() => handleRowMouseEnter(pkg.id)}
              >
                <td className="ps-6 py-5 text-blue-600">
                  <Link to={paths.package.getHref(pkg.id)}>
                    {pkg.trackingNumber}
                  </Link>
                </td>
                <td className="ps-6 py-5">{pkg.sender.fullName}</td>
                <td className="ps-6 py-5">{pkg.recipient.fullName}</td>
                <td className="ps-6 py-5">
                  {readableDateTime(pkg.pickupTime)}
                </td>
                <td className="ps-6 py-5">
                  {readableDateTime(pkg.deliveryTime)}
                </td>
                <td className="ps-6 py-5">
                  {pkg.recipient.location.city} {pkg.recipient.location.address}
                </td>
                <td>{pkg.state.name}</td>
              </tr>
            );
          }}
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
