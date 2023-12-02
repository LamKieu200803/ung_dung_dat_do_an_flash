import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const KhachHang = () => {
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:9997/user");
      console.log(res);
      setUsers(res.data);
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
      selector: (row) => row.password,
      sortable: true,
    },
  ];
  return (
    <div style={{ padding: "20px 50px" }}>
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
