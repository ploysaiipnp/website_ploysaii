import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clear_item, toggle } from "../../redux/reducers/cartSlice";
import { item_clear } from "../../redux/reducers/productModalSlice";
import shoppingService from "../../services/shopping.services";
import {
  getUser,
  getUserId,
  setCartUser,
  setToken,
  setUser,
  setUserId,
} from "../../utils";
import { web_logo } from "../../assets";
import { AlertWarning } from "../alert/Alert";

const text_left = "มีสินค้าหลากหลาย พร้อมโปรโมชั่นอีกมากมาย !!";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUser = getUser();
  const cart = useSelector((state) => state.cart.cartList);

  const { data: myCart, refetch } = shoppingService.useQueryGetCart({
    onError: (err) => {
      console.log("err:", err);
    },
  });

  const { mutate: getProfile } = shoppingService.useMutationGetProfile(
    (res) => {
      return res;
    },
    (err) => {
      console.log("err:", err);
      if (err?.response?.status === 401) {
        AlertWarning({
          text: "เซสชั่นหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง!",
          onOk: () => {
            setUser(null);
            setUserId(null);
            setCartUser(null);
            setToken(null);
            dispatch(clear_item());
            dispatch(item_clear());
            navigate("/login");
          },
        });
      }
      return null;
    }
  );

  useEffect(() => {
    let auth = getProfile();
    refetch();
  }, [cart]);

  return (
    <header>
      <div className="container-menu-desktop">
        <div className="top-bar">
          <div className="content-topbar flex-sb-m h-full container">
            <div className="left-top-bar">{text_left}</div>

            <div className="right-top-bar flex-w h-full">
              {isUser === null ? (
                <>
                  <Link to="/register">
                    <a className="flex-c-m trans-04 p-lr-25">ลงทะเบียน</a>
                  </Link>
                  <Link to="/login">
                    <a className="flex-c-m trans-04 p-lr-25">เข้าสู่ระบบ</a>
                  </Link>
                </>
              ) : (
                <>
                  <Link>
                    <a className="flex-c-m trans-04 p-lr-25">
                      <i className="fa fa-user me-3" aria-hidden="true"></i>
                      {isUser?.username || "username"}
                    </a>
                  </Link>
                  <Link
                    onClick={() => {
                      setUser(null);
                      setUserId(null);
                      setCartUser(null);
                      setToken(null);
                      dispatch(clear_item());
                      dispatch(item_clear());
                      navigate("/");
                      // navigate.reload();
                    }}
                  >
                    <a className="flex-c-m trans-04 p-lr-25">ออกจากระบบ</a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="wrap-menu-desktop">
          <nav className="limiter-menu-desktop container">
            <Link to="/">
              <a className="logo">
                <img src={web_logo} alt="IMG-LOGO" />
              </a>
            </Link>

            <div className="menu-desktop">
              <ul className="main-menu">
                <li className="active-menu">
                  <Link to="/">
                    <a style={{ fontSize: "16px" }}>หน้าแรก</a>
                  </Link>
                </li>

                <li>
                  <Link to="/shop">
                    <a style={{ fontSize: "16px" }}>สินค้า</a>
                  </Link>
                </li>

                <li>
                  <Link to="/contact-us">
                    <a style={{ fontSize: "16px" }}>ติดต่อเรา</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="wrap-icon-header flex-w flex-r-m">
              <div
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                data-notify={myCart?.cartList?.length || 0}
                onClick={() => {
                  let userId = getUserId();
                  if (userId) {
                    dispatch(toggle(true));
                  } else {
                    AlertWarning({
                      text: "กรุณาเข้าสู่ระบบ!",
                      onOk: () => {
                        navigate("/login");
                      },
                    });
                  }
                }}
              >
                <i className="zmdi zmdi-shopping-cart"></i>
              </div>
              <p className="m-0 px-3">|</p>
              <div
                style={{ cursor: "pointer" }}
                className="h-100 d-flex justify-content-center align-items-center"
                onClick={() => {
                  let userId = getUserId();
                  if (userId) {
                    navigate("/history");
                    // let auth = getProfile();
                    // if (auth) {
                    //   navigate("/history");
                    // }
                  } else {
                    AlertWarning({
                      text: "กรุณาเข้าสู่ระบบ!",
                      onOk: () => {
                        navigate("/login");
                      },
                    });
                  }
                }}
              >
                <p className="m-0 text-black">รายการสั่งซื้อของฉัน</p>
              </div>
              <p className="m-0 px-3">|</p>
              <div
                style={{ cursor: "pointer" }}
                className="h-100 d-flex justify-content-center align-items-center"
                onClick={() => {
                  let userId = getUserId();
                  if (userId) {
                    navigate("/profile");
                    // let auth = getProfile();
                    // if (auth) {
                    //   navigate("/profile");
                    // }
                  } else {
                    AlertWarning({
                      text: "กรุณาเข้าสู่ระบบ!",
                      onOk: () => {
                        navigate("/login");
                      },
                    });
                  }
                }}
              >
                <p className="m-0 text-black">โปรไฟล์</p>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="wrap-header-mobile">
        <div className="logo-mobile">
          <Link to="/">
            <a className="logo">
              <img src={web_logo} alt="IMG-LOGO" />
            </a>
          </Link>
        </div>
        <div className="menu-desktop">
          <ul className="main-menu">
            <li className="active-menu">
              <Link to="/">
                <a style={{ fontSize: "16px" }}>หน้าแรก</a>
              </Link>
            </li>

            <li>
              <Link to="/shop">
                <a style={{ fontSize: "16px" }}>สินค้า</a>
              </Link>
            </li>

            <li>
              <Link to="/contact-us">
                <a style={{ fontSize: "16px" }}>ติดต่อเรา</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="wrap-icon-header flex-w flex-r-m">
          <div
            className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
            data-notify={myCart?.cartList?.length || 0}
            onClick={() => {
              let userId = getUserId();
              if (userId) {
                dispatch(toggle(true));
              } else {
                AlertWarning({
                  text: "กรุณาเข้าสู่ระบบ!",
                  onOk: () => {
                    navigate("/login");
                  },
                });
              }
            }}
          >
            <i className="zmdi zmdi-shopping-cart"></i>
          </div>
          <p className="m-0 px-3">|</p>
          <div
            style={{ cursor: "pointer" }}
            className="h-100 d-flex justify-content-center align-items-center"
            onClick={() => {
              let userId = getUserId();
              if (userId) {
                navigate("/history");
                // let auth = getProfile();
                // if (auth) {
                //   navigate("/history");
                // }
              } else {
                AlertWarning({
                  text: "กรุณาเข้าสู่ระบบ!",
                  onOk: () => {
                    navigate("/login");
                  },
                });
              }
            }}
          >
            <p className="m-0 text-black">รายการสั่งซื้อของฉัน</p>
          </div>
          <p className="m-0 px-3">|</p>
          <div
            style={{ cursor: "pointer" }}
            className="h-100 d-flex justify-content-center align-items-center"
            onClick={() => {
              let userId = getUserId();
              if (userId) {
                navigate("/profile");
                // let auth = getProfile();
                // if (auth) {
                //   navigate("/profile");
                // }
              } else {
                AlertWarning({
                  text: "กรุณาเข้าสู่ระบบ!",
                  onOk: () => {
                    navigate("/login");
                  },
                });
              }
            }}
          >
            <p className="m-0 text-black">โปรไฟล์</p>
          </div>
        </div>

        {/* <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </div> */}
      </div>

      <div className="menu-mobile">
        <ul className="topbar-mobile">
          <li>
            <div className="left-top-bar">{text_left}</div>
          </li>

          <li>
            <div className="right-top-bar flex-w h-full">
              {isUser === null ? (
                <>
                  <Link to="/register">
                    <a className="flex-c-m trans-04 p-lr-25">ลงทะเบียน</a>
                  </Link>
                  <Link to="/login">
                    <a className="flex-c-m trans-04 p-lr-25">เข้าสู่ระบบ</a>
                  </Link>
                </>
              ) : (
                <>
                  <Link>
                    <a className="flex-c-m trans-04 p-lr-25">
                      <i className="fa fa-user me-3" aria-hidden="true"></i>
                      {isUser?.username || "username"}
                    </a>
                  </Link>
                  <Link
                    onClick={() => {
                      setUser(null);
                      setUserId(null);
                      setCartUser(null);
                      setToken(null);
                      dispatch(clear_item());
                      dispatch(item_clear());
                      navigate("/");
                      // navigate.reload();
                    }}
                  >
                    <a className="flex-c-m trans-04 p-lr-25">ออกจากระบบ</a>
                  </Link>
                </>
              )}
            </div>
          </li>
        </ul>

        {/* <ul className="main-menu-m">
          <li>
            <a href="index.html">Home</a>
            <ul className="sub-menu-m">
              <li>
                <a href="index.html">Homepage 1</a>
              </li>
              <li>
                <a href="home-02.html">Homepage 2</a>
              </li>
              <li>
                <a href="home-03.html">Homepage 3</a>
              </li>
            </ul>
            <span className="arrow-main-menu-m">
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </span>
          </li>

          <li>
            <a href="product.html">Shop</a>
          </li>

          <li>
            <a
              href="shoping-cart.html"
              className="label1 rs1"
              data-label1="hot"
            >
              Features
            </a>
          </li>

          <li>
            <a href="blog.html">Blog</a>
          </li>

          <li>
            <a href="about.html">About</a>
          </li>

          <li>
            <a href="contact.html">Contact</a>
          </li>
        </ul> */}
      </div>
    </header>
  );
};

export default Navbar;
