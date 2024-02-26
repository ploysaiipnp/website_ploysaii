import _ from "lodash";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartPanel from "../../../components/CartPanel";
import {
  add_item,
  clear_item,
  itemList,
  set_cart_item,
} from "../../../redux/reducers/cartSlice";
import { setOrder } from "../../../redux/reducers/orderSlice";
import shoppingService from "../../../services/shopping.services";
import { URL_IMAGE, getCartUser } from "../../../utils";
import {
  AlertClosed,
  AlertError,
  AlertLoading,
  AlertSuccess,
  AlertWarning,
} from "../../../components/alert/Alert";
import { Alert, Button } from "antd";
const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);
  const [address, setAddress] = useState(null);
  const [postCode, setPostCode] = useState(null);
  const items = useSelector((state) => state.cart.items);

  const { data: myCart, refetch: refetchCart } =
    shoppingService.useQueryGetCart({});
  const { mutate: clearCart } = shoppingService.useMutationUpdateCart(
    () => {
      console.log("clearCart:");
    },
    (err) => {
      console.log("ERR : clear cart -", err);
    }
  );

  const { mutate: updateCart } = shoppingService.useMutationUpdateCart(
    (res) => {
      AlertClosed();
      refetchCart();
    },
    (err) => {
      AlertClosed();
      AlertError({ text: err });
    }
  );

  const { mutate: createOrder } = shoppingService.useMutationOrder(
    (res) => {
      let order_code = res?.data?.order_code;
      let myOrder = res?.data;
      if (myOrder) {
        dispatch(setOrder(myOrder));
      }
      clearCart({ cartId: getCartUser()?._id, cartList: [] });
      dispatch(clear_item());
      AlertSuccess({
        text: `ซื้อสำเร็จ! หมายเลขคำสั่งซื้อ :${order_code}`,
        onOk: () => {
          navigate("/success");
        },
      });
    },
    (err) => {
      AlertError({ text: err });
    }
  );

  const handleCheckout = () => {
    let _cartId = getCartUser()?._id;
    let _address = `${address} ${postCode}`;

    if (_.size(myCart?.cartList) < 1) {
      AlertWarning({ text: "กรุณาเพิ่มรายการสินค้า !" });
      return;
    }
    if (address === null || postCode === null) {
      AlertWarning({ text: "กรุณาระบุที่อยู่จัดส่งสินค้า !" });
      return;
    }
    createOrder({ cartId: _cartId, address: _address });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(set_cart_item(myCart?.cartList));
  }, [items, myCart]);

  console.log("item", items);

  return (
    <>
      <CartPanel />
      <div className="bg0 m-t-160 p-t-75 p-b-85">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
              <div className="m-l-25 m-r--38 m-lr-0-xl">
                <div className="wrap-table-shopping-cart">
                  <table className="table-shopping-cart">
                    <tr className="table_head">
                      <th className="column-1 base-font">รูปสินค้า</th>
                      <th className="column-2 base-font">ชื่อสินค้า</th>
                      <th className="column-3 base-font">ราคาสินค้า</th>
                      <th className="column-4 base-font center">จำนวน</th>
                      <th className="column-5 base-font">ราคารวม</th>
                      <th className="column-5 base-font">จัดการสินค้า</th>
                    </tr>

                    {_.sortBy(myCart?.cartList, (o) => o.productId).map(
                      (n, i) => {
                        return (
                          <>
                            <tr className="table_row">
                              <td className="column-1">
                                <div className="how-itemcart1">
                                  <img
                                    src={`${URL_IMAGE}/${n.img_product}`}
                                    alt="IMG"
                                  />
                                </div>
                              </td>
                              <td className="column-2">{n.product_name}</td>
                              <td className="column-3">{`${n.price} บาท`}</td>
                              <td className="column-4">
                                <div className="center">
                                  <div
                                    className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m py-3"
                                    onClick={() => {
                                      console.log("n:", n);
                                      if (n.amountOrder > 1) {
                                        let filter = _.filter(
                                          myCart?.cartList,
                                          (x) => x?.productId !== n?.productId
                                        );
                                        let newItems = _.map(filter, (x) => {
                                          return {
                                            productId: x?.productId,
                                            amount: x?.amountOrder,
                                            option: x?.product_name,
                                          };
                                        });

                                        let old = _.find(
                                          myCart?.cartList,
                                          (x) => x?.productId === n?.productId
                                        );
                                        let oldItem = {
                                          productId: old?.productId,
                                          amount: old?.amountOrder - 1,
                                          option: old?.product_name,
                                        };

                                        updateCart({
                                          cartId: getCartUser()?._id,
                                          cartList: [...newItems, oldItem],
                                        });
                                      } else {
                                        AlertWarning({
                                          text: "เลือกสินค้าน้อยสุด 1 ชิ้น",
                                        });
                                      }
                                    }}
                                  >
                                    <i className="fs-16 zmdi zmdi-minus h-100"></i>
                                  </div>
                                  <div
                                    style={{ width: "50px" }}
                                    className="wrap-num-product flex-w m-l-auto m-r-0 center mx-1"
                                  >
                                    <input
                                      className="mtext-104 cl3 txt-center num-product w-100"
                                      type="number"
                                      name="num-product1"
                                      value={n.amountOrder}
                                    />
                                  </div>
                                  <div
                                    className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m  py-3"
                                    onClick={() => {
                                      let filter = _.filter(
                                        myCart?.cartList,
                                        (x) => x?.productId !== n?.productId
                                      );
                                      let newItems = _.map(filter, (x) => {
                                        return {
                                          productId: x?.productId,
                                          amount: x?.amountOrder,
                                          option: x?.product_name,
                                        };
                                      });

                                      let old = _.find(
                                        myCart?.cartList,
                                        (x) => x?.productId === n?.productId
                                      );
                                      let oldItem = {
                                        productId: old?.productId,
                                        amount: old?.amountOrder + 1,
                                        option: old?.product_name,
                                      };

                                      updateCart({
                                        cartId: getCartUser()?._id,
                                        cartList: [...newItems, oldItem],
                                      });
                                    }}
                                  >
                                    <i className="fs-16 zmdi zmdi-plus"></i>
                                  </div>
                                </div>
                              </td>
                              <td className="column-5 ">{`${
                                n.price * n.amountOrder
                              } บาท`}</td>
                              <td className="column-5">
                                <Button
                                  danger
                                  onClick={() => {
                                    AlertLoading({});
                                    let filter = _.filter(
                                      myCart?.cartList,
                                      (x) => x?.productId !== n?.productId
                                    );
                                    let newItems = _.map(filter, (x) => {
                                      return {
                                        productId: x?.productId,
                                        amount: x?.amountOrder,
                                        option: x?.product_name,
                                      };
                                    });
                                    console.log("new item:", newItems);
                                    updateCart({
                                      cartId: getCartUser()?._id,
                                      cartList: newItems,
                                    });
                                  }}
                                >
                                  ลบ
                                </Button>
                              </td>
                            </tr>
                          </>
                        );
                      }
                    )}
                  </table>
                  {_.size(myCart?.cartList) < 1 && (
                    <div style={{ height: "120px" }} className="center w-100">
                      <p style={{ opacity: "0.4" }}>ไม่มีรายการสินค้า</p>
                    </div>
                  )}
                </div>

                <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm"></div>
              </div>
            </div>

            <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
              <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                <h4 className="mtext-109 cl2 p-b-30 base-font">สรุปรายการสั่งซื้อ</h4>

                <div className="flex-w flex-t bor12 p-b-13"></div>

                <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                  <div className="size-208 w-full-ssm">
                    <span className="stext-110 cl2">การจัดส่ง :</span>
                  </div>

                  <div className="size-209 p-r-18 p-r-0-sm w-full-ssm">
                    <div className="p-t-15">
                      <span className="stext-112 cl8">
                        ระบุที่อยู่สำหรับจัดส่งสินค้า
                      </span>

                      <div className="bor8 bg0 m-b-12 m-t-6">
                        <input
                          className="stext-111 cl8 plh3 size-111 p-lr-15"
                          type="text"
                          placeholder="ระบุที่อยู่"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>

                      <div className="bor8 bg0 m-b-22">
                        <input
                          className="stext-111 cl8 plh3 size-111 p-lr-15"
                          type="text"
                          placeholder="ระบุรหัสไปรษณีย์"
                          onChange={(e) => setPostCode(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-w flex-t p-t-27 p-b-33">
                  <div className="size-208">
                    <span className="mtext-101 cl2">ยอดรวม:</span>
                  </div>

                  <div className="size-209 p-t-1">
                    <span className="mtext-110 cl2">{`${numeral(
                      _.sumBy(
                        myCart?.cartList,
                        (n) => n.price * n.amountOrder - n.discount
                      )
                    ).format("0,0")} บาท`}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                >
                  ยืนยันการสั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
