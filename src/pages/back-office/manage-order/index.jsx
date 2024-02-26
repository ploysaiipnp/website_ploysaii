import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Image,
  Input,
  Modal,
  Row,
  Table,
  Tabs,
} from "antd";
import _ from "lodash";
import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NOT_FOUND_IMG } from "../../../assets";
import {
  AlertConfirm,
  AlertError,
  AlertSuccess,
  AlertWarning,
} from "../../../components/alert/alert";
import useModalHook from "../../../hooks/useModalHook";
import adminService from "../../../services/admin.services";
import { URL_IMAGE, getRoleUser } from "../../../utils";
import LayoutAdmin from "../LayoutAdmin/LayoutAdmin";
const { Search } = Input;
const { RangePicker } = DatePicker;
const dataSource = [
  {
    img_product: NOT_FOUND_IMG,
  },
];

const listTab = [
  {
    key: 1,
    label: "รายการคำสั่งซื้อรอการอนุมัติ",
  },
  {
    key: 2,
    label: "รอการจัดส่ง",
  },
  {
    key: 3,
    label: "อนุมัติคำสั่งซื้อเรียบร้อย",
  },
];

const ManageOrder = () => {
  const navigate = useNavigate();
  const [detailProduct, setDetailProduct] = useState(null);
  const [tabSelected, setTabSelected] = useState(1);
  const [search, setSearch] = useState(null);
  const [rangeDate, setRangeDate] = useState(null);
  const [dataTracking, setDataTracking] = useState(null);
  const [isTranckingNo, setIsTrackingNo] = useState(null);

  const {
    open: productOpen,
    handleOpen: _handlesProductOpen,
    handleClose: _handlesProductClose,
  } = useModalHook();

  const {
    open: trackingOpen,
    handleOpen: _handlesTrackingOpen,
    handleClose: _handlesTrackingClose,
  } = useModalHook();

  const {
    data: getOrder,
    isLoading: isLoadingOrder,
    refetch: refetchOrder,
  } = adminService.useQueryGetOrder({
    queryObj: {
      status:
        tabSelected === 1
          ? "รอยืนยัน"
          : tabSelected === 2
          ? "รอการจัดส่ง"
          : "ยืนยันการชำระเงิน",
      order_code: search,
      startDate: rangeDate
        ? moment(rangeDate[0]?.$d).format("YYYY-MM-DD")
        : null,
      endDate: rangeDate ? moment(rangeDate[1]?.$d).format("YYYY-MM-DD") : null,
    },
  });

  const { mutate: approveOrder } = adminService.useMutationApproveOrder(
    (res) => {
      AlertSuccess({});
      refetchOrder();
    },
    (err) => {
      AlertError({ text: err });
    }
  );

  const ProductOrderCard = ({ item }) => {
    return (
      <Row>
        <Col span={6}>
          <Image
            style={{ objectFit: "cover" }}
            src={`${URL_IMAGE}/${item?.img_product}` || NOT_FOUND_IMG}
          />
        </Col>
        <Col span={18} className="px-4">
          <p className="mb-0">{item?.optionInfo?.name}</p>
          <u>
            <p className="opacity-50 mb-0">รายละเอียดสินค้า :</p>
          </u>
          <p className="opacity-50">{item?.optionInfo?.description}</p>
          <p className="p-0 m-0">{`จำนวน ${numeral(item?.amount).format(
            "0,0"
          )} ชิ้น x ราคา ${numeral(item?.optionInfo?.price).format(
            "0,0"
          )} บาท`}</p>
          <Divider />
          <h5 className="p-0 m-0">{`รวม : ${numeral(
            item?.amount * item?.optionInfo?.price
          ).format("0,0")} บาท`}</h5>
        </Col>
      </Row>
    );
  };

  const columns = [
    {
      title: "รูปสินค้า",
      dataIndex: "img_product",
      key: "img_product",
      render: (_, record) => {
        let product = record?.productList[0]?.img_product;
        return (
          <Image
            style={{ borderRadius: "4px" }}
            width={60}
            height={60}
            src={product ? `${URL_IMAGE}/${product}` : NOT_FOUND_IMG}
            alt="img_product"
          />
        );
      },
    },
    {
      title: "รายละเอียดสินค้า",
      width: "300px",
      align: "left",
      render: (_, record) => {
        const { order_code, purchase_date } = record;
        return (
          <Row>
            <Col span={24}>
              <p className="p-0 m-0 text-primary">{`หมายเลขคำสั่งซื้อ : ${order_code}`}</p>
              <p className="p-0 m-0">{`วันที่ซื้อ : ${moment(
                purchase_date
              ).format("DD/MM/YYYY - เวลา HH:mm:ss น.")} `}</p>
            </Col>
          </Row>
        );
      },
    },
    {
      title: "ข้อมูลผู้ซื้อ",
      width: "300px",
      align: "left",
      render: (_, record) => {
        let user = record?.userDetail;
        return (
          <Row>
            <Col span={24}>
              <p className="p-0 m-0">{`username : ${user?.username}`}</p>
              <p className="p-0 m-0">{`ชื่อ : ${user?.firstname} ${user?.lastname}`}</p>
              <p className="p-0 m-0">{`โทร : ${user?.phone} `}</p>
              <p className="p-0 m-0">{`ที่อยู่ : ${record?.address} `}</p>
            </Col>
          </Row>
        );
      },
    },
    {
      title: "ราคาสินค้ารวม",
      dataIndex: "price",
      key: "price",
      align: "right",
      render: (text) => numeral(text).format("0,0"),
    },
    {
      title: "ส่วนลดโปรโมชั่น (บาท)",
      dataIndex: "totalDiscount",
      key: "totalDiscount",
      align: "right",
      render: (text) => numeral(text).format("0,0"),
    },
    {
      title: "ยอดรวมต้องชำระ (บาท)",
      dataIndex: "net_price",
      key: "net_price",
      align: "right",
      render: (text) => numeral(text).format("0,0"),
    },
    {
      title: "สลิปการโอน",
      render: (_, record) => {
        let slip = record?.evidence_purchase;
        return (
          <Image
            style={{ borderRadius: "4px" }}
            width={60}
            height={60}
            src={slip ? `${URL_IMAGE}/${slip}` : NOT_FOUND_IMG}
            alt="img_product"
          />
        );
      },
    },

    {
      title:
        tabSelected === 1
          ? "ยืนยันการโอน"
          : tabSelected === 2
          ? "Tracking No."
          : "สถานะคำสั่งซื้อ",
      dataIndex: "manage",
      key: "manage",
      width: "350px",
      align: "center",
      render: (_, record) => {
        let _trackingNo = record?.trackingNo;
        return (
          <>
            {tabSelected === 1 ? (
              <Row gutter={[8, 8]} className="center">
                <Button
                  className="me-2"
                  onClick={() => {
                    setDetailProduct(record);
                    _handlesProductOpen();
                  }}
                >
                  รายละเอียด
                </Button>
                <Button
                  type="primary"
                  className="me-2"
                  onClick={() => {
                    AlertConfirm({
                      text: "ต้องการอนุมัติคำสั่งซื้อนี้หรือไม่ ?",
                      onOk: () => {
                        approveOrder({
                          values: {
                            id: record?._id,
                            status: "รอการจัดส่ง",
                          },
                        });
                      },
                    });
                  }}
                >
                  จัดส่งสินค้า
                </Button>
                <Button
                  danger
                  onClick={() => {
                    AlertConfirm({
                      text: "ต้องการยกเลิกรายการสั่งซื้อนี้หรือไม่ ?",
                      onOk: () => {
                        approveOrder({
                          values: {
                            id: record?._id,
                            status: "รอการชำระเงิน",
                          },
                        });
                      },
                    });
                  }}
                >
                  ยกเลิก
                </Button>
              </Row>
            ) : tabSelected === 2 ? (
              <Row gutter={[8, 8]} className="center">
                {_trackingNo && <Col>{_trackingNo}</Col>}
                <Col>
                  <Button
                    onClick={() => {
                      setIsTrackingNo(record?.trackingNo || "");
                      setDataTracking(record);
                      _handlesTrackingOpen();
                    }}
                  >
                    {_trackingNo ? "แก้ไข" : "เพิ่ม"}
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      if (_trackingNo) {
                        AlertConfirm({
                          text: "ต้องการอนุมัติรายการสินค้านี้หรือไม่ ?",
                          onOk: () => {
                            approveOrder({
                              values: {
                                id: record?._id,
                                status: "ยืนยันการชำระเงิน",
                              },
                            });
                          },
                        });
                      } else {
                        AlertWarning({ text: "กรุณาระบุ Tracking No." });
                      }
                    }}
                  >
                    อนุมัติ
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row className="center">
                <p>สั่งซื้อสำเร็จ!</p>
              </Row>
            )}
          </>
        );
      },
    },
  ];
  useEffect(() => {
    refetchOrder();
  }, [tabSelected, rangeDate]);

  useEffect(() => {
    let role_user = getRoleUser();
    if (role_user !== "admin") {
      navigate("/admin");
    }
  }, []);

  return (
    <LayoutAdmin>
      <h3>จัดการคำสั่งซื้อสินค้า</h3>
      <Row gutter={[8, 8]} className="mt-4">
        <Col span={12}>
          <Card className="w-100 h-100 ">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="p-0 m-0">ยอดขายรอการอนุมัติ :</h6>
              <h3 className="p-0 m-0">
                {numeral(getOrder?.calNetpriceWaitingApprove).format("0,0")}
              </h3>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card className="w-100 h-100 ">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="p-0 m-0">ยอดขายรวมทั้งหมด :</h6>
              <h3 className="p-0 m-0">
                {numeral(getOrder?.calNetpriceApproveSuccess).format("0,0")}
              </h3>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[8, 8]} className="mb-4 mt-2">
        <Col span={12}>
          <Card className="w-100 h-100">
            <h1>{numeral(getOrder?.amountWaitingApprove).format("0,0")}</h1>
            <h6>รายการคำสั่งซื้อรออนุมัติทั้งหมด</h6>
          </Card>
        </Col>
        <Col span={12}>
          <Card className="w-100 h-100">
            <h1>{numeral(getOrder?.amountApproveSuccess).format("0,0")}</h1>
            <h6>คำสั่งซื้อสำเร็จทั้งหมด</h6>
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Tabs
          className="w-100"
          defaultActiveKey={1}
          type="card"
          onChange={(key) => {
            setTabSelected(key);
          }}
          items={listTab.map((n, i) => {
            return {
              label: n?.label,
              key: n?.key,
              children: (
                <>
                  <Row gutter={[8, 8]} className="my-3">
                    <Col span={14}>
                      <Input
                        placeholder="ค้นหาจากหมายเลขคำสั่งซื้อ"
                        onChange={(e) => {
                          let value = e.target.value;
                          setSearch(value);
                        }}
                      />
                    </Col>
                    <Col span={6}>
                      <RangePicker
                        className="w-100"
                        onChange={(date) => {
                          setRangeDate(date);
                        }}
                      />
                    </Col>
                    <Col flex={1}>
                      <Button
                        block
                        type="primary"
                        onClick={() => {
                          refetchOrder();
                        }}
                      >
                        ค้นหา
                      </Button>
                    </Col>
                  </Row>

                  <Table
                    loading={isLoadingOrder}
                    bordered
                    className="w-100"
                    dataSource={getOrder?.listOrder}
                    columns={columns}
                  />
                </>
              ),
            };
          })}
        />
      </Row>
      <Modal
        width={600}
        open={productOpen}
        footer={null}
        onCancel={_handlesProductClose}
      >
        <Row>
          <Col span={24}>
            <p>รายละเอียดสินค้า {_.size(detailProduct?.productList)} ชิ้น</p>
            {detailProduct?.productList?.map((item, i) => {
              return (
                <Card className="w-100 mb-3">
                  <ProductOrderCard key={i} item={item} />
                </Card>
              );
            })}
          </Col>
        </Row>
      </Modal>

      <Modal
        title="Tracking No."
        open={trackingOpen}
        footer={null}
        onCancel={_handlesTrackingClose}
      >
        <Row gutter={[8, 8]} className="center my-4">
          <Col span={16}>
            <Input
              value={isTranckingNo}
              placeholder="Tracking No."
              onChange={(e) => {
                let text = e.target.value;
                setIsTrackingNo(text);
              }}
            />
          </Col>
          <Col flex={1}>
            <Button
              block
              type="primary"
              onClick={() => {
                AlertConfirm({
                  text: "่ต้องการบันทึก Tracking No นี้หรือไม่ ?",
                  onOk: () => {
                    if (isTranckingNo) {
                      _handlesTrackingClose();
                      approveOrder({
                        values: {
                          id: dataTracking?._id,
                          trackingNo: isTranckingNo,
                        },
                      });
                    } else {
                      AlertWarning({ text: "กรุณาระบุ Tracking No." });
                    }
                  },
                });
              }}
            >
              บันทึก
            </Button>
          </Col>
        </Row>
      </Modal>
    </LayoutAdmin>
  );
};

export default ManageOrder;
