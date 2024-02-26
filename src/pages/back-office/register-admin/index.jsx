import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminService from "../../../services/admin.services";
import { Button, Form, Input } from "antd";
import {
  AlertClosed,
  AlertError,
  AlertLoading,
  AlertSuccess,
  AlertWarning,
} from "../../../components/alert/Alert";

export const RegisterAdmin = () => {
  const navigate = useNavigate();

  const { mutate: postRegister } = adminService.useMutationRegister(
    () => {
      AlertClosed();
      AlertSuccess({
        text: "ลงทะเบียนสำเร็จ!",
        onOk: () => {
          navigate("/admin");
        },
      });
    },
    (err) => {
      AlertClosed();
      AlertError({ text: err });
    }
  );

  const onFinish = (values) => {
    if (values?.password !== values?.confirmPassword) {
      return AlertWarning({ text: "กรุณาระบุรหัสผ่านให้ตรงกัน" });
    } else {
      AlertLoading({});
      postRegister(values);
    }
  };

  return (
    <div
      className="center"
      style={{
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
          <h2>ลงทะเบียนแอดมิน</h2>
          <Link to="/" style={{ color: "black", opacity: "0.8" }}>
            <u>กลับสู่หน้าหลัก</u>
          </Link>
        </div>

        <Form
          name="user-register-form"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="เบอร์โทรศัพท์"
            name="phone"
            rules={[
              {
                required: true,
                message: "กรุณาระบุเบอร์มือถือ!",
              },
            ]}
          >
            <Input size="large" placeholder="เบอร์โทรศัพท์" />
          </Form.Item>

          <Form.Item
            label="ชื่อผู้ใช้งาน"
            name="username"
            rules={[
              {
                required: true,
                message: "กรุณาระบุชื่อผู้ใช้งาน!",
              },
            ]}
          >
            <Input size="large" placeholder="ชื่อผู้ใช้งาน" />
          </Form.Item>
          <Form.Item
            label="รหัสผ่าน"
            name="password"
            rules={[
              {
                required: true,
                message: "กรุณาระบุรหัสผ่าน!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="ยืนยันรหัสผ่าน"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "กรุณายินยันรหัสผ่าน!",
              },
            ]}
          >
            <Input.Password size="large" placeholder="ยืนยันรหัสผ่าน" />
          </Form.Item>

          <Form.Item className="mt-4">
            <Button block size="large" type="primary" htmlType="submit">
              ลงทะเบียนแอดมิน
            </Button>
          </Form.Item>
        </Form>

        <div className="center mt-3">
          <Link to="/admin">
            <p>เข้าสู่ระบบด้วยแอดมิน</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
