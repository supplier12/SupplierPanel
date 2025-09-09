import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { OrdersSection } from "@/components/OrdersSection";

const Orders = () => {
  useEffect(() => {
    document.title = "Orders | Supplier Panel";
  }, []);

  return (
    <DashboardLayout activeSection="orders">
      <OrdersSection />
    </DashboardLayout>
  );
};

export default Orders;