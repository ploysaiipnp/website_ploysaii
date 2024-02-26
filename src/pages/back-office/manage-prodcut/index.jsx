import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  Upload,
} from "antd";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NOT_FOUND_IMG } from "../../../assets/images/products";
import {
  AlertConfirm,
  AlertError,
  AlertSuccess,
} from "../../../components/alert/Alert";
import { categoryOption } from "../../../constants/categoryOption";
import { onUploadFile } from "../../../hooks/onUploadFIle";
import useModalHook from "../../../hooks/useModalHook";
import useUploadFileHook from "../../../hooks/useUploadFileHook";
import adminService from "../../../services/admin.services";
import shoppingService from "../../../services/shopping.services";
import { URL_IMAGE, getRoleUser } from "../../../utils";
import LayoutAdmin from "../LayoutAdmin/LayoutAdmin";

const ManageProduct = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [typeManage, setTypeManage] = useState("add");
  const [isProduct, setIsProduct] = useState(null);

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

  const [promotionOption, setPromotionOption] = useState([]);

  const {
    data: getProduct,
    isLoading,
    refetch,
  } = shoppingService.useQueryGetProduct({
    queryObj: {
      filter: "all",
    },
  });

  const { isLoading: isLoadingPromotion } = adminService.useQueryGetPromotion({
    onSuccess: (res) => {
      let none = { value: "none", label: "ไม่มีโปรโมชั่น" };
      let data = res?.map((n) => {
        return {
          value: n?._id,
          label: n?.promotion_name,
        };
      });
      let options = [...data, none];
      setPromotionOption(options);
    },
  });

  const { mutate: createProduct } = adminService.useMutationCreateProduct(
    (res) => {
      refetch();
      _handlesManageClose();
      setDeleteImage(false);
      AlertSuccess({});
    },
    (err) => {
      setDeleteImage(false);
      AlertError({ text: err });
    }
  );
  const { mutate: editProduct } = adminService.useMutationEditProduct(
    (res) => {
      refetch();
      _handlesManageClose();
      setDeleteImage(false);
      AlertSuccess({});
    },
    (err) => {
      setDeleteImage(false);
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
      dataIndex: "img_product",
      key: "img_product",
      render: (name) => (
        <Image
          style={{ borderRadius: "4px" }}
          width={60}
          height={60}
          src={name ? `${URL_IMAGE}/${name}` : NOT_FOUND_IMG}
          alt="img_product"
        />
      ),
    },
    {
      title: "ชื่อสินค้า",
      dataIndex: "_id",
      key: "_id",
      render: (_, { optionProduct }) => <p>{optionProduct[0]?.name}</p>,
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "โปรโมชั่น",
      render: (_, record) => {
        let promotion = record?.promotionDetail?.promotion_name || "-";
        return <p>{promotion}</p>;
      },
    },

    {
      title: "ราคาสินค้า (บาท)",
      align: "right",
      render: (_, { optionProduct }) => (
        <p>{numeral(optionProduct[0]?.price).format("0,0")}</p>
      ),
    },
    {
      title: "จำนวนคงเหลือ (ชิ้น)",
      align: "right",
      render: (_, { optionProduct }) => (
        <p>{numeral(optionProduct[0]?.amount).format("0,0")}</p>
      ),
    },
    {
      title: "จัดการสินค้า",
      dataIndex: "manage",
      key: "manage",
      render: (_, record) => {
        return (
          <Row gutter={[8, 8]}>
            <Button
              type="primary"
              className="me-2"
              onClick={() => {
                let is_file = [
                  {
                    uid: record?._id,
                    name: record?.img_product,
                    status: "done",
                    url: `${URL_IMAGE}/${record?.img_product}`,
                  },
                ];
                let show_img = record?.img_product ? is_file : [];

                setDeleteImage(false);
                setIsFileList(show_img);
                setIsProduct(record);
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
                    editProduct({
                      productId: record?._id,
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
    if (isProduct) {
      // update product
      let _update = {
        ...isProduct,
        ...values,
        img_product: fileName
          ? fileName
          : deleteImage
          ? null
          : isProduct?.img_product,
      };
      AlertConfirm({
        text: "ต้องการอัพเดตรายการสินค้าหรือไม่ ?",
        onOk: () => {
          editProduct({
            productId: isProduct?._id,
            values: _update,
          });
        },
      });
    } else {
      // create product
      AlertConfirm({
        text: "ต้องการสร้างรายการสินค้าหรือไม่ ?",
        onOk: () => {
          createProduct({
            values: {
              ...values,
              img_product: fileName,
            },
          });
        },
      });
    }
  };

  useEffect(() => {
    let role_user = getRoleUser();
    if (role_user !== "admin") {
      navigate("/admin");
    }
  }, []);

  useEffect(() => {
    if (isProduct) {
      form.setFieldsValue({
        ...isProduct,
      });
    } else {
      form.resetFields();
    }
  }, [isProduct]);

  return (
    <LayoutAdmin>
      <h3>จัดการสินค้า</h3>
      <Row className="d-flex justify-content-end my-4">
        <Button
          type="primary"
          onClick={() => {
            setIsFileList([]);
            setFileName(null);
            setIsImage(null);
            setDeleteImage(false);

            setTypeManage("add");
            setIsProduct(null);
            _handlesManageOpen();
          }}
        >
          เพิ่มสินค้า
        </Button>
      </Row>
      <Row>
        {isLoading ? (
          <Spin />
        ) : (
          <Table
            bordered
            className="w-100"
            dataSource={getProduct}
            columns={columns}
          />
        )}
      </Row>
      <Modal
        title={`${typeManage === "add" ? "เพิ่มสินค้า" : "แก้ไขสินค้า"}`}
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
          fields={fields}
          onFinish={onFinish}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
          autoComplete="off"
        >
          <Row className="my-4">
            <Col
              span={24}
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Upload
                fileList={isFileList || []}
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
          <Form.Item label="Link Url วิดีโอสินค้า" name="videoUrl">
            <Input placeholder="Link Url วิดีโอสินค้า" />
          </Form.Item>
          <Form.Item
            label="หมวดหมู่สินค้า"
            name="category"
            rules={[
              {
                required: true,
                message: "ระบุหมวดหมู่สินค้า",
              },
            ]}
          >
            <Select
              className="w-100"
              placeholder="หมวดหมู่สินค้า"
              options={categoryOption}
            />
          </Form.Item>
          <Form.Item
            label="เลือกโปรโมชั่น"
            name="promotionId"
            rules={[
              {
                required: true,
                message: "เลือกโปรโมชั่น",
              },
            ]}
          >
            <Select
              className="w-100"
              placeholder="เลือกโปรโมชั่น"
              disabled={isLoadingPromotion}
              options={promotionOption}
            />
          </Form.Item>
          <Divider />
          <Form.List name="optionProduct">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => {
                  return (
                    <React.Fragment key={key}>
                      <Row>
                        <Col span={24}>
                          <Row gutter={[8, 8]}>
                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, "name"]}
                                label={`ชื่อสินค้า ${key + 1}`}
                                rules={[
                                  {
                                    required: true,
                                    message: "ระบุชื่อสินค้า!",
                                  },
                                ]}
                              >
                                <Input placeholder="ชื่อสินค้า" />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, "unit_name"]}
                                label={`หน่วย`}
                                rules={[
                                  {
                                    required: true,
                                    message: "ระบุหน่วย!",
                                  },
                                ]}
                              >
                                <Input placeholder="หน่วย" />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Form.Item
                            {...restField}
                            name={[name, "description"]}
                            label={`รายละเอียดสินค้า`}
                            rules={[
                              {
                                required: true,
                                message: "ระบุรายละเอียดสินค้า!",
                              },
                            ]}
                          >
                            <Input placeholder="รายละเอียดสินค้า" />
                          </Form.Item>
                          <Row gutter={[8, 8]}>
                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, "price"]}
                                label={`ราคาสินค้า `}
                                rules={[
                                  {
                                    required: true,
                                    message: "ระบุราคาสินค้า!",
                                  },
                                ]}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder="ระบุราคาสินค้า"
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, "amount"]}
                                label={`จำนวนคงเหลือ`}
                                rules={[
                                  {
                                    required: true,
                                    message: "ระบุจำนวนคงเหลือ!",
                                  },
                                ]}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder="จำนวนคงเหลือ"
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Button
                            className="w-100"
                            danger
                            onClick={() => {
                              remove(name);
                            }}
                          >
                            ลบ
                          </Button>
                          <Divider />
                        </Col>
                      </Row>
                    </React.Fragment>
                  );
                })}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    + เพิ่มรายการสินค้า
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
      {/* -- on preview -- */}
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

export default ManageProduct;
