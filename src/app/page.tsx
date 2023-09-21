// import HomeLayout from "./layouts/home-layout";
import AppLayout from "./layouts/app-layout";
import LandingLayout from "./layouts/landing-layout";

export default function Home() {
  return (
 
        <AppLayout isLanding>
          <LandingLayout />
        </AppLayout>
  
  );
}
