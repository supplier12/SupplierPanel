import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProductSection } from "@/components/ProductSection";

const Products = () => {
  useEffect(() => {
    document.title = "Products | Supplier Panel";
  }, []);

  return (
    <DashboardLayout activeSection="products">
      <ProductSection />
    </DashboardLayout>
  );
};

export default Products;