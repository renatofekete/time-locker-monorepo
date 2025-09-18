import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import paths from "@/config/paths";
import Loader from "@/components/ui/loader/Loader";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./routes/Profile";
import RegisterCourier from "./routes/RegisterCourier";
import Users from "./routes/Users";
import Partners from "./routes/Partners";
import Devices from "./routes/Devices";
import Subscriptions from "./routes/Subscriptions";
import Advertising from "./routes/Advertising";
import Rent from "./routes/Rent";
import Problems from "./routes/Problems";
import RegisterPartner from "./routes/RegisterPartner";
import RegisterDevice from "./routes/RegisterDevice";

const Login = lazy(() => import("@/app/routes/auth/Login"));
const Home = lazy(() => import("@/app/routes/Home"));
const Couriers = lazy(() => import("@/app/routes/Couriers"));
const Settings = lazy(() => import("@/app/routes/Settings"));
const Packages = lazy(() => import("@/app/routes/Packages"));

const LazyComponent = ({ children }: { children: React.ReactNode }) => (
  <Suspense
    fallback={
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    }
  >
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: paths.login.path,
    element: (
      <LazyComponent>
        <Login />
      </LazyComponent>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: paths.home.path,
        element: (
          <LazyComponent>
            <Home />
          </LazyComponent>
        ),
      },
      {
        path: paths.couriers.path,
        element: (
          <LazyComponent>
            <Couriers />
          </LazyComponent>
        ),
      },
      {
        path: paths.packages.path,
        element: (
          <LazyComponent>
            <Packages />
          </LazyComponent>
        ),
      },
      {
        path: paths.settings.path,
        element: (
          <LazyComponent>
            <Settings />
          </LazyComponent>
        ),
      },
      {
        path: paths.profile.path,
        element: (
          <LazyComponent>
            <Profile />
          </LazyComponent>
        ),
      },
      {
        path: paths.courierRegister.path,
        element: (
          <LazyComponent>
            <RegisterCourier />
          </LazyComponent>
        ),
      },
      {
        path: paths.users.path,
        element: (
          <LazyComponent>
            <Users />
          </LazyComponent>
        ),
      },
      {
        path: paths.partners.path,
        element: (
          <LazyComponent>
            <Partners />
          </LazyComponent>
        ),
      },
      {
        path: paths.partnerRegister.path,
        element: (
          <LazyComponent>
            <RegisterPartner />
          </LazyComponent>
        ),
      },
      {
        path: paths.devices.path,
        element: (
          <LazyComponent>
            <Devices />
          </LazyComponent>
        ),
      },
      {
        path: paths.devicesRegister.path,
        element: (
          <LazyComponent>
            <RegisterDevice />
          </LazyComponent>
        ),
      },
      {
        path: paths.subscriptions.path,
        element: (
          <LazyComponent>
            <Subscriptions />
          </LazyComponent>
        ),
      },
      {
        path: paths.advertising.path,
        element: (
          <LazyComponent>
            <Advertising />
          </LazyComponent>
        ),
      },
      {
        path: paths.rent.path,
        element: (
          <LazyComponent>
            <Rent />
          </LazyComponent>
        ),
      },
      {
        path: paths.problems.path,
        element: (
          <LazyComponent>
            <Problems />
          </LazyComponent>
        ),
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
