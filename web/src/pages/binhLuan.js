import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const BinhLuan = ({ productId }) => {
  const [comments, setComments] = useState([]);

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
    { name: "ID", selector: (row, index) => `#${index + 1}` },
    {
      name: "Ảnh sản phẩm",
      selector: (row) => (
        <img
          style={{ width: "70px", padding: "5px" }}
          src={row?.productId?.img}
        />
      ),
    },
    { name: "Tên khách hàng", selector: (row) => row.tennguoimua },
    { name: "Nội dung", selector: (row) => row.noidung },
  ];

  return (
    <div style={{ margin: "50px" }}>
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
