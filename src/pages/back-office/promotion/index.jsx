import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Spin,
  Table,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  AlertConfirm,
  AlertError,
  AlertSuccess,
  AlertWarning,
} from "../../../components/alert/alert";
import { disabledDate } from "../../../hooks/disableDate";
import useModalHook from "../../../hooks/useModalHook";
import adminService from "../../../services/admin.services";
import LayoutAdmin from "../LayoutAdmin/LayoutAdmin";
const { RangePicker } = DatePicker;

const AdminPromotion = () => {
  const [form] = Form.useForm();
  const [typeManage, setTypeManage] = useState("create");
  const [isPromotion, setIsPromotion] = useState(null);
  const {
    open: manageOpen,
    handleOpen: _handlesManageOpen,
    handleClose: _handlesManageClose,
  } = useModalHook();

  const {
    data: getPromotion,
    isLoading,
    refetch,
  } = adminService.useQueryGetPromotion({});

  const { mutate: createPromotion } = adminService.useMutationCreatePromotion(
    (res) => {
      AlertSuccess({ title: "สร้างโปรโมชั่นสำเร็จ!" });
      refetch();
      _handlesManageClose();
    },
    (err) => {
      AlertError({ text: err });
    }
  );
  const { mutate: updatePromotion } = adminService.useMutationEditPromotion(
    (res) => {
      if (res?.data?.message) {
        let _product = res?.data?.product?.optionProduct[0];
        AlertWarning({
          text: `โปรโมชั่นนี้มีกาารใช้งานอยู่ ในสินค้า [${_product?.name}] : ${_product?.description} !`,
        });
      } else {
        AlertSuccess({ title: "อัพเดตโปรโมชั่นสำเร็จ!" });
      }
      refetch();
      _handlesManageClose();
    },
    (err) => {
      AlertError({ text: err });
    }
  );

  const columns = [
    {
      title: "ชื่อโปรโมชั่น",
      dataIndex: "promotion_name",
      key: "promotion_name",
    },
    {
      title: "ส่วนลด (%)",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "ซื้อขั้นต่ำ",
      dataIndex: "condition",
      key: "condition",
    },
    {
      title: "วันที่เริ่มต้น",
      dataIndex: "start_date",
      key: "start_date",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "วันที่สิ้นสุด",
      dataIndex: "end_date",
      key: "end_date",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "จัดการโปรโมขั่น",
      dataIndex: "manage",
      key: "manage",
      render: (_, record) => {
        return (
          <Row gutter={[8, 8]}>
            <Button
              type="primary"
              className="me-2"
              onClick={() => {
                setIsPromotion(record);
                setTypeManage("edit");
                _handlesManageOpen();
              }}
            >
              แก้ไข
            </Button>
            <Button
              danger
              onClick={() => {
                AlertConfirm({
                  text: "ต้องการลบสินค้าหรือไม่ ?",
                  onOk: () => {
                    updatePromotion({
                      promotionId: record?._id,
                      values: { isDelete: true },
                    });
                  },
                });
              }}
            >
              ลบ
            </Button>
          </Row>
        );
      },
    },
  ];

  const onFinish = (values) => {
    let start_date = moment(values?.dateRange[0]?.$d).format("YYYY-MM-DD");
    let end_date = moment(values?.dateRange[1]?.$d).format("YYYY-MM-DD");
    if (isPromotion?._id) {
      // update promotion
      let _update = {
        ...isPromotion,
        ...values,
        start_date,
        end_date,
      };
      AlertConfirm({
        text: "ต้องการอัพเดตโปรโมชั่นหรือไม่ ?",
        onOk: () => {
          updatePromotion({ promotionId: isPromotion?._id, values: _update });
        },
      });
    } else {
      // create promotion
      AlertConfirm({
        text: "ต้องการสร้างโปรโมชั่นหรือไม่ ?",
        onOk: () => {
          createPromotion({
            values: {
              ...values,
              start_date,
              end_date,
            },
          });
        },
      });
    }
  };

  useEffect(() => {
    if (isPromotion) {
      form.setFieldsValue(isPromotion);
    } else {
      form.resetFields();
    }
  }, [isPromotion]);

  return (
    <LayoutAdmin>
      <h3>จัดการโปรโมชั่น</h3>
      <Row className="d-flex justify-content-end my-4">
        <Button
          type="primary"
          onClick={() => {
            setTypeManage("create");
            setIsPromotion(null);
            form.resetFields();
            _handlesManageOpen();
          }}
        >
          สร้างโปรโมชั่น
        </Button>
      </Row>
      <Row>
        {isLoading ? (
          <Spin />
        ) : (
          <Table
            className="w-100"
            dataSource={getPromotion}
            columns={columns}
          />
        )}
      </Row>

      <Modal
        title={`${
          typeManage === "create" ? "สร้างโปรโมชั่น" : "แก้ไขโปรโมชั่น"
        }`}
        open={manageOpen}
        onOk={() => {
          form.submit();
        }}
        onCancel={_handlesManageClose}
        okText="บันทึก"
        cancelText="ยกเลิก"
      >
        <Form
          form={form}
          name="promotion-form"
          className="mt-4"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="ชื่อโปรโมชั่น"
            name="promotion_name"
            rules={[
              {
                required: true,
                message: "ระบุชื่อโปรโมชั่น",
              },
            ]}
          >
            <Input placeholder="ชื่อโปรโมชั่น" />
          </Form.Item>
          <Form.Item
            label="จำนวนเปอร์เซ็นส่วนลด"
            name="discount"
            rules={[
              {
                required: true,
                message: "ระบุจำนวนเปอร์เซ็นส่วนลด",
              },
            ]}
          >
            <InputNumber
              min={0}
              className="w-100"
              placeholder="จำนวนเปอร์เซ็นส่วนลด"
            />
          </Form.Item>
          <Form.Item
            label="ซื้อขั้นต่ำ"
            name="condition"
            rules={[
              {
                required: true,
                message: "ระบุจำนวนซื้อขั้นต่ำ",
              },
            ]}
          >
            <InputNumber min={0} className="w-100" placeholder="ซื้อขั้นต่ำ" />
          </Form.Item>
          <Form.Item
            label="ช่วงเวลาที่สามารถใช้ได้"
            name="dateRange"
            rules={[
              {
                required: true,
                message: "ระบุช่วงเวลาที่สามารถใช้ได้",
              },
            ]}
          >
            <RangePicker disabledDate={disabledDate} className="w-100" />
          </Form.Item>
        </Form>
      </Modal>
    </LayoutAdmin>
  );
};

export default AdminPromotion;
