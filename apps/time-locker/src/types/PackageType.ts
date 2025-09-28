import type { CourierCompanyType } from "./DeliveryType";

export type PackagePickupMethod = {
  id: number;
  name: string;
  abbreviation: string;
};

export type PackageStateType = {
  id: number;
  name: string;
  abbreviation: string;
};

export type SenderType = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  userSettingsId: string;
  roleId: number;
  registrationStep: number;
  lastActive: string;
  fullName: string;
  id: string;
  createdTime: string;
  updatedTime: string;
};

export type PackageType = {
  id: string;
  senderId: string;
  sender: SenderType;
  senderTypeId: number;
  packagePickupMethodId: number;
  packageRecipientTypeId: number;
  packageShipmentPriceCovererId: number;
  shipmentPrice: number;
  hasToPayForPackage: boolean;
  hasRecipientPaid: boolean;
  hasSenderPaid: boolean;
  stateId: number;
  courierCompanyId: string;
  courierCompany: CourierCompanyType;
  trackingNumber: string;
  createdTime: string;
  updatedTime: string;
};
