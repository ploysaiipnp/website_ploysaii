import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertClosed,
  AlertError,
  AlertLoading,
} from "../../../components/alert/alert";
import adminService from "../../../services/admin.services";
import { setRoleUser } from "../../../utils";
import {
  setTokenAdmin,
  setUserAdmin,
  setUserIdAdmin,
} from "../../../utils/adminUtils";
import { banner_lovepotion } from "../../../assets";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const { mutate: getUser, isLoading: isLoadingGetUser } =
    adminService.useMutationGetUser(
      (res) => {
        AlertClosed();
        if (res?.admin) {
          setRoleUser("admin");
          setUserAdmin(res?.admin);
          navigate("/admin/manage-order");
        }
      },
      (err) => {
        AlertClosed();
        AlertError({ text: err });
      }
    );

  const { mutate: postLogin, isLoading: isLoadingPostLogin } =
    adminService.useMutationLogin(
      (res) => {
        const { id, access_token } = res.data;
        setTokenAdmin(access_token);
        setUserIdAdmin(id);
        if (access_token) {
          getUser({ id });
        }
      },
      () => {
        AlertClosed();
        AlertError({ text: "รหัสผ่านไม่ถูกต้อง!" });
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
            <h1>แอดมิน</h1>
            <a href="/" style={{ color: "black", opacity: "0.8" }}>
              <u>กลับสู่หน้าหลัก</u>
            </a>
            {/* <Link to="/" style={{ color: "black", opacity: "0.8" }}></Link> */}
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
          <>
            <button
              style={{ height: "50px", color: "white" }}
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={isLoadingPostLogin}
              onClick={() => {
                handleLogin();
              }}
            >
              เข้าสู่ระบบด้วยแอดมิน
            </button>
            {/* <div className="center mt-3">
              <Link to="/register-admin">
                <p>ลงทะเบียนสำหรับแอดมิน</p>
              </Link>
            </div> */}
          </>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
