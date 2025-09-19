type CustomerReport = {
  packageId: string;
  report_date: string;
  delivery_method: "Parcel machine" | "Time Locker" | "Personal mailbox";
  report_reason: "Damaged package" | "Missing package";
  type: "error" | "warning";
};

export const CUSTOMER_REPORTS: CustomerReport[] = [
  {
    packageId: "#340883534",
    report_date: "2020-05-01 06:05:46",
    delivery_method: "Parcel machine",
    report_reason: "Damaged package",
    type: "error",
  },
  {
    packageId: "#340883535",
    report_date: "2020-05-02 10:15:30",
    delivery_method: "Time Locker",
    report_reason: "Missing package",
    type: "error",
  },
  {
    packageId: "#340883536",
    report_date: "2020-05-03 12:20:10",
    delivery_method: "Personal mailbox",
    report_reason: "Damaged package",
    type: "warning",
  },
  {
    packageId: "#340883537",
    report_date: "2020-05-04 09:45:00",
    delivery_method: "Parcel machine",
    report_reason: "Missing package",
    type: "warning",
  },
  {
    packageId: "#340883538",
    report_date: "2020-05-05 14:30:25",
    delivery_method: "Time Locker",
    report_reason: "Damaged package",
    type: "error",
  },
  {
    packageId: "#340883539",
    report_date: "2020-05-06 16:50:40",
    delivery_method: "Personal mailbox",
    report_reason: "Missing package",
    type: "error",
  },
  {
    packageId: "#340883540",
    report_date: "2020-05-07 18:05:55",
    delivery_method: "Parcel machine",
    report_reason: "Damaged package",
    type: "warning",
  },
];
