import { Outlet, ScrollRestoration } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import HeaderSection from "../components/header/HeaderSection";
import FooterSection from "../components/footer/FooterSection";

const MainLayout = () => {
  return (
    <>
      <Analytics />
      <SpeedInsights />
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
