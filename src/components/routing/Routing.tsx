import AllProducts from "../../pages/products/AllProducts";
import Layout from "../../pages/Layout";
import Home from "../../Home";
import { Routes, Route, Navigate } from "react-router-dom";
import AddProductForm from "../../pages/products/new-product/AddProductForm";
import ProductId from "../../pages/products/ProductId";
import EditProduct from "../../pages/products/edit-product/EditProduct";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pages" element={<Layout />}>
        <Route index element={<Navigate to="/pages/products" replace />} />
        <Route path="products" element={<AllProducts />} />
        <Route
          path="/pages/products/new-product"
          element={<AddProductForm />}
        />
        <Route path="/pages/products/product/:id" element={<ProductId />} />
        <Route path="/pages/products/edit-product/:id" element={<EditProduct />} />
      </Route>
    </Routes>
  );
};

export default Routing;
