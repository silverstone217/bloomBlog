import AsideNavBarBS from "@/components/dashboard/AsideNavBarBS";
import NavBarSS from "@/components/dashboard/NavBarSS";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full relative h-dvh overflow-hidden flex items-start justify-start">
      <AsideNavBarBS />
      <NavBarSS />
      <div className="flex-1 h-full overflow-x-hidden overflow-y-auto pt-16 lg:pt-4 px-4 lg:px-0">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
