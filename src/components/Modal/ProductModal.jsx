import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemList } from "../../redux/reducers/cartSlice";
import { toggle } from "../../redux/reducers/productModalSlice";
import shoppingService from "../../services/shopping.services";
import { getCartUser } from "../../utils";
import { NOT_FOUND_IMG } from "../../assets";
import { Divider } from "antd";

const ProductModal = () => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [selectOption, setSelectOption] = useState(0);
  const showModal = useSelector((state) => state?.productModal?.toggle);
  const item = useSelector((state) => state?.productModal?.item);
  const item_in_cart = useSelector((state) => state?.cart?.items);
  const showQty = _.find(item_in_cart, (n) => n?.id === item?.id)?.qty || 1;

  const { data: myCart, refetch } = shoppingService.useQueryGetCart({
    onSuccess: (res) => {
      dispatch(itemList(res?.cartList));
    },
  });

  const { mutate: updateCart } = shoppingService.useMutationUpdateCart(() => {
    refetch();
  });

  const addQty = () => {
    setQty((prev) => prev + 1);
  };
  const downQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setQty(showQty);
    setSelectOption(0);
  }, [item]);

  return (
    <>
      <div
        className={`wrap-modal1 js-modal1 center ${
          showModal && "show-modal1 "
        }`}
      >
        <div className="overlay-modal1 js-hide-modal1"></div>

        <div className="container">
          <div className="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
            <button
              className="how-pos3 hov3 trans-04 js-hide-modal1"
              onClick={() => dispatch(toggle(false))}
            >
              <img src="assets/images/icons/icon-close.png" alt="CLOSE" />
            </button>

            <div className="row">
              <div className="col-md-6 col-lg-7 p-b-30">
                <div className="p-l-25 p-r-30 p-lr-0-lg">
                  <div className="wrap-slick3 flex-sb flex-w">
                    <div className="wrap-slick3-dots"></div>
                    <div className="wrap-slick3-arrows flex-sb-m flex-w"></div>

                    <div className="slick3 gallery-lb">
                      <div
                        className="item-slick3"
                        data-thumb="assets/images/product-detail-01.jpg"
                      >
                        <div className="h-100 center">
                          <img
                            style={{
                              objectFit: "cover",
                              height: "100%",
                              width: "100%",
                            }}
                            src={
                              item?.productImg
                                ? item?.productImg
                                : NOT_FOUND_IMG
                            }
                            alt="IMG-PRODUCT"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-5 p-b-30">
                <div className="p-r-50 p-t-5 p-lr-0-lg">
                  <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                    {item?.options ? item?.options[selectOption]?.name : "name"}
                  </h4>

                  <span className="mtext-106 cl2">{`ราคา ${
                    item?.options ? item?.options[selectOption]?.price : 0
                  } บาท`}</span>

                  <p className="cl3 p-t-23">รายละเอียดสินค้า</p>
                  <p className="cl3 ">
                    {item?.options
                      ? item?.options[selectOption]?.description
                      : "description"}
                  </p>
                  <Divider />
                  {item?.videoUrl && (
                    <>
                      <span>
                        <a href={item?.videoUrl} target="_blank">
                          <i
                            className="fa fa-clipboard me-2"
                            aria-hidden="true"
                          ></i>
                          กดดูคลิปรีวิวสินค้า
                        </a>
                      </span>
                      <Divider />
                    </>
                  )}

                  <div className="p-t-30">
                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-203 flex-c-m respon6">
                        ตัวเลือกสินค้า :
                      </div>

                      <div className="size-204 respon6-next">
                        <div className="px-2 bor8 bg0">
                          <select
                            className="ps-selection"
                            onChange={(e) => {
                              setSelectOption(e.target.value);
                            }}
                          >
                            {item?.options?.map((n, i) => (
                              <option key={i} value={i}>
                                {n?.name}
                              </option>
                            ))}
                          </select>
                          <div className="dropDownSelect2"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-204 flex-w flex-m respon6-next">
                        <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                          <div
                            className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                            onClick={downQty}
                          >
                            <i className="fs-16 zmdi zmdi-minus"></i>
                          </div>

                          <input
                            className="mtext-104 cl3 txt-center num-product"
                            type="number"
                            name="num-product"
                            value={qty}
                          />

                          <div
                            className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                            onClick={addQty}
                          >
                            <i className="fs-16 zmdi zmdi-plus"></i>
                          </div>
                        </div>

                        <button
                          className=" flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                          onClick={async () => {
                            let old = _.find(myCart?.cartList, {
                              productId: item?.id,
                              product_name: item?.options[selectOption]?.name,
                            });

                            if (old) {
                              let beforeItems = _.map(myCart?.cartList, (n) => {
                                if (
                                  n.product_name ===
                                  item?.options[selectOption]?.name
                                ) {
                                  return {
                                    productId: n?.productId,
                                    amount: n?.amountOrder + qty,
                                    option: n?.product_name,
                                  };
                                } else {
                                  return {
                                    productId: n?.productId,
                                    amount: n?.amountOrder,
                                    option: n?.product_name,
                                  };
                                }
                              });

                              updateCart({
                                cartId: getCartUser()?._id,
                                cartList: beforeItems,
                              });
                            } else {
                              let beforeItems = _.map(myCart?.cartList, (n) => {
                                return {
                                  productId: n?.productId,
                                  amount: n?.amountOrder,
                                  option: n?.product_name,
                                };
                              });
                              updateCart({
                                cartId: getCartUser()?._id,
                                cartList: [
                                  ...beforeItems,
                                  {
                                    productId: item?.id,
                                    amount: qty || 0,
                                    option: item?.options[selectOption]?.name,
                                  },
                                ],
                              });
                            }
                            setQty(1);
                            dispatch(toggle(false));
                            // AlertSuccess({ title: "เพิ่มสินค้าเรียบร้อย!" });
                          }}
                        >
                          เพิ่มสินค้าไปยังตะกร้า
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
