import React from "react";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
function DashboardLayout({ children }) {
  try {
    return (
      <div>
        <Header />
        <div className="mx-5 md:mx-20 lg:mx-36">
          <Toaster />
          {children}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in dashboard's layout: ", error);
    return <div>Something went wrong. Try Again!</div>;
  }
}

export default DashboardLayout;
