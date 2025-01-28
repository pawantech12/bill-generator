import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import FuelBillGenerator from "./pages/FuelBillGenerator.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App element={<Home />} />,
  },
  {
    path: "/fuel-bill-generator",
    element: <App element={<FuelBillGenerator />} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />

    <ToastContainer
      position="bottom-right" // Set position to bottom-right
      autoClose={3000} // Automatically close after 3 seconds
      limit={1}
      hideProgressBar={false} // Show progress bar
      newestOnTop={false} // Display newest on top
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </StrictMode>
);
