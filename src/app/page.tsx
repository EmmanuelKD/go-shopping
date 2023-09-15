import Header from "@/components/header";
import Image from "next/image";
// import HomeLayout from "./layouts/home-layout";
import LandingLayout from "./layouts/landing-layout";
import AppLayout from "./layouts/app-layout";

export default function Home() {
  return (
    <AppLayout isLanding>
      <LandingLayout  />
    </AppLayout>
  );
}
