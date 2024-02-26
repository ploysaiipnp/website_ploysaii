import {
  Button,
  Col,
  Divider,
  Image,
  Modal,
  Row,
  Spin,
  Tabs,
  Upload,
} from "antd";
import _ from "lodash";
import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { NOT_FOUND_IMG } from "../../../assets";
import CartPanel from "../../../components/CartPanel";
import {
  AlertConfirm,
  AlertSuccess,
  AlertWarning,
} from "../../../components/alert/Alert";
import { onUploadFile } from "../../../hooks/onUploadFIle";
import useModalHook from "../../../hooks/useModalHook";
import useUploadFileHook from "../../../hooks/useUploadFileHook";
import shoppingService from "../../../services/shopping.services";
import { URL_IMAGE } from "../../../utils";

const order_status = [
  {
    key: 1,
    name: "รอการชำระเงิน",
  },
  {
    key: 2,
    name: "รอยืนยัน",
  },
  {
    key: 3,
    name: "ยืนยันการชำระเงิน",
  },
  {
    key: 4,
    name: "ยกเลิกการสั่งซื้อ",
  },
];

const ProductOrderCard = ({ item }) => {
  console.log("card item:", item);
  return (
    <Row className="w-100 d-flex justify-content-between mb-3">
      <Row>
        <Col className="me-4">
          <Image
            width={80}
            height={80}
            src={`${URL_IMAGE}/${item?.img_product}` || NOT_FOUND_IMG}
          />
        </Col>
        <Col>
          <p className="mb-0">{item?.optionInfo?.name}</p>
          <u>
            <p className="opacity-50 mb-0">รายละเอียดสินค้า :</p>
          </u>
          <p className="opacity-50">{item?.optionInfo?.description}</p>
          <p>{`จำนวน ${numeral(item?.amount).format("0,0")} ${
            item?.optionInfo?.unit_name || "ชิ้น"
          } x ราคา ${numeral(item?.optionInfo?.price).format("0,0")} บาท`}</p>
        </Col>
      </Row>
      <Col>
        <h5>{`รวม : ${numeral(item?.amount * item?.optionInfo?.price).format(
          "0,0"
        )} บาท`}</h5>
      </Col>
    </Row>
  );
};

const OrderCard = ({
  type = 1,
  onPayment,
  data,
  setOrderId,
  setTotalAmount,
  onCancel,
}) => {
  return (
    <>
      <Row
        style={{ border: "1px solid rgba(202, 202, 202, 0.88)" }}
        className="p-4 d-flex justify-content-between mb-4"
      >
        <span className="d-flex center">
          <p className="mb-0 me-2">หมายเลขคำสั่งซื้อ : </p>
          <p className="mb-0 text-primary">{data?.order_code}</p>
        </span>
        <span className="d-flex center">
          <p className="mb-0 me-2">สถานะคำสั่งซื้อ : </p>
          <p className="mb-0 text-primary">{data?.status}</p>
        </span>
        <Divider />
        {data?.productList?.map((item, i) => {
          return <ProductOrderCard key={i} item={item} />;
        })}

        <Divider />
        <div>
          <p className="mb-0">
            วันที่สั่งซื้อ :{" "}
            {moment(data?.createdAt).format("DD MMMM YYYY - เวลา HH:mm:ss น.")}
          </p>
          {type === 3 && (
            <p className="mb-0 mt-1">Tracking No : {data?.trackingNo || "-"}</p>
          )}
        </div>
        <Col className="d-flex flex-col align-items-end">
          <h6 className="mb-4">{`ยอดรวมทั้งหมด : ${numeral(data?.price).format(
            "0,0"
          )} บาท`}</h6>

          <h6 className="mb-4">{`ส่วนลดทั้งหมด : ${
            data?.totalDiscount > 0 ? "-" : ""
          } ${numeral(data?.totalDiscount).format("0,0")} บาท`}</h6>
          <h5 className="mb-4">{`ราคาสุทธิ : ${numeral(data?.net_price).format(
            "0,0"
          )} บาท`}</h5>
          {type === 1 && (
            <Row>
              <Button
                style={{ padding: "22px 60px" }}
                danger
                className="center me-3"
                onClick={() => {
                  let text = `ต้องการยกคำสั่งซ์้อ : ${data?.order_code} หรือไม่ ?`;
                  AlertConfirm({
                    text: text,
                    onOk: () => {
                      onCancel({ orderId: data?._id });
                    },
                  });
                }}
              >
                ยกเลิกคำสั่งซื้อ
              </Button>
              <Button
                style={{ padding: "22px 80px" }}
                type="primary"
                className="center"
                onClick={() => {
                  setOrderId(data?._id);
                  setTotalAmount(data?.net_price);
                  onPayment();
                }}
              >
                ชำระเงิน
              </Button>
            </Row>
          )}
          {type === 2 && (
            <div>
              <p className="text-primary">หลักฐานการโอน</p>
              <Image
                width={80}
                height={80}
                src={`${URL_IMAGE}/${data?.evidence_purchase}` || NOT_FOUND_IMG}
              />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

const MyHistory = () => {
  const {
    open: uploadSlipOpen,
    handleOpen: _handlesUploadSlipOpen,
    handleClose: _handlesUploadSlipClose,
  } = useModalHook();

  const {
    fileList,
    handlePreview: _handlePreviewUpload,
    handleChange: _handleChangeUpload,
    handleCancel: _handleCancelUpload,
  } = useUploadFileHook();

  const [orderId, setOrderId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [slipName, setSlipName] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isFileList, setIsFileList] = useState([]);
  const [tab, setTab] = useState(1);
  const {
    data: getOrder,
    isLoading,
    refetch,
  } = shoppingService.useQueryGetOrderHistory({
    status: _.find(order_status, (n) => n.key === tab)?.name,
  });

  const { mutate: confirmOrder } = shoppingService.useMutationConfirmOrder(
    (res) => {
      _handlesUploadSlipClose();
      refetch();
      AlertSuccess({});
    }
  );

  const { mutate: cancelOrder } = shoppingService.useMutationCancelOrder(
    (res) => {
      refetch();
      AlertSuccess({});
    }
  );

  const renderOrderItem = () => {
    return (
      <>
        {isLoading ? (
          <Spin />
        ) : (
          <Row>
            <Col span={24}>
              {_.size(getOrder?.listOrder) > 0 ? (
                getOrder?.listOrder.map((n, i) => {
                  return (
                    <OrderCard
                      key={i}
                      type={tab}
                      onPayment={_handlesUploadSlipOpen}
                      isLoading={isLoading}
                      data={n}
                      setOrderId={setOrderId}
                      setTotalAmount={setTotalAmount}
                      onCancel={cancelOrder}
                    />
                  );
                })
              ) : (
                <Row className="center p-5">
                  <p>ไม่มีรายการ</p>
                </Row>
              )}
            </Col>
          </Row>
        )}
      </>
    );
  };

  const items = [
    {
      key: 1,
      label: "รอการชำระเงิน",
      children: renderOrderItem(),
    },
    {
      key: 2,
      label: "รอการอนุมัติ",
      children: renderOrderItem(),
    },
    {
      key: 3,
      label: "สั่งซื้อสำเร็จ",
      children: renderOrderItem(),
    },
    {
      key: 4,
      label: "ยกเลิกคำสั่งซื้อ",
      children: renderOrderItem(),
    },
  ];

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const res = await onUploadFile({ file: file });
      if (res?.status === 201) {
        let slip_file_name = res?.data?.filename;
        let is_file = [
          {
            uid: file?.uid,
            name: file?.name,
            status: "done",
            url: `${URL_IMAGE}/${slip_file_name}`,
          },
        ];

        setSlipName(slip_file_name);
        setFileName(`${URL_IMAGE}/${slip_file_name}`);
        setIsFileList(is_file);
        onSuccess("ok");
      } else {
        onError();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [tab, fileName, isFileList]);

  return (
    <>
      <CartPanel />
      <div className="m-t-150 p-4 container">
        <Row style={{ minHeight: "800px" }}>
          <Tabs
            className="w-100"
            defaultActiveKey={1}
            items={items}
            onChange={(e) => {
              setTab(e);
            }}
          />
        </Row>
        <Modal
          className="m-t-120"
          title="อัพโหลดหลักฐานการโอนเงิน"
          open={uploadSlipOpen}
          okText="ยืนยันการชำระ"
          cancelText="ปิด"
          onOk={() => {
            if (_.size(isFileList) < 1) {
              AlertWarning({ text: "กรุณาอัพโหลดหลักฐานการโอน!" });
              return;
            } else {
              confirmOrder({ id: orderId, slip: slipName });
            }
          }}
          onCancel={() => {
            setOrderId(null);
            setSlipName(null);
            setFileName(null);
            setIsFileList([]);
            _handlesUploadSlipClose();
          }}
        >
          <Divider />
          <h5>ช่องทางการชำระเงิน</h5>
          <p>ชื่อบัญชีธนาคาร : ปรีณาพรรณ กรุดทอง</p>
          <p>เลขที่บัญชี : 035-8-76568-8 </p>
          <p>ธนาคารกสิกร</p>
          <p className="text-primary">
            ยอดชำระ : {numeral(totalAmount || 0)?.format("0,0")} บาท
          </p>
          <Divider />
          <div className="d-flex flex-col">
            <Upload
              fileList={isFileList || []}
              customRequest={customRequest}
              listType="picture-card"
              maxCount={1}
              onPreview={_handlePreviewUpload}
              onChange={_handleChangeUpload}
              onRemove={() => {
                setFileName(null);
              }}
            >
              อัพโหลดรูป
            </Upload>
            <Divider />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MyHistory;
