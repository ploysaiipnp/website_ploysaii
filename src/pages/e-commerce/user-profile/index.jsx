import { Button, Col, Divider, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartPanel from "../../../components/CartPanel";
import { AlertSuccess } from "../../../components/alert/Alert";
import shoppingService from "../../../services/shopping.services";
import { getUserId } from "../../../utils";

const UserProfile = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const { refetch } = shoppingService.useQueryGetProfile({
    id: getUserId(),
    onSuccess: (res) => {
      const { user } = res;
      form.setFieldsValue(user);
    },
  });

  const { mutate: updateProfile } = shoppingService.useMutationUpdateProfile(
    (res) => {
      AlertSuccess({ title: "บันทึกสำเร็จ!" });
      refetch();
    }
  );

  const handleSave = (values) => {
    let data = {
      id: getUserId(),
      updateInfo: {
        ...values,
      },
    };
    updateProfile({ values: data });
  };

  return (
    <>
      <CartPanel />
      <div className="m-t-150 p-4 container">
        <Row>
          <h1>แก้ไขโปรไฟล์</h1>
        </Row>
        <Divider />
        <Row style={{ minHeight: "800px" }}>
          <Col span={24}>
            <Form
              form={form}
              name="profile"
              layout="vertical"
              onFinish={handleSave}
              autoComplete="off"
            >
              <Form.Item label="ชื่อจริง" name="firstname">
                <Input size="large" />
              </Form.Item>
              <Form.Item label="นามสกุล" name="lastname">
                <Input size="large" />
              </Form.Item>
              <Form.Item label="เพศ" name="gender">
                <Input size="large" />
              </Form.Item>
              <Form.Item label="เบอร์โทรศัพท์" name="phone">
                <Input size="large" />
              </Form.Item>
              <Form.Item label="ชื่อผู้ใช้งาน" name="username">
                <Input size="large" />
              </Form.Item>
              <Row className="d-flex justify-content-end m-b-50">
                <Form.Item>
                  <Button
                    style={{ borderRadius: "0px", padding: "24px 80px" }}
                    danger
                    className="me-2 center"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    ยกเลิก
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    style={{ borderRadius: "0px", padding: "24px 80px" }}
                    type="primary"
                    className="center"
                    htmlType="submit"
                  >
                    บันทึก
                  </Button>
                </Form.Item>
              </Row>
            </Form>

            <Divider />
            <h1>เปลี่ยนรหัสผ่าน</h1>
            <Divider />
            <div className="form-group mb-4">
              <label className="text-black" for="fname">
                รหัสผ่านใหม่
              </label>
              <input
                value={password}
                style={{ height: "50px" }}
                type="password"
                placeholder="รหัสผ่านใหม่"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label className="text-black" for="fname">
                ยืนยันรหัสผ่านใหม่
              </label>
              <input
                value={confirmPassword}
                style={{ height: "50px" }}
                type="password"
                placeholder="ยืนยันรหัสผ่านใหม่"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </Col>
        </Row>
        <Divider />
        <Row className="d-flex justify-content-end m-b-50">
          <Button
            style={{ borderRadius: "0px", padding: "24px 80px" }}
            danger
            className="me-2 center"
            onClick={() => {
              navigate("/");
            }}
          >
            ยกเลิก
          </Button>
          <Button
            style={{ borderRadius: "0px", padding: "24px 80px" }}
            type="primary"
            className="center"
            onClick={handleSave}
          >
            บันทึก
          </Button>
        </Row>
      </div>
    </>
  );
};

export default UserProfile;
