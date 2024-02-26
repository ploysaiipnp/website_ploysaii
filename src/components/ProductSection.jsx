import _ from "lodash";
import React, { useState } from "react";
import { categoryList } from "../constants/categoryList";
import shoppingService from "../services/shopping.services";
import { GET_IMG_PATH, URL_API, URL_IMAGE } from "../utils";
import ProductCard from "./ProductCard";
import { NOT_FOUND_IMG } from "../assets";

const ProductSection = () => {
  const [filter, setFilter] = useState("all");

  const { data } = shoppingService.useQueryGetProduct({
    queryObj: {
      filter: filter,
    },
  });

  return (
    <>
      <div className="flex-w flex-sb-m p-b-52">
        <div className="flex-w flex-l-m filter-tope-group m-tb-10">
          {categoryList.map((n, i) => (
            <button
              key={i}
              className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                filter === n.key && "how-active1"
              }`}
              data-filter="*"
              onClick={() => setFilter(n.key)}
            >
              {n.name}
            </button>
          ))}
        </div>
      </div>

      <div className="row isotope-grid">
        {_.filter(data, (product, i) =>
          filter === "all" ? product : filter === product?.category
        ).map((product, i) => {
          let ex_image = `${URL_IMAGE}/${product?.img_product}`;
          if (i < 1) {
            console.log("ex_image:", ex_image);
          }
          return (
            <ProductCard
              key={i}
              id={product?._id}
              description={product?.optionProduct[0]?.description}
              productName={product?.optionProduct[0]?.name}
              productImg={
                product?.img_product
                  ? `${URL_IMAGE}/${product?.img_product}`
                  : NOT_FOUND_IMG
              }
              price={product?.optionProduct[0]?.price}
              options={product?.optionProduct}
              videoUrl={product?.videoUrl}
              data={product}
            />
          );
        })}
      </div>
      {/* ------------- load more ----------- */}
      {/* <div className="flex-c-m flex-w w-full p-t-45">
        <a
          href="#"
          className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
        >
          Load More
        </a>
      </div> */}
    </>
  );
};

export default ProductSection;
