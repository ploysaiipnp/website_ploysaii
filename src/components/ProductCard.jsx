import { Image } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { NOT_FOUND_IMG } from "../assets";
import {
  item_clear,
  item_selected,
  toggle,
} from "../redux/reducers/productModalSlice";

const ProductCard = ({
  id = 0,
  description = "description",
  productName = "Esprit Ruffle Shirt",
  productImg = NOT_FOUND_IMG,
  price = "$16.64",
  options = [],
  videoUrl = null,
  data,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
        <div className="block2">
          <div className="block2-pic hov-img0">
            <div
              style={{ height: "340px", border: "0.1px solid #dddddd30" }}
              className="center"
            >
              <Image
                preview={false}
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
                src={productImg}
                alt="IMG-PRODUCT"
              />
            </div>
            <a
              className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
              onClick={() => {
                dispatch(toggle(true));
                dispatch(item_clear());
                dispatch(
                  item_selected({
                    id,
                    description,
                    productName,
                    productImg,
                    price,
                    options,
                    videoUrl,
                    data,
                  })
                );
              }}
            >
              รายละเอียด
            </a>
          </div>

          <div className="block2-txt flex-w flex-t p-t-14">
            <div className="block2-txt-child1 flex-col-l ">
              <a
                href="product-detail.html"
                className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
              >
                {productName}
              </a>

              <span className="stext-105 cl3">{`${price} บาท`}</span>
            </div>

            {/* <div className="block2-txt-child2 flex-r p-t-3">
              <a
                href="#"
                className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
              >
                <img
                  className="icon-heart1 dis-block trans-04"
                  src="assets/images/icons/icon-heart-01.png"
                  alt="ICON"
                />
                <img
                  className="icon-heart2 dis-block trans-04 ab-t-l"
                  src="assets/images/icons/icon-heart-02.png"
                  alt="ICON"
                />
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
