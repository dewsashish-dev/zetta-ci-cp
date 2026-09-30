import { Outlet, ScrollRestoration } from "react-router";

import { Analytics } from "@vercel/analytics/next";

import HeaderSection from "../components/header/HeaderSection";
import FooterSection from "../components/footer/FooterSection";

const MainLayout = () => {
  return (
    <>
      <Analytics />
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
