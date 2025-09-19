import type { LocationType } from "@/types/LocationType";
import type { ApiResponse } from "./ApiResponseType";

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber?: string;
  referralCode?: string;
  iban: string;
  languageCode: string;
  location: LocationType;
  roleEntity: null | string;
  roleId: null | number;
  registrationStepEntity: null | string;
  registrationStepId: null | number;
  courierServiceId: null | string;
  creationTime: string;
  updateTime: string;
  lastActive: string;
};

export type FetchUserType = ApiResponse<UserType>;
