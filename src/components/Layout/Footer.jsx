import React from "react";
import { categoryList } from "../../constants/categoryList";

const get_in_touch = [
  {
    link: "https://www.facebook.com/profile.php?id=100072144051430&mibextid=9R9pXO",
    name: "Facebook : พลอยใส สกิน",
  },
  {
    link: "https://instagram.com/ploysaii_skin?igshid=MzRlODBiNWFlZA==",
    name: "Instagram : ploysaii_skin",
  },
  {
    link: "https://www.tiktok.com/@ploysaii_skinn?_t=8gj3oyrQxKz&_r=1",
    name: "Tiktok : @ploysaii_skinn",
  },
  {
    link: "https://lin.ee/E0y8DEX",
    name: "Line Official : @309dlokj (มี@)",
  },
];

const Footer = () => {
  return (
    <footer className="bg3 p-t-75 p-b-32">
      <div className="container">
        <div className="row d-flex">
          <div className="col-sm-6 col-lg-3 p-b-50">
            <h4 className="stext-301 cl0 p-b-30 base-font">หมวดหมู่สินค้า</h4>

            <ul>
              {categoryList.map((n, i) => (
                <li key={i} className="p-b-10">
                  <a href="/shop" className="stext-107 cl7 hov-cl1 trans-04">
                    {n.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="col-sm-6 col-lg-3 p-b-50">
            <h4 className="stext-301 cl0 p-b-30">Help</h4>

            <ul>
              <li className="p-b-10">
                <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                  Track Order
                </a>
              </li>

              <li className="p-b-10">
                <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                  Returns
                </a>
              </li>

              <li className="p-b-10">
                <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                  Shipping
                </a>
              </li>

              <li className="p-b-10">
                <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                  FAQs
                </a>
              </li>
            </ul>
          </div> */}

          <div className="col-sm-6 col-lg-3 p-b-50">
            <h4 className="stext-301 cl0 p-b-30 base-font">ช่องทางการติดต่อ</h4>

            <p className="stext-107 cl7 size-201">
              <ul>
                {get_in_touch?.map((n) => (
                  <li className="p-b-10">
                    <a
                      href={n.link}
                      target="_blank"
                      className="stext-107 cl7 hov-cl1 trans-04"
                    >
                      {n.name}
                    </a>
                  </li>
                ))}
              </ul>
            </p>
          </div>
          {/* 
          <div className="col-sm-6 col-lg-3 p-b-50">
            <h4 className="stext-301 cl0 p-b-30">Newsletter</h4>

            <form>
              <div className="wrap-input1 w-full p-b-4">
                <input
                  className="input1 bg-none plh1 stext-107 cl7"
                  type="text"
                  name="email"
                  placeholder="email@example.com"
                />
                <div className="focus-input1 trans-04"></div>
              </div>

              <div className="p-t-18">
                <button className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                  Subscribe
                </button>
              </div>
            </form>
          </div> */}
        </div>

        <div className="p-t-40">
          <p className="stext-107 cl6 txt-center">
            Copyright &copy; All rights reserved | by{" "}
            <a href="#">PLOYSAII SKIN</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
