import type { ApiResponse } from "./ApiResponseType";
import type { PackageType } from "./PackageType";

export type CourierCompanyType = {
  abbreviation: string;
  id: string;
  logoUrl: string;
  name: string;
  notificationEmail: string | null;
  phoneNumber: string | null;
};

export type DeliveryType = {
  id: string;
  typeId: number;
  isCollected: boolean;
  isDelivered: boolean;
  locationSnapshot: any;
  senderPhoneNumber: string | null;
  recipientPhoneNumber: string | null;
  type: string | null;
  package: PackageType;
  pickUpTime: string;
  deliveryTime: string;
};

export type FetchDeliveriesType = ApiResponse<{
  pageNumber: number;
  pageSize: number;
  items: DeliveryType[];
  totalCount: number;
  lastPage: number;
}>;
