import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const [originalStatus, setOriginalStatus] = useState("");

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

  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
    setSelectedOrder(null);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
  };

  const handleOpenStatusModal = (order) => {
    setShowStatusModal(true);
    setSelectedOrder(order);
    setOriginalStatus(order.trangthai);
    setNewStatus(order.trangthai);
  };

  const handleOpenDetailModal = (order) => {
    setShowDetailModal(true);
    setSelectedOrder(order);
  };

  const columns = [
    { name: "Mã đơn hàng", selector: (row, index) => row._id },
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
      name: "Cập nhật trạng thái",
      cell: (row) => (
        <Button
          variant="outline-warning"
          onClick={() => handleOpenStatusModal(row)}
          disabled={row.trangthai === "Đã hủy"}
          style={{ opacity: row.trangthai === "Đã hủy" ? 0.5 : 1 }}
        >
          Sửa trạng thái
        </Button>
      ),
    },
    {
      name: "Xem chi tiết",
      cell: (row) => (
        <Button
          variant="outline-primary"
          onClick={() => handleOpenDetailModal(row)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];
  const handleStatusUpdate = async () => {
    try {
      if (!selectedOrder) {
        console.error("No order selected.");
        return;
      }
  
      // Allow changing to "Đã hủy" directly from "Đang giao"
      if (newStatus === "Đã hủy" && selectedOrder.trangthai === "Đang giao") {
        const res = await axios.put(
          `http://localhost:9997/hoadon/sua/${selectedOrder.idKhachHang}/${selectedOrder._id}`,
          { trangthai: newStatus }
        );
        console.log(res.data);
      } else {
        // Handle other status transitions
        const statusOrder = ["Chờ xác nhận", "Đang giao", "Đã giao", "Đã hủy"];
        const currentIndex = statusOrder.indexOf(selectedOrder.trangthai);
        const newIndex = statusOrder.indexOf(newStatus);
  
        if (newIndex < currentIndex || newIndex - currentIndex > 1) {
          setNotification({
            show: true,
            message: "Không thể chuyển trạng thái.",
          });
          return;
        }
  
        // Disallow changing from "Đã giao" to "Đã hủy"
        if (selectedOrder.trangthai === "Đã giao" && newStatus === "Đã hủy") {
          setNotification({
            show: true,
            message: "Không thể chuyển từ Đã giao sang Đã hủy.",
          });
          return;
        }
  
        const res = await axios.put(
          `http://localhost:9997/hoadon/sua/${selectedOrder.idKhachHang}/${selectedOrder._id}`,
          { trangthai: newStatus }
        );
        console.log(res.data);
      }
  
      fetchData();
      setShowStatusModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const filteredData = orders.filter((order) => {
    if (filterStatus === "Tất cả") return true;
    return order.trangthai === filterStatus;
  });

  return (
    <div style={{ padding: "20px 50px" }}>
      <Dropdown onSelect={(status) => setFilterStatus(status)}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {filterStatus}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="Tất cả">Tất cả</Dropdown.Item>
          <Dropdown.Item eventKey="Chờ xác nhận">Chờ xác nhận</Dropdown.Item>
          <Dropdown.Item eventKey="Đang giao">Đang giao</Dropdown.Item>
          <Dropdown.Item eventKey="Đã giao">Đã giao</Dropdown.Item>
          <Dropdown.Item eventKey="Đã hủy">Đã hủy</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={5}
        striped
        subHeader
        subHeaderAlign="left"
      />
      <Modal
        show={notification.show}
        onHide={() => setNotification({ show: false, message: "" })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{notification.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => setNotification({ show: false, message: "" })}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showStatusModal} onHide={handleCloseStatusModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật trạng thái đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Chọn trạng thái mới:</p>
          <Dropdown onSelect={setNewStatus}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {newStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Chờ xác nhận">
                Chờ xác nhận
              </Dropdown.Item>
              <Dropdown.Item eventKey="Đang giao">Đang giao</Dropdown.Item>
              <Dropdown.Item eventKey="Đã giao">Đã giao</Dropdown.Item>
              <Dropdown.Item eventKey="Đã hủy">Đã hủy</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseStatusModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleStatusUpdate}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết hóa đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <p>Mã đơn hàng: {selectedOrder._id}</p>
              <p>Tên khách hàng: {selectedOrder.tennguoimua}</p>
              <p>Phương thức thanh toán: {selectedOrder.pttt ?? "Tiền mặt"}</p>
              <p>Địa chỉ: {selectedOrder.diachi}</p>
              <p>Số điện thoại: {selectedOrder.sdt}</p>
              <p>Thời gian đặt hàng: {selectedOrder.thoigian}</p>
              <p>Trạng thái: {selectedOrder.trangthai}</p>
              <h5>Danh sách sản phẩm:</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Ảnh sản phẩm</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.danhsachsp.map((product) => (
                    <tr key={product._id}>
                      <td>{product.tensp}</td>
                      <td>{product.soluongmua}</td>
                      <td>{product.giasp}</td>
                      <td>
                        <img
                          src={product.img}
                          alt={product.tensp}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
