import React from "react";
import { Link } from "react-router-dom";
import { NOT_FOUND_IMG } from "../assets";
import { URL_IMAGE } from "../utils";

const CategoryCard = ({
  categoryName = "Women",
  collectionName = "Spring 2018",
  thumbUrl = "assets/images/banner-01.jpg",
  link = "",
}) => {
  return (
    <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
      <div className="block1 wrap-pic-w">
        <div style={{ height: "280px", overflow: "hidden" }} className="center">
          <img
            style={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
              opacity: "0.6",
            }}
            src={thumbUrl ? `${URL_IMAGE}/${thumbUrl}` : NOT_FOUND_IMG}
            alt="IMG-BANNER"
          />
        </div>

        <Link to="/shop">
          <a className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
            <div className="block1-txt-child1 flex-col-l">
              <span className="block1-name ltext-102 trans-04 p-b-8">
                {categoryName}
              </span>

              <span className="block1-info stext-102 trans-04">
                {collectionName}
              </span>
            </div>

            <div className="block1-txt-child2 p-b-4 trans-05">
              <div className="block1-link stext-101 cl0 trans-09">ดูสินค้า</div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
