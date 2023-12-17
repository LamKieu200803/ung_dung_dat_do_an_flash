import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import unorm from "unorm";
import Form from "react-bootstrap/Form";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const [detailShow, setDetailShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:9997/sanpham");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:9997/danhmuc");
      setCategories(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDetailShow = (rowData) => {
    setSelectedProduct(rowData);
    setDetailShow(true);
  };

  const columns = [
    { name: "STT", selector: (row, index) => `${index + 1}` },
    {
      name: "Ảnh",
      selector: (row) => (
        <img
          style={{
            width: "70px",
            height: "70px",
            objectFit: "cover",
            padding: "10px 10px 10px 0px",
          }}
          src={row.img}
          alt={`Product ${row.id}`}
        />
      ),
    },
    {
      name: "Tên sản phẩm",
      selector: (row) => row.tensp,
      sortable: true,
    },
    {
      name: "Giá sản phẩm",
      selector: (row) => row.giasp,
      sortable: true,
    },
    {
      name: "Số lượng",
      selector: (row) => row.soluong,
      sortable: true,
    },
    {
      name: "Mô tả sản phẩm",
      selector: (row) =>
        row.motasp.substring(0, 40) + (row.motasp.length > 50 ? "..." : ""),
      sortable: true,
    },
    {
      name: "Sửa ",
      cell: (row) => (
        <Button variant="outline-success" onClick={() => handleEdit(row)}>
          Sửa sản phẩm
        </Button>
      ),
    },
    {
      name: "Xem chi tiết",
      cell: (row) => (
        <Button variant="outline-primary" onClick={() => handleDetailShow(row)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const handleShow = () => setShow(true);

  const handleAdd = async () => {
    const form = document.getElementById("addProductForm");

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const normalizedProductName = unorm.nfd(productName).toLowerCase();

    const isProductNameExist = products.some(
      (product) =>
        unorm.nfd(product.tensp).toLowerCase() === normalizedProductName
    );

    if (isProductNameExist) {
      alert("Tên sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }

    try {
      await axios.post("http://localhost:9997/sanpham/them", {
        tensp: productName,
        giasp: productPrice,
        img: productImage,
        motasp: productDescription,
        soluong: productQuantity,
        danhMucId: selectedCategory,
      });

      handleClose();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (rowData) => {
    const { _id, tensp, giasp, img, soluong, motasp } = rowData;
    console.log(rowData);

    setProductId(_id);
    setProductName(tensp);
    setProductPrice(giasp);
    setProductImage(img);
    setProductQuantity(soluong);
    setProductDescription(motasp);

    setShow(true);
  };

  const handleUpdate = async () => {
    const form = document.getElementById("addProductForm");

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      await axios.put(`http://localhost:9997/sanpham/sua/${productId}`, {
        tensp: productName,
        giasp: productPrice,
        img: productImage,
        motasp: productDescription,
        soluong: productQuantity,
        danhMucId: selectedCategory,
      });

      handleClose();
      fetchData();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setProductId("");
    setProductName("");
    setProductPrice("");
    setProductImage("");
    setProductQuantity("");
    setProductDescription("");
    setValidated(false);
  };

  return (
    <div style={{ padding: "20px 50px" }}>
      <Modal show={detailShow} onHide={() => setDetailShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <img
                style={{
                  width: "200px",
                  height: "150px",
                  objectFit: "cover",
                  padding: "10px 10px 10px 0px",
                }}
                src={selectedProduct.img}
              />
              <p>Tên sản phẩm: {selectedProduct.tensp}</p>
              <p>Danh mục: {selectedProduct?.danhMucId?.tendanhmuc}</p>
              <p>Giá sản phẩm: {selectedProduct.giasp}</p>
              <p>Số lượng phẩm: {selectedProduct.soluong}</p>
              <p>Chi tiết sản phẩm: {selectedProduct.motasp}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDetailShow(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {productId ? "Cập nhật sản phẩm" : "Thêm mới sản phẩm"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={productId ? handleUpdate : handleAdd}
            id="addProductForm"
          >
            <Form.Group as={Col} controlId="productCategory">
              <Form.Label>Danh mục sản phẩm</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.tendanhmuc}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="productName">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Tên sản phẩm"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="productPrice">
              <Form.Label>Giá sản phẩm</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Giá sản phẩm"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="productImage">
              <Form.Label>Ảnh sản phẩm</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="URL ảnh sản phẩm"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="productQuantity">
              <Form.Label>Số lượng sản phẩm</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Số lượng sản phẩm"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="productDescription">
              <Form.Label>Mô tả sản phẩm</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Mô tả sản phẩm"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          {productId ? (
            <Button variant="primary" onClick={handleUpdate}>
              Cập nhật
            </Button>
          ) : (
            <Button variant="success" onClick={handleAdd}>
              Thêm
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <DataTable
        columns={columns}
        data={products.filter(
          (product) =>
            (selectedFilterCategory === "" ||
              product.danhMucId?._id === selectedFilterCategory) &&
            (product.tensp.toLowerCase().includes(searchText.toLowerCase()) ||
              product.giasp.toString().includes(searchText) ||
              product.soluong.toString().includes(searchText) ||
              product.motasp.toLowerCase().includes(searchText.toLowerCase()))
        )}
        pagination
        paginationPerPage={5}
        striped
        subHeader
        subHeaderComponent={
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="primary" onClick={handleShow}>
              Thêm sản phẩm
            </Button>
            <Form.Group controlId="formProductCategory">
              <Form.Control
                as="select"
                onChange={(e) => {
                  setSelectedFilterCategory(e.target.value);
                  setSearchText("");
                }}
                value={selectedFilterCategory || ""}
              >
                <option value="" key="all">
                  Tất cả danh mục
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.tendanhmuc}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm"
              value={searchText}
              onChange={handleSearch}
              style={{ marginLeft: "10px", width: "300px" }}
            />
          </div>
        }
        subHeaderAlign="left"
      />
    </div>
  );
};

export default Products;
