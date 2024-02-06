import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const KhachHang = () => {
  const [users, setUsers] = useState([]);
  const [detailShow, setDetailShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPassword, setShowPassword] = useState({});

  const handleRowClick = async (row) => {
    try {
      console.log(row._id);
      const res = await axios.get(`http://localhost:9997/khachhang/${row._id}`);
      console.log(res);
      setSelectedUser(res.data);
      setDetailShow(true);
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = (userId) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [userId]: !prevShowPassword[userId],
    }));
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:9997/khachhang");
      setUsers(res.data);
      console.log(res.data);
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
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Password",
      selector: (row) => (
        <span style={{ display: "flex", alignItems: "center" }}>
          {showPassword[row._id] ? row.password : "****"}
          <Button
            variant="link"
            size="sm"
            style={{ marginBottom: "7px" }}
            onClick={() => togglePasswordVisibility(row._id)}
          >
            {showPassword[row._id] ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </span>
      ),
      sortable: true,
    },
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
          <Modal.Title>Chi tiết khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <div>
                <img src={selectedUser?.anhdaidien} />
                <p>Email: {selectedUser.email}</p>
                <p>Tên khách hàng: {selectedUser.tenkhachhang}</p>
                <p>Địa chỉ: {selectedUser.diachi}</p>
                <p>Số điện thoại: {selectedUser.sdt}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <DataTable
        columns={columns}
        data={users}
        pagination
paginationPerPage={5}
        striped
        onRowClicked={(row) => handleRowClick(row)} // Remove duplicate onRowClicked prop
      />
    </div>
  );
};

export default KhachHang;