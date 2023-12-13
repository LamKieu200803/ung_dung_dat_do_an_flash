import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");

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

  const handleStatusUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:9997/hoadon/sua/${selectedOrderId.userId}/${selectedOrderId._id}`,
        { trangthai: newStatus }
      );
      console.log(res.data);
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (orderId) => {
    setShowModal(true);
    setSelectedOrderId(orderId);
    setNewStatus(""); // Reset newStatus when opening the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrderId(null);
  };

  const handleFilterStatusChange = (status) => {
    setFilterStatus(status);
  };

  const filteredOrders =
    filterStatus === "Tất cả"
      ? orders
      : orders.filter((order) => order.trangthai === filterStatus);

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
    {
      name: "Xem chi tiết",
      cell: (row) => (
        <Button variant="outline-warning" onClick={() => handleOpenModal(row)}>
          Sửa trạng thái
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px 50px" }}>
      <Dropdown onSelect={(status) => handleFilterStatusChange(status)}>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          {filterStatus}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="Tất cả">Tất cả</Dropdown.Item>
          <Dropdown.Item eventKey="Chờ xác nhận">Chờ xác nhận</Dropdown.Item>
          <Dropdown.Item eventKey="Đã xác nhận">Đã xác nhận</Dropdown.Item>
          <Dropdown.Item eventKey="Đang giao">Đang giao</Dropdown.Item>
          <Dropdown.Item eventKey="Đã giao">Đã giao</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <DataTable
        columns={columns}
        data={filteredOrders}
        pagination
        paginationPerPage={5}
        striped
        subHeader
        subHeaderAlign="left"
      />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật trạng thái</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col}>
            <Form.Label>Trạng thái mới</Form.Label>
            <Dropdown onSelect={(status) => setNewStatus(status)}>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                {newStatus || "Chọn trạng thái"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Chờ xác nhận">Chờ xác nhận</Dropdown.Item>
                <Dropdown.Item eventKey="Đã xác nhận">Đã xác nhận</Dropdown.Item>
                <Dropdown.Item eventKey="Đang giao">Đang giao</Dropdown.Item>
                <Dropdown.Item eventKey="Đã giao">Đã giao</Dropdown.Item>
                {/* Add other status options as needed */}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleStatusUpdate}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;