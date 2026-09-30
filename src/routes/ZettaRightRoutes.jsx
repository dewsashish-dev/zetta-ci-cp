import { createBrowserRouter } from "react-router";

import MainLayout from "@/layout/MainLayout";
import AuthPage from "@/pages/authPage/AuthPage";
import HomeSection from "@/pages/home/HomeSection";
import MakeAOffer from "@/pages/makeaoffer/MakeAOffer";
import ProductList from "@/pages/productList/ProductList";
import ProductDetail from "@/pages/productDetail/ProductDetail";
import ProtectedRoute from "../auth/protectedRoute/ProtectedRoute";

const ZettaRightRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomeSection />,
      },
      {
        path: "/productlist",
        element: <ProductList />,
      },
      {
        path: "/productdetail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/makeaoffer/:id",
        element: (
          <ProtectedRoute>
            <MakeAOffer />,
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

export default ZettaRightRoutes;
