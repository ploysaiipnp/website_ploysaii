import React from "react";

import { Col, Row } from "antd";

const DashboardAdmin = () => {
  return (
    <>
      <Row className="my-4">
        <h4>ยอดขายทั้งหมด : 14,065 บาท</h4>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <div
            style={{
              height: "100px",
              border: "1px solid gray",
              borderRadius: "8px",
            }}
            className="w-100 text-center "
          >
            <h1>16</h1>
            <p>คำสั่งซื้อ</p>
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              height: "100px",
              border: "1px solid gray",
              borderRadius: "8px",
            }}
            className="w-100 text-center "
          >
            <h1>10</h1>
            <p>สินค้าทั้งหมด</p>
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              height: "100px",
              border: "1px solid gray",
              borderRadius: "8px",
            }}
            className="w-100 text-center "
          >
            <h1>6,424</h1>
            <p>stock สินค้า</p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DashboardAdmin;
