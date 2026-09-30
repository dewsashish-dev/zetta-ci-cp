import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import store from "./redux/store/store.jsx";

import "./index.css";

import { ClerkProvider } from "@clerk/react";
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <Provider store={store}>
      <App />
    </Provider>
  </ClerkProvider>,
);
