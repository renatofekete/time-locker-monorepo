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

export type LockerSnapshotType = {
  originalId: string;
  ownerId: string;
  name: string;
  serialNumber: string;
  hasPackage: boolean;
  permissionCount: number;
  snapshotTime: string;
  locationSnapshotId: string;
  id: string;
  createdTime: string;
  updatedTime: string;
};

export type RecipientType = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  userSettingsId: string;
  locationId: string;
  location: RecipientLocationType;
  registrationStep: number;
  lastActive: string;
  fullName: string;
  id: string;
  createdTime: string;
  updatedTime: string;
};

export type RecipientLocationType = {
  address: string;
  city: string;
  floorUnit: string;
  country: string;
  region: string;
  zipCode: string;
  latitude: number;
  longitude: string;
  objectId: string;
  objectType: string;
  name: string;
  typeId: number;
  id: string;
  createdTime: string;
  updatedTime: string;
};

export type PackageType = {
  id: string;
  senderId: string;
  sender: SenderType;
  senderTypeId: number;
  senderLockerId: string;
  senderLockerSnapshotId: string;
  senderLockerSnapshot: LockerSnapshotType;
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
  recipientId: string;
  recipient: RecipientType;
  recipientLockerSnapshotId: string;
  recipientLockerSnapshot: LockerSnapshotType;
  offerValidUntil: string;
  responseTime: string;
  recipientPayTime: string;
  recipientTimeToPay: string;
  senderPayTime: string;
  senderTimeToPay: string;
  pickupTime: string;
  deliveryTime: string;
};
