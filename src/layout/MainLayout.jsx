import { Outlet, ScrollRestoration } from "react-router";

import HeaderSection from "../components/header/HeaderSection";
import FooterSection from "../components/footer/FooterSection";

const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <HeaderSection />
      <main>
        <Outlet />
      </main>
      <FooterSection />
    </>
  );
};

export default MainLayout;
