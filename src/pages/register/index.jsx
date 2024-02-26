import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertClosed,
  AlertError,
  AlertLoading,
  AlertSuccess,
  AlertWarning,
} from "../../components/alert/Alert";
import shoppingService from "../../services/shopping.services";
import { Button, Form, Input, Select } from "antd";

const genderOptions = [
  { value: "ชาย", label: "ชาย" },
  { value: "หญิง", label: "หญิง" },
  { value: "ไม่ระบุเพศ", label: "ไม่ระบุเพศ" },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutate: postRegister } = shoppingService.useMutationRegister(
    () => {
      AlertClosed();
      AlertSuccess({
        text: "ลงทะเบียนสำเร็จ!",
        onOk: () => {
          navigate("/login");
        },
      });
    },
    (err) => {
      AlertClosed();
      return AlertError({ text: err });
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
    <>
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
            <h1>ลงทะเบียน</h1>
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
              label="ชื่อจริง"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: "กรุณาระบุชื่อจริง!",
                },
              ]}
            >
              <Input size="large" placeholder="ชื่อจริง" />
            </Form.Item>
            <Form.Item
              label="นามสกุล"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "กรุณาระบุนามสกุล!",
                },
              ]}
            >
              <Input size="large" placeholder="นามสกุล" />
            </Form.Item>
            <Form.Item
              label="เพศ"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "กรุณาระบุเพศ!",
                },
              ]}
            >
              <Select size="large" placeholder="เพศ" options={genderOptions} />
            </Form.Item>

            <Form.Item
              label="เบอร์โทรศัพท์"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "กรุณาระบุเบอร์โทรศัพท์!",
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
              <Input.Password placeholder="รหัสผ่าน" />
            </Form.Item>
            <Form.Item
              label="ยืนยันรหัสผ่าน"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "กรุณาระบุรหัสผ่าน!",
                },
              ]}
            >
              <Input.Password size="large" placeholder="ยืนยันรหัสผ่าน" />
            </Form.Item>

            <Form.Item className="mt-4">
              <Button block size="large" type="primary" htmlType="submit">
                ลงทะเบียน
              </Button>
            </Form.Item>
          </Form>

          <div className="center mt-3">
            <Link to="/login">
              <p>เข้าสู่ระบบ</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
