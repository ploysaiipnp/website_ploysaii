import React, { useEffect, useState } from "react";
import CartPanel from "../../../components/CartPanel";
import { Row } from "antd";
import axios from "axios";

const ContactUs = () => {
  // const videoUrl =
  //   "https://www.tiktok.com/@p.ployji23/video/7187364499484134682?refer=embed";
  // const [embedData, setEmbedData] = useState(null);

  // useEffect(() => {
  //   const fetchEmbedData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://www.tiktok.com/oembed?url=${videoUrl}`
  //       );
  //       setEmbedData(response.data.html);
  //     } catch (error) {
  //       console.error("Error fetching embed data:", error);
  //     }
  //   };

  //   fetchEmbedData();
  // }, [videoUrl]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CartPanel />
      <section
        className="bg-img1 m-t-160 txt-center p-lr-15 p-tb-92"
        style={{ backgroundImage: "url('assets/images/bg-01.jpg')" }}
      >
        <h2 className="ltext-105 cl0 txt-center base-font">ติดต่อเรา</h2>
      </section>

      <section className="bg0 p-t-104 p-b-116">
        <div className="container">
          {/* <Row>
            <div dangerouslySetInnerHTML={{ __html: embedData }} />
          </Row> */}
          <div className="flex-w flex-tr">
            <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
              <form>
                <h4 className="mtext-105 cl2 txt-center p-b-30">
                  ส่งข้อความ
                </h4>

                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="text"
                    name="email"
                    placeholder="อีเมลล์ของคุณ"
                  />
                  <img
                    className="how-pos4 pointer-none"
                    src="assets/images/icons/icon-email.png"
                    alt="ICON"
                  />
                </div>

                <div className="bor8 m-b-30">
                  <textarea
                    className="stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25"
                    name="msg"
                    placeholder="เขียนข้อความ..."
                  ></textarea>
                </div>

                <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                  ส่ง
                </button>
              </form>
            </div>

            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md">
              {/* <div className="flex-w w-full p-b-42">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-map-marker"></span>
                </span>

                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Address</span>

                  <p className="stext-115 cl6 size-213 p-t-18">
                    Coza Store Center 8th floor, 379 Hudson St, New York, NY
                    10018 US
                  </p>
                </div>
              </div>

              <div className="flex-w w-full p-b-42">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-phone-handset"></span>
                </span>

                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Lets Talk</span>

                  <p className="stext-115 cl1 size-213 p-t-18">
                    +1 800 1236879
                  </p>
                </div>
              </div> */}
              <h4 className="mtext-105 cl2  p-b-30">ติดต่อเรา</h4>

              <div className="flex-w w-full">
                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Instagram :</span>
                  <p className="stext-115 cl1 size-213 p-t-18">
                    <a href="https://instagram.com/ploysaii_skin?igshid=MzRlODBiNWFlZA==">
                      https://instagram.com/ploysaii_skin?igshid=MzRlODBiNWFlZA==
                    </a>
                  </p>
                  <span className="mtext-110 cl2">Tiktok :</span>
                  <p className="stext-115 cl1 size-213 p-t-18">
                    <a href=" https://www.tiktok.com/@ploysaii_skinn?_t=8gj3oyrQxKz&_r=1">
                      https://www.tiktok.com/@ploysaii_skinn?_t=8gj3oyrQxKz&_r=1
                    </a>
                  </p>
                  <span className="mtext-110 cl2">Line Official :</span>
                  <p className="stext-115 cl1 size-213 p-t-18">
                    <a href="https://lin.ee/E0y8DEX">https://lin.ee/E0y8DEX</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
