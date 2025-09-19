import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import paths from "@/config/paths";
import Loader from "@/components/ui/loader/Loader";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./routes/Profile";
import RegisterCourier from "./routes/RegisterCourier";

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
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
