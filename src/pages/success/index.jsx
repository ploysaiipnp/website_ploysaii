import { Button, Col, Result, Row, Spin } from "antd";
import moment from "moment/moment";
import numeral from "numeral";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartPanel from "../../components/CartPanel";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const order = useSelector((state) => state.myOrder.order);

  useEffect(() => {
    if (!order?.order_code) {
      navigate("/");
    }
  }, [order]);

  return (
    <>
      <CartPanel />

      {order?.order_code ? (
        <Row
          style={{ minHeight: "500px", padding: "100px 0px" }}
          className="center m-t-150"
        >
          <div
            style={{
              border: "1px solid #d4d4d4",
              minWidth: "500px",
              minHeight: "300px",
            }}
            className="p-4"
          >
            <Row>
              <Col span={24}>
                <Result status="success" title="ทำรายการสั่งซื้อสำเร็จ !" />
                <div style={{ opacity: "0.8" }} className="text-center">
                  <p>{`หมายเลขคำสั่งซื้อ : ${
                    order?.order_code || "xxxxxxxxx"
                  }`}</p>
                  <p>{`ยอดชำระ : ${numeral(order?.net_price).format(
                    "0,0"
                  )} บาท`}</p>
                  <p>{`วันที่สั่งซื้อ : ${moment(order?.createdAt).format(
                    "DD MMMM YYYY - เวลา HH:mm:ss น."
                  )}`}</p>
                </div>
              </Col>
            </Row>
            <Row style={{ marginBottom: "48px" }} className="center mt-4">
              <Button
                style={{ borderRadius: "0px", padding: "20px 40px" }}
                className="me-2 center"
                onClick={() => {
                  navigate("/");
                }}
              >
                กลับสู่หน้าหลัก
              </Button>
              <Button
                style={{ borderRadius: "0px", padding: "20px 40px" }}
                type="primary"
                className="center"
                onClick={() => {
                  navigate("/history");
                }}
              >
                ดูรายการคำสั่งซื้อ
              </Button>
            </Row>
          </div>
        </Row>
      ) : (
        <Row style={{ padding: "200px" }} className="center">
          <Spin />
        </Row>
      )}
    </>
  );
};

export default SuccessPage;
