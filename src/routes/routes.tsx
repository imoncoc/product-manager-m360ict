import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../pages/products/Products";
import ProductDetails from "../pages/products/ProductDetails";

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
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

export default router;
