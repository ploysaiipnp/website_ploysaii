import { Button } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { NOT_FOUND_IMG } from "../../../assets/images/products";
import {
  AlertClosed,
  AlertError,
  AlertLoading,
} from "../../../components/alert";
import { add_item } from "../../../redux/reducers/cartSlice";
import shoppingService from "../../../services/shopping.services";
import {
  GET_IMG_PATH,
  URL_API,
  getCartUser,
  setCartUser,
  setToken,
  setUser,
  setUserId,
} from "../../../utils";
import { banner_lovepotion } from "../../../assets";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const myCart = useSelector((state) => state.cart.items);

  const { mutate: getUser, isLoading: isLoadingGetUser } =
    shoppingService.useMutationGetUser(
      (res) => {
        AlertClosed();
        if (res?.user) {
          setUser(res?.user);
          setCartUser(res?.cart);
          navigate("/");
        }
      },
      (err) => {
        AlertClosed();
        AlertError({ text: err });
      }
    );

  const { mutate: postLogin, isLoading: isLoadingPostLogin } =
    shoppingService.useMutationLogin(
      (res) => {
        const { id, access_token } = res.data;
        setToken(access_token);
        setUserId(id);
        if (access_token) {
          getUser({ id });
        }
      },
      (err) => {
        AlertClosed();
        AlertError({ text: "รหัสผ่านไม่ถูกต้อง" });
      }
    );

  const handleLogin = () => {
    let values = {
      username: username,
      password: password,
    };
    AlertLoading({});
    postLogin(values);
  };

  useEffect(() => {
    let isCart = getCartUser()?.cartList;
    if (isCart) {
      let loadCart = _.map(isCart, (n) => {
        return {
          id: n._id,
          productName: n.product_name,
          productImg:
            `${URL_API}/${GET_IMG_PATH}/${n.img_product}` || NOT_FOUND_IMG,
          price: n.price,
          options: n.product_name,
          qty: n.amountOrder,
        };
      });
      dispatch(add_item(...loadCart));
    }
  }, [myCart]);

  return (
    <>
      <div
        className="center"
        style={{
          // position: "absolute",
          // top: "0",
          // zIndex: "2000",
          background: "#FDC7DA",
          minHeight: "100vh",
          minWidth: "100vw",
          // backgroundImage: `url(${banner_lovepotion})`,
        }}
      >
        <div
          style={{
            borderRadius: "8px",
            width: "500px",
            height: "auto",
            background: "white",
            padding: "32px",
          }}
        >
          <div
            className="mb-5"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>เข้าสู่ระบบ</h1>
            <a href="/" style={{ color: "black", opacity: "0.8" }}>
              <u>กลับสู่หน้าหลัก</u>
            </a>
            {/* <Link to="/" style={{ color: "black", opacity: "0.8" }}>
              <u>กลับสู่หน้าหลัก</u>
            </Link> */}
          </div>
          <div className="form-group mb-3">
            <label className="text-black" for="fname">
              ชื่อผู้ใช้งาน
            </label>
            <input
              style={{ height: "50px" }}
              type="text"
              placeholder="ชื่อผู้ใช้งาน"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <label className="text-black" for="fname">
              รหัสผ่าน
            </label>
            <input
              style={{ height: "50px" }}
              type="password"
              placeholder="รหัสผ่าน"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isLoadingPostLogin || isLoadingGetUser ? (
            <>
              <p>กำลังโหลด...</p>
            </>
          ) : (
            <>
              <button
                style={{ height: "50px", color: "white" }}
                type="submit"
                className="btn btn-primary w-100"
                onClick={handleLogin}
              >
                เข้าสู่ระบบ
              </button>
              <Button
                className="w-100 mt-2"
                style={{ height: "50px" }}
                onClick={() => {
                  navigate("/admin");
                }}
              >
                เข้าสู่ระบบด้วย Admin
              </Button>
              <div className="center mt-3">
                <Link to="/register">
                  <p>ลงทะเบียนผู้ใช้งาน</p>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
