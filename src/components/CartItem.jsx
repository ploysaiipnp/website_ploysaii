import React from "react";

const CartItem = ({
  id = 0,
  productName = "productName",
  productImg = "productImg",
  price = 0,
  qty = 1,
}) => {
  return (
    <>
      <li className="header-cart-item flex-w flex-t m-b-12">
        <div className="header-cart-item-img">
          <img src={productImg} alt="IMG" />
        </div>

        <div className="header-cart-item-txt p-t-8">
          <a className="header-cart-item-name m-b-18 hov-cl1 trans-04">
            {productName}
          </a>

          <span className="header-cart-item-info">{`${qty} x ${price} บาท`}</span>
        </div>
      </li>
    </>
  );
};

export default CartItem;
