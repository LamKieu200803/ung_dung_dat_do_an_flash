import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const DanhMuc = () => {
  const [categories, setCategories] = useState([]);
  const [detailShow, setDetailShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [deleteConfirmationShow, setDeleteConfirmationShow] = useState(false);
  const [newCategory, setNewCategory] = useState({
    tendanhmuc: "",
    anhdanhmuc: "",
  });

  const handleRowClick = (row) => {
    setSelectedCategory(row);
    setDetailShow(true);
  };

  const handleEditClick = (row) => {
    setSelectedCategory(row);
    setNewCategory({
      tendanhmuc: row.tendanhmuc,
      anhdanhmuc: row.anhdanhmuc,
    });
    setEditShow(true);
  };

  const handleDeleteClick = (row) => {
    setSelectedCategory(row);
    setDeleteConfirmationShow(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `http://localhost:9997/danhmuc/xoa/${selectedCategory._id}`
      );
      setDeleteConfirmationShow(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:9997/danhmuc/sua/${selectedCategory._id}`,
        newCategory
      );
      setEditShow(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddCategory = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9997/danhmuc/them",
        newCategory
      );
      console.log(newCategory);
      console.log(res);
      setDetailShow(false);
      setNewCategory({
        tendanhmuc: "",
        anhdanhmuc: "",
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:9997/danhmuc");
      setCategories(res.data);
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
      name: "Ảnh danh mục",
      cell: (row) => (
        <img
          src={row.anhdanhmuc}
          alt={row.tendanhmuc}
          style={{ maxWidth: "50px" }}
        />
      ),
    },
    {
      name: "Tên danh mục",
      selector: (row) => row.tendanhmuc,
      sortable: true,
    },
    {
      name: "Sửa",
      cell: (row) => (
        <Button variant="outline-warning" onClick={() => handleEditClick(row)}>
          Sửa danh mục
        </Button>
      ),
    },
    {
      name: "Xóa",
      cell: (row) => (
        <Button variant="outline-danger" onClick={() => handleDeleteClick(row)}>
          Xóa danh mục
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px 50px" }}>
      <Button variant="primary" onClick={() => setDetailShow(true)}>
        Thêm danh mục mới
      </Button>
      <Modal show={detailShow} onHide={() => setDetailShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm danh mục mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryImage">
              <Form.Label>Ảnh danh mục:</Form.Label>
              <Form.Control
                type="text"
                name="anhdanhmuc"
                value={newCategory.anhdanhmuc}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Tên danh mục:</Form.Label>
              <Form.Control
                type="text"
                name="tendanhmuc"
                value={newCategory.tendanhmuc}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddCategory}>
            Thêm danh mục
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={editShow} onHide={() => setEditShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditCategoryImage">
              <Form.Label>Ảnh danh mục:</Form.Label>
              <Form.Control
                type="text"
                name="anhdanhmuc"
                value={newCategory.anhdanhmuc}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEditCategoryName">
              <Form.Label>Tên danh mục:</Form.Label>
              <Form.Control
                type="text"
                name="tendanhmuc"
                value={newCategory.tendanhmuc}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleEditSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={deleteConfirmationShow}
        onHide={() => setDeleteConfirmationShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc muốn xóa danh mục "{selectedCategory?.tendanhmuc}"
            không?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeleteConfirmationShow(false)}
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
        data={categories}
        pagination
        paginationPerPage={5}
        striped
      />
    </div>
  );
};

export default DanhMuc;
