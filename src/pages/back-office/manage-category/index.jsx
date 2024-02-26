import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Table,
  Upload,
} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NOT_FOUND_IMG } from "../../../assets";
import {
  AlertConfirm,
  AlertError,
  AlertSuccess,
  AlertWarning,
} from "../../../components/alert/alert";
import { onUploadFile } from "../../../hooks/onUploadFIle";
import useModalHook from "../../../hooks/useModalHook";
import useUploadFileHook from "../../../hooks/useUploadFileHook";
import adminService from "../../../services/admin.services";
import { URL_IMAGE } from "../../../utils";
import LayoutAdmin from "../LayoutAdmin/LayoutAdmin";
import _ from "lodash";

const ManageCategory = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [modalData, setModalData] = useState(null);
  const [typeManage, setTypeManage] = useState("add");

  const [fileName, setFileName] = useState(null);
  const [isImage, setIsImage] = useState(null);
  const [isFileList, setIsFileList] = useState([]);
  const [deleteImage, setDeleteImage] = useState(false);

  const {
    open: manageOpen,
    handleOpen: _handlesManageOpen,
    handleClose: _handlesManageClose,
  } = useModalHook();

  const {
    previewOpen,
    previewImage,
    handlePreview: _handlePreviewUpload,
    handleChange: _handleChangeUpload,
    handleCancel: _handleCancelUpload,
  } = useUploadFileHook();

  const {
    data: getHighlight,
    isLoading,
    refetch,
  } = adminService.useQueryGetHighlight({});

  const { mutate: createHighlight } = adminService.useMutationCreateHighlight(
    (res) => {
      _handlesManageClose();
      refetch();
      AlertSuccess({});
    },
    (err) => {
      _handlesManageClose();
      AlertError({ text: err });
    }
  );
  const { mutate: updateHighlight } = adminService.useMutationUpdateHighlight(
    (res) => {
      _handlesManageClose();
      refetch();
      AlertSuccess({});
    },
    (err) => {
      _handlesManageClose();
      AlertError({ text: err });
    }
  );

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const res = await onUploadFile({ file: file });
      if (res?.status === 201) {
        let file_name = res?.data?.filename;
        let is_file = [
          {
            uid: file?.uid,
            name: file?.name,
            status: "done",
            url: `${URL_IMAGE}/${file_name}`,
          },
        ];

        setFileName(file_name); // for save file in product
        setIsImage(`${URL_IMAGE}/${file_name}`); // for show image
        setIsFileList(is_file);
        onSuccess("ok");
      } else {
        onError();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const columns = [
    {
      title: "รูปสินค้า",
      dataIndex: "picPath",
      key: "picPath",
      render: (picPath) => {
        return (
          <Image
            style={{ borderRadius: "4px" }}
            width={100}
            height={100}
            src={picPath ? `${URL_IMAGE}/${picPath}` : NOT_FOUND_IMG}
            alt="img_product"
          />
        );
      },
    },
    {
      title: "ชื่อหมวดหมู่",
      dataIndex: "title",
      key: "title",
      align: "left",
    },
    {
      title: "รายละเอียด",
      dataIndex: "description",
      key: "description",
      align: "left",
    },
    {
      title: "จัดการ",
      dataIndex: "manage",
      key: "manage",
      align: "center",
      render: (_, record) => {
        return (
          <Button
            size="large"
            type="primary"
            className="me-2"
            onClick={() => {
              setFileName(null); // for save file in product
              setIsImage(null); // for show image
              setIsFileList(null);
              setModalData(record);
              form.setFieldsValue(record);
              setTypeManage("edit");
              _handlesManageOpen();
            }}
          >
            แก้ไขไฮไลท์
          </Button>
        );
      },
    },
  ];

  const onFinish = (values) => {
    if (modalData) {
      //udpate
      let _update = {
        id: modalData?._id,
        inputUpdate: {
          ...modalData,
          ...values,
          picPath: fileName
            ? fileName
            : deleteImage
            ? null
            : modalData?.picPath,
        },
      };
      AlertConfirm({
        text: "ต้องการอัพเดตไฮไลท์หรือไม่ ?",
        onOk: () => {
          updateHighlight({ values: _update });
        },
      });
    } else {
      // create
      let _create = {
        ...values,
        picPath: fileName,
      };
      AlertConfirm({
        text: "ต้องการอัพเดตไฮไลท์หรือไม่ ?",
        onOk: () => {
          createHighlight({ values: _create });
        },
      });
    }
  };

  return (
    <LayoutAdmin>
      <h3>
        จัดการไฮไลท์สินค้า {_.size(getHighlight)}/3 รายการ (สูงสุด 3 รายการ){" "}
      </h3>
      <Row className="d-flex justify-content-end my-4">
        <Button
          type="primary"
          onClick={() => {
            if (_.size(getHighlight) < 3) {
              setModalData(null);
              setTypeManage("add");
              form.resetFields();
              _handlesManageOpen();
            } else {
              return AlertWarning({ text: "เพิ่มได้สูงสุด 3 รายการ" });
            }
          }}
        >
          เพิ่มไฮไลท์สินค้า
        </Button>
      </Row>
      <Row>
        <Table
          loading={isLoading}
          bordered
          className="w-100"
          dataSource={getHighlight}
          columns={columns}
        />
      </Row>
      <Modal
        title={`${typeManage === "add" ? "เพิ่มไฮไลท์" : "แก้ไขไฮไลท์"}`}
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
          name="product-form"
          className="mt-4"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row className="my-4">
            <Col
              span={24}
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Upload
                fileList={isFileList}
                customRequest={customRequest}
                listType="picture-card"
                maxCount={1}
                onPreview={_handlePreviewUpload}
                onChange={_handleChangeUpload}
                onRemove={() => {
                  setIsFileList([]);
                  setFileName(null);
                  setIsImage(null);
                  setDeleteImage(true);
                }}
              >
                อัพโหลดรูป
              </Upload>
            </Col>
          </Row>
          <h5 className="mb-4">รายการสินค้า</h5>
          <Form.Item
            label="ชื่อหมวดหมู่"
            name="title"
            rules={[
              {
                required: true,
                message: "ชื่อหมวดหมู่",
              },
            ]}
          >
            <Input placeholder="ชื่อหมวดหมู่" />
          </Form.Item>
          <Form.Item
            label="รายละเอียด"
            name="description"
            rules={[
              {
                required: true,
                message: "รายละเอียด",
              },
            ]}
          >
            <Input placeholder="รายละเอียด" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal open={previewOpen} footer={null} onCancel={_handleCancelUpload}>
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </LayoutAdmin>
  );
};

export default ManageCategory;
