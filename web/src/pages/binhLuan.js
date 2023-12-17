import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";

const BinhLuan = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [detailShow, setDetailShow] = useState(false);
   const [selectedCmt, setSelectedCmt] = useState(null);
   const [deleteCmt, setDeleteCmt] = useState(false);
   const [showDetailModal, setShowDetailModal] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState(null);

  const handleRowClick = (row) => {
    setSelectedCmt(row);
    setDetailShow(true);
  };
  
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
  };
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:9997/binhluan`);
      setComments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const columns = [
    { name: "STT", selector: (row, index) => `${index + 1}` },
    {
      name: "Ảnh sản phẩm",
      selector: (row) => (
        <img
          style={{ width: "70px", padding: "5px" }}
          src={row?.productId?.img}
        />
      ),
    },
    { name: "Tên sản phẩm", selector: (row) => row.productId.tensp},
    { name: "Tên khách hàng", selector: (row) => row.tennguoimua },
    { name: "Nội dung", selector: (row) => row.noidung },
    {
      name: "Xem chi tiết",
      cell: (row) => (
        <Button variant="outline-primary" onClick={() => handleRowClick(row)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px 50px" }}>
      <Modal show={detailShow} onHide={() => setDetailShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết bình luận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCmt && (
            <div>
              <img src={selectedCmt.productId.img} style={{width: "200px", height: "150px"}}/>
              <p>Tên sản phẩm: {selectedCmt.productId.tensp}</p>
              <p>Tên Khách Hàng: {selectedCmt.tennguoimua}</p>
              <p>Số Nội dung: {selectedCmt.noidung}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <DataTable
        columns={columns}
        data={comments}
        pagination
        paginationPerPage={5}
        striped
      />
    </div>
  );
};

export default BinhLuan;
