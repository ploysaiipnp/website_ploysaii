import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Input,
  Row,
  Table,
  Tabs,
} from "antd";
import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { NOT_FOUND_IMG } from "../../../assets";
import useModalHook from "../../../hooks/useModalHook";
import adminService from "../../../services/admin.services";
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
    label: "รายงานการขาย",
  },
];

const AdminReport = () => {
  const [tabSelected, setTabSelected] = useState(1);
  const [search, setSearch] = useState(null);
  const [rangeDate, setRangeDate] = useState(null);

  const {
    open: productOpen,
    handleOpen: _handlesProductOpen,
    handleClose: _handlesProductClose,
  } = useModalHook();

  const {
    data: getOrder,
    isLoading: isLoadingOrder,
    refetch: refetchOrder,
  } = adminService.useQueryGetOrder({
    queryObj: {
      status: "ยืนยันการชำระเงิน",
      order_code: search,
      startDate: rangeDate
        ? moment(rangeDate[0]?.$d).format("YYYY-MM-DD")
        : null,
      endDate: rangeDate ? moment(rangeDate[1]?.$d).format("YYYY-MM-DD") : null,
    },
  });

  const ProductOrderCard = ({ item }) => {
    return (
      <Row>
        <Col>
          <p className="mb-0">{item?.optionInfo?.name}</p>
          <p className="p-0 m-0">{`จำนวน ${numeral(item?.amount).format(
            "0,0"
          )} ชิ้น x ราคา ${numeral(item?.optionInfo?.price).format(
            "0,0"
          )} บาท `}</p>
          <p className="text-primary">{`รวม ${numeral(
            item?.amount * item?.optionInfo?.price
          ).format("0,0")} บาท`}</p>
        </Col>
      </Row>
    );
  };

  const columns = [
    {
      title: "รายละเอียดคำสั่งซื้อ",
      width: "300px",
      align: "left",
      render: (_, record) => {
        const { order_code, purchase_date } = record;
        return (
          <Row>
            <Col span={24}>
              <p className="p-0 m-0 text-primary">{`หมายเลขคำสั่งซื้อ : ${order_code}`}</p>
              <p className="p-0 m-0 mb-2">{`วันที่ซื้อ : ${moment(
                purchase_date
              ).format("DD/MM/YYYY - เวลา HH:mm:ss น.")} `}</p>
              <Collapse
                size="small"
                items={[
                  {
                    key: "1",
                    label: "รายละเอียดสินค้า",
                    children: (
                      <>
                        {record?.productList?.map((item, i) => {
                          return <ProductOrderCard key={i} item={item} />;
                        })}
                      </>
                    ),
                  },
                ]}
              />
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
    // {
    //   title: "Download Report",
    //   dataIndex: "manage",
    //   key: "manage",
    //   align: "center",
    //   render: (_, record) => {
    //     return (
    //       <>
    //         <Button
    //           type="primary"
    //           className="me-2"
    //           onClick={() => {
    //             AlertConfirm({
    //               text: "ต้องการอนุมัติคำสั่งซื้อนี้หรือไม่ ?",
    //               onOk: () => {
    //                 approveOrder({
    //                   values: {
    //                     id: record?._id,
    //                     status: "ยืนยันการชำระเงิน",
    //                   },
    //                 });
    //               },
    //             });
    //           }}
    //         >
    //           Download Excel
    //         </Button>
    //       </>
    //     );
    //   },
    // },
  ];
  useEffect(() => {
    refetchOrder();
  }, [tabSelected, rangeDate]);

  return (
    <LayoutAdmin>
      <h3>จัดการคำสั่งซื้อสินค้า</h3>
      <Row gutter={[8, 8]} className="mt-4">
        <Col span={12}>
          <Card className="w-100 h-100 ">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="p-0 m-0">คำสั่งซื้อสำเร็จทั้งหมด :</h6>
              <h3 className="p-0 m-0">
                {numeral(getOrder?.amountApproveSuccess).format("0,0")}
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
    </LayoutAdmin>
  );
};

export default AdminReport;
