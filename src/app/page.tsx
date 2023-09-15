import Header from "@/components/header";
import Image from "next/image";
// import HomeLayout from "./layouts/home-layout";
import LandingLayout from "./layouts/home-layout2";

export default function Home() {
  return (
    <main className="w-full ">
      <Header />
      <LandingLayout/>
    </main>
  );
}
