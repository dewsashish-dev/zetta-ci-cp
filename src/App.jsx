import { RouterProvider } from "react-router";
import { Slide, ToastContainer } from "react-toastify";

import ZettaRightRoutes from "@/routes/ZettaRightRoutes";

import "./App.css";

function App() {
  return (
    <>
      <RouterProvider router={ZettaRightRoutes} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  );
}

export default App;
