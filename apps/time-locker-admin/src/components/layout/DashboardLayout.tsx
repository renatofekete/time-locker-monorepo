import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen flex flex-col justify-between bg-zinc-50">
      <Header />
      <div className="flex-grow max-w-[1720px] px-2.5 2xl:py-0 w-full mx-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
