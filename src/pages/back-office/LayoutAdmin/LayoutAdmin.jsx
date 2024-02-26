import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Col, Divider, Row } from "antd";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { web_logo } from "../../../assets";
import { setRoleUser } from "../../../utils";
import {
  setTokenAdmin,
  setUserAdmin,
  setUserIdAdmin,
} from "../../../utils/adminUtils";
import shoppingService from "../../../services/shopping.services";

const listMenu = [
  {
    key: "manage-order",
    label: "จัดคำสั่งซื้อ",
    icon: "fa fa-shopping-bag",
    link: "/admin/manage-order",
  },
  {
    key: "manage-product",
    label: "จัดการสินค้า",
    icon: "fa-solid fa-cart-shopping",
    link: "/admin/manage-product",
  },
  {
    key: "manage-category",
    label: "ไฮไลท์สินค้า",
    icon: "fa fa-list-alt",
    link: "/admin/manage-category",
  },
  {
    key: "promotion",
    label: "โปรโมชั่น",
    icon: "fa-solid fa-gift",
    link: "/admin/promotion",
  },
  {
    key: "reports",
    label: "รายงานการขาย",
    icon: "fa-solid fa-chart-line",
    link: "/admin/reports",
  },
];

const LayoutAdmin = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const _path = location.pathname.split("/");
  const currentPath = _path[_.size(_path) - 1];


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  return (
    <>
      <Row style={{ display: "flex", minHeight: "100vh" }}>
        <Col
          span={4}
          style={{
            minWidth: "270px",
            width: "270px",
            maxWidth: "270px",
            borderRight: "1px solid #dddddd",
          }}
          className="p-4"
        >
          <div className="d-flex align-items-center justify-content-center p-4">
            <a className="logo">
              <img width={220} src={web_logo} alt="IMG-LOGO" />
            </a>
          </div>
          <Divider />
          <div className="mt-5">
            <ul>
              {listMenu.map((menu, index) => (
                <li
                  key={index}
                  className="d-flex justify-content-start align-items-center mb-4"
                >
                  <Link
                    className={`${
                      menu.key === currentPath ? "text-primary" : "text-black"
                    }`}
                    to={menu.link}
                  >
                    <span>
                      <i className={`${menu.icon}`}></i>
                    </span>
                    <span className="ms-4">{menu.label}</span>
                  </Link>
                </li>
              ))}
              <Divider />
              <li
                className="d-flex justify-content-start align-items-center mb-4"
                onClick={() => {
                  setRoleUser(null);
                  setUserAdmin(null);
                  setUserIdAdmin(null);
                  setTokenAdmin(null);
                  // dispatch(clear_item());
                  // dispatch(item_clear());
                  navigate("/admin");
                }}
              >
                <Link className="text-black">
                  <span>
                    <i className={`fa-solid fa-arrow-right-to-bracket`}></i>
                  </span>
                  <span className="ms-4">ออกจากระบบ</span>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col style={{ flex: "1", overflow: "hidden" }} className="p-4">
          {children}
        </Col>
      </Row>
      {/* 
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
      >
        <AsideBar />
        <div className="body-wrapper">
          <HeaderAdmin />
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default LayoutAdmin;
