import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../pages/products/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
]);

export default router;
