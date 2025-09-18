import type { CourierCompanyType } from "./DeliveryType";

export type PackagePickupMethod = {
  id: number;
  name: string;
  abbreviation: string;
};

export type PackageSTateType = {
  id: number;
  name: string;
  abbreviation: string;
};

export type PackageType = {
  id: string;
  code: string;
  creationTime: string;
  weight: number;
  width: number;
  trackingNumber: string;
  trackingLink: string;
  shipmentPrice: number;
  depth: number;
  hasRecipientPaid: boolean;
  hasSenderPaid: boolean;
  hasToPayForPackage: true;
  message: string;
  packagePrice: number;
  pickupTime: string | null;
  packagePickupMethod: PackagePickupMethod;
  courierCompany: CourierCompanyType;
  state: PackageSTateType;
  recipientAdressSnapshot: string | null;
  recipientName: string;
};
