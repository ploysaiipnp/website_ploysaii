import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorPage from "./pages/ErrorPage";

import LayoutAdmin from "./pages/back-office/LayoutAdmin/LayoutAdmin";
import DashboardAdmin from "./pages/back-office/dashboard";
import ManageProduct from "./pages/back-office/manage-prodcut";
import ShoppingCart from "./pages/e-commerce/cart";
import ContactUs from "./pages/e-commerce/contact";
import HomePage from "./pages/e-commerce/homepage";
import LayoutPage from "./pages/e-commerce/layout/LayoutPage";
import LoginPage from "./pages/e-commerce/login";
import ShopPage from "./pages/e-commerce/shop";
import RegisterPage from "./pages/register";
import SuccessPage from "./pages/success";
import LoginAdmin from "./pages/back-office/login-admin";
import AdminReport from "./pages/back-office/report-admin";
import AdminPromotion from "./pages/back-office/promotion";
import MyHistory from "./pages/e-commerce/history";
import UserProfile from "./pages/e-commerce/user-profile";
import { RegisterAdmin } from "./pages/back-office/register-admin";
import ManageOrder from "./pages/back-office/manage-order";
import ManageCategory from "./pages/back-office/manage-category";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* --- user/ customer ----- */}
          <Route path="/" element={<LayoutPage />}>
            <Route index element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/history" element={<MyHistory />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/success" element={<SuccessPage />} />
          </Route>
          {/* --- admin ----- */}
          <Route path="/admin">
            <Route index element={<LoginAdmin />} />
            <Route path="manage-product" element={<ManageProduct />} />
            <Route path="manage-order" element={<ManageOrder />} />
            <Route path="manage-category" element={<ManageCategory />} />
            <Route path="promotion" element={<AdminPromotion />} />
            <Route path="reports" element={<AdminReport />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/register-admin" element={<RegisterAdmin />} /> */}
          <Route path="/*" element={<ErrorPage />} />
          {/* <Route path="/admin-dashboard" element={<DashboardAdmin />} />
          <Route path="/admin-manage-product" element={<ManageProduct />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
