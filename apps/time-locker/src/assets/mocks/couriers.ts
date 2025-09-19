type Courier = {
  courierId: string;
  name: string;
  status: "active" | "inactive";
  activationDate: string;
  deactivationDate: string | null;
};

type BestPerformingCourier = {
  name: string;
  successRate: number; // percentage
};

export const BEST_PERFORMING_COURIERS: BestPerformingCourier[] = [
  { name: "John Doe", successRate: 92.3 },
  { name: "Jane Smith", successRate: 95.1 },
  { name: "Alex Johnson", successRate: 89.7 },
  { name: "Maria Garcia", successRate: 93.5 },
  { name: "Michael Brown", successRate: 90.8 },
  { name: "Emily Davis", successRate: 94.2 },
  { name: "David Wilson", successRate: 91.6 },
  { name: "Sophia Martinez", successRate: 96.0 },
  { name: "James Anderson", successRate: 88.9 },
  { name: "Olivia Thomas", successRate: 92.8 },
];

export const COURIERS: Courier[] = [
  {
    courierId: "#340883534",
    name: "John Doe",
    status: "active",
    activationDate: "2023-01-15 06:05:46",
    deactivationDate: null,
  },
  {
    courierId: "#340883535",
    name: "Jane Smith",
    status: "active",
    activationDate: "2023-02-10 09:12:30",
    deactivationDate: null,
  },
  {
    courierId: "#340883536",
    name: "Alex Johnson",
    status: "inactive",
    activationDate: "2022-11-20 14:22:10",
    deactivationDate: "2023-05-01 10:00:00",
  },
  {
    courierId: "#340883537",
    name: "Maria Garcia",
    status: "active",
    activationDate: "2023-03-05 08:45:00",
    deactivationDate: null,
  },
  {
    courierId: "#340883538",
    name: "Michael Brown",
    status: "inactive",
    activationDate: "2022-12-01 12:30:00",
    deactivationDate: "2023-04-15 16:20:00",
  },
  {
    courierId: "#340883539",
    name: "Emily Davis",
    status: "active",
    activationDate: "2023-04-18 11:10:00",
    deactivationDate: null,
  },
  {
    courierId: "#340883540",
    name: "David Wilson",
    status: "active",
    activationDate: "2023-01-25 07:55:00",
    deactivationDate: null,
  },
  {
    courierId: "#340883541",
    name: "Sophia Martinez",
    status: "active",
    activationDate: "2023-05-02 10:20:00",
    deactivationDate: null,
  },
  {
    courierId: "#340883542",
    name: "James Anderson",
    status: "inactive",
    activationDate: "2022-10-15 13:40:00",
    deactivationDate: "2023-03-10 09:30:00",
  },
];
