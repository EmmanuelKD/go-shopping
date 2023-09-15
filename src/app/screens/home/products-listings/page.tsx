import Header from "@/components/header";
import Image from "next/image";
// import HomeLayout from "./layouts/home-layout";
import ProductLayout from "@/app/layouts/product-listing";
import AppLayout from "@/app/layouts/app-layout";

export default function Listing() {
  return (
    <AppLayout>
      <ProductLayout />
    </AppLayout>
  );
}
