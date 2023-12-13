import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const KhachHang = () => {
  const [users, setUsers] = useState([]);
  const [detailShow, setDetailShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [show, setShow] = useState(false);
  const handleDetailShow = async (rowData) => {
    const res = await axios.get(
      "http://localhost:9997/thongtin/" + rowData._id
    );
    setSelectedUser(res.data[0]);

    setDetailShow(true);
  };
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:9997/user");
      console.log(res);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleShow = () => setShow(true);
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
      selector: (row) => row.password,
      sortable: true,
    },
    ,
    {
      name: "Xem chi tiết",
      cell: (row) => (
        <Button variant="outline-primary" onClick={() => handleDetailShow(row)}>
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
              <img
                style={{
                  width: "200px",
                  height: "150px",
                  objectFit: "cover",
                  padding: "10px 10px 10px 0px",
                }}
                src={selectedUser?.anh}
              />
              <p>Tên người mua: {selectedUser?.tennguoimua}</p>
              <p>Số điện thoại: 0{selectedUser?.phone}</p>
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
      />
    </div>
  );
};

export default KhachHang;
