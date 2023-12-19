import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";

const BinhLuan = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [detailShow, setDetailShow] = useState(false);
  const [selectedCmt, setSelectedCmt] = useState(null);
  const [deleteCmt, setDeleteCmt] = useState(false);
  const handleRowClick = (row) => {
    setSelectedCmt(row);
    setDetailShow(true);
  };
  const handleDeleteClick = (row) => {
    setSelectedCmt(row);
    setDeleteCmt(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `http://localhost:9997/binhluan/xoa/${selectedCmt._id}`
      );
      setDeleteCmt(false);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
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
    { name: "Tên sản phẩm", selector: (row) => row.productId?.tensp},
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
    {
      name: "Xóa bình luận",
      cell: (row) => (
        <Button variant="outline-danger" onClick={() => handleDeleteClick(row)}>
          Xóa bình luận
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
              <p>Tên sản phẩm: {selectedCmt.productId?.tensp}</p>
              <p>Tên Khách Hàng: {selectedCmt.tennguoimua}</p>
              <p>Số Điện Thoại: {selectedCmt.noidung}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Modal
        show={deleteCmt}
        onHide={() => setDeleteCmt(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa bình luận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc muốn xóa bình luận không?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeleteCmt(false)}
          >
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Xóa
          </Button>
        </Modal.Footer>
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
