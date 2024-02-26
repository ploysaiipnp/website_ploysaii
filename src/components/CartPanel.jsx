import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../redux/reducers/cartSlice";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { clear_item } from "../redux/reducers/cartSlice";
import _ from "lodash";
import shoppingService from "../services/shopping.services";
import { URL_IMAGE, getCartUser } from "../utils";
import numeral from "numeral";

const CartPanel = () => {
  const dispatch = useDispatch();
  const cartToggle = useSelector((state) => state.cart.toggle);

  const { data: myCart, refetch } = shoppingService.useQueryGetCart({});
  const { mutate: clearCart } = shoppingService.useMutationUpdateCart(
    (res) => {
      dispatch(clear_item());
      refetch();
    },
    (err) => {
      console.log("err:", err);
      return window.alert(`Error : ${err}`);
    }
  );

  return (
    <div
      className={`wrap-header-cart js-panel-cart ${
        cartToggle && "show-header-cart"
      }`}
    >
      <div className="s-full js-hide-cart"></div>

      <div className="header-cart flex-col-l p-l-65 p-r-25">
        <div className="header-cart-title flex-w flex-sb-m p-b-8">
          <span>ตะกร้าของฉัน</span>

          <div
            className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart"
            onClick={() => dispatch(toggle(false))}
          >
            <i className="zmdi zmdi-close"></i>
          </div>
        </div>

        <div className="header-cart-content flex-w js-pscroll">
          <ul className="header-cart-wrapitem w-full">
            {_.size(myCart?.cartList) < 1 && (
              <p style={{ opacity: "0.4" }}>- ไม่มีรายการสินค้า -</p>
            )}
            {myCart?.cartList?.map((n, i) => {
              return (
                <CartItem
                  productName={n.product_name}
                  productImg={`${URL_IMAGE}/${n.img_product}`}
                  price={n.price}
                  qty={n.amountOrder}
                  discount={n.discount}
                />
              );
            })}
          </ul>

          <div className="w-full">
            <div className="header-cart-total w-full p-tb-40">
              {`ยอดรวมทั้งหมด : ${numeral(
                _.sumBy(
                  myCart?.cartList,
                  (n) => n.price * n.amountOrder - n.discount
                )
              ).format("0,0")} บาท`}
            </div>

            <div className="header-cart-buttons flex-w w-full">
              <a
                style={{ color: "white", cursor: "pointer" }}
                className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10"
                onClick={() => {
                  if (confirm("คุณต้องการนำสินค้าออกทั้งหมดหรือไม่!") == true) {
                    clearCart({
                      cartId: getCartUser()?._id,
                      cartList: [],
                    });
                    dispatch(toggle(false));
                  }
                }}
              >
                นำออกทั้งหมด
              </a>

              <Link to="/cart" onClick={() => dispatch(toggle(false))}>
                <a
                  style={{ color: "white" }}
                  className="flex-c-m stext-101 cl0 size-107 bg1 bor2 hov-btn3 p-lr-15 trans-04 m-b-10"
                >
                  ดูตะกร้าสินค้า
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
