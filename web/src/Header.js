import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

const Header = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
              Flash Food Shop
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
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/khachHang">
                Khách hàng
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
    </nav>
  );
};

export default Header;
