import React, { useEffect, useState } from "react";
import CartPanel from "../../../components/CartPanel";
import ProductModal from "../../../components/Modal/ProductModal";
import ProductCard from "../../../components/ProductCard";
import { productList } from "../../../constants/productList";
import { categoryList } from "../../../constants/categoryList";
import _ from "lodash";
import shoppingService from "../../../services/shopping.services";
import ProductSection from "../../../components/ProductSection";

const ShopPage = () => {
  const [filter, setFilter] = useState("all");

  const { data } = shoppingService.useQueryGetProduct({
    queryObj: {
      filter: filter,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <CartPanel />
      <ProductModal />
      <div className="bg0 m-t-160 p-b-140">
        <div className="container">
          <ProductSection />
        </div>
      </div>
    </>
  );
};

export default ShopPage;
