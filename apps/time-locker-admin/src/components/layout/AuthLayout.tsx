import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="max-w-80 w-80">{children}</div>
    </div>
  );
};

export default AuthLayout;
