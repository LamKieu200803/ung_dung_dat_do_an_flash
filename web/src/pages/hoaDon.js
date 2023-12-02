import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:9997/hoadon");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },
    {
      name: "Tên người mua",
      selector: (row) => row.tennguoimua,
      sortable: true,
    },
    {
      name: "Địa chỉ",
      selector: (row) => row.diachi,
      sortable: true,
    },
    {
      name: "Số điện thoại",
      selector: (row) => row.sdt,
      sortable: true,
    },
    {
      name: "Tổng tiền",
      selector: (row) => row.tongtien,
      sortable: true,
    },
    {
      name: "Thời gian đặt hàng",
      selector: (row) => row.thoigian,
      sortable: true,
    },
    {
      name: "Trạng thái",
      selector: (row) => row.trangthai,
      sortable: true,  
    },
  ];

  return (
    <div style={{ padding: "20px 50px" }}>
      <DataTable
        columns={columns}
        data={orders}
        pagination
        paginationPerPage={5}
        striped
        subHeader
        subHeaderAlign="left"
      />
    </div>
  );
};

export default Orders;
