import EditCourier from "@/app/routes/EditCourier";
import path from "path";

const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },
  couriers: {
    path: "/couriers",
    getHref: () => "/couriers",
  },
  courier: {
    path: "/couriers/:id",
    getHref: (id: string) => `/couriers/${id}`,
  },
  editCourier: {
    path: "/couriers/:id/edit",
    getHref: (id: string) => `/couriers/${id}/edit`,
  },
  packages: {
    path: "/packages",
    getHref: () => "/packages",
  },
  package: {
    path: "/packages/:id",
    getHref: (id: string) => `/packages/${id}`,
  },
  settings: {
    path: "/settings",
    getHref: () => "/settings",
  },
  login: {
    path: "/login",
    getHref: () => "/login",
  },
  profile: {
    path: "/profile",
    getHref: () => "/profile",
  },
  courierRegister: {
    path: "/courier/register",
    getHref: () => "/courier/register",
  },
};

export default paths;
