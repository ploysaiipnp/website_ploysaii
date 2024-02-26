import React, { useEffect } from "react";
import CartPanel from "../../../components/CartPanel";
import CategoryCard from "../../../components/CategoryCard";
import ProductModal from "../../../components/Modal/ProductModal";
import ProductSection from "../../../components/ProductSection";
import { categoryHiligh } from "../../../constants/categoryHiligh";
import { NOT_FOUND_IMG, banner_lovepotion } from "../../../assets";
import adminService from "../../../services/admin.services";
import { Spin } from "antd";

const HomePage = () => {
  const {
    data: getHighlight,
    isLoading: isLoadingHighlight,
    refetch: refetchHighlight,
  } = adminService.useQueryGetHighlight({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <CartPanel />
      <ProductModal />
      <section className="section-slide">
        <div className="wrap-slick1">
          <div className="slick1">
            <div
              className="item-slick1"
              style={{
                backgroundImage: `url(${banner_lovepotion})`,
              }}
              // style="background-image: url('https://lovepotionofficial.com/wp-content/uploads/2022/10/20220808-IMG_9573-scaled.jpg')"
              // style="background-image: url('https://lovepotionofficial.com/wp-content/uploads/2022/10/20220806-IMG_9565-scaled.jpg')"
              // style="background-image: url('https://lovepotionofficial.com/wp-content/uploads/2022/10/20220808-IMG_9626-scaled.jpg')"
            >
              <div className="container h-full">
                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="fadeInDown"
                    data-delay="0"
                  >
                    <span className="ltext-101 cl2 respon2">
                      Women Collection 2018
                    </span>
                  </div>

                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="fadeInUp"
                    data-delay="800"
                  >
                    <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                      NEW SEASON
                    </h2>
                  </div>

                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="zoomIn"
                    data-delay="1600"
                  >
                    <a
                      href="product.html"
                      className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-banner bg0 p-t-80 p-b-50">
        <div className="container">
          <div className="row">
            {isLoadingHighlight ? (
              <Spin />
            ) : (
              getHighlight?.map(
                (n, i) =>
                  i < 3 && (
                    <CategoryCard
                      key={i}
                      categoryName={n?.title}
                      collectionName={n?.description}
                      thumbUrl={n?.picPath}
                    />
                  )
              )
            )}
          </div>
        </div>
      </div>

      <section className="bg0 p-t-23 p-b-140">
        <div className="container">
          <div className="p-b-10">
            <h1>สินค้าทั้งหมด</h1>
          </div>
          <ProductSection />
        </div>
      </section>
    </>
  );
};

export default HomePage;
