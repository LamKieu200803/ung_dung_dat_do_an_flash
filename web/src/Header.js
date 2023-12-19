import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Header = () => {
  const navigation = useNavigate();
  const handleLogout = () => {
    navigation("/");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng xuất</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn đăng xuất không!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <div
            style={{
              margin: "0px 20px",
              display: "flex",
              height: "100%",
            }}
          >
            <img src={logo} style={{ width: "50px" }} />
            <p style={{ color: "red", margin: "10px 0 0 0" }}>
              Flash Shop
            </p>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/thongke">
                Thống Kê
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/khachHang">
                Khách hàng
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/danhmuc">
                Danh Mục
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/binhluan">
                Bình Luận
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sanPham">
                Sản Phẩm
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/order">
                Hóa đơn
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <img
          src={require("./assets/abc.png")}
          style={{ width: "30px", marginRight: "100px" }}
          onClick={() => handleShow()}
        />
      </div>
    </nav>
  );
};

export default Header;
