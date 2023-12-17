import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Chart } from "react-google-charts";

const ThongKe = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const options = {
    isStacked: true,
    height: 500,
    legend: { position: "top", maxLines: 3 },
    vAxis: { minValue: 0 },
  };
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:9997/thongke");
      const res2 = await axios.get("http://localhost:9997/top5sold");
      setProducts(res2.data);
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
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
      name: "Số lượng bán",
      selector: (row) => row.soluongban,
      sortable: true,
    },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 2fr",
        marginTop: "50px",
        fontSize: "18px",
        fontWeight: "bold",
      }}
    >
      <div style={{ width: "60vw" }}>
        <p style={{ marginLeft: "120px" }}>Thống kê hóa đơn</p>
        <Chart
          chartType="AreaChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
      <div style={{ width: "40vw", paddingRight: "100px" }}>
        <p>Top 5 sản phảm</p>
        <DataTable
          columns={columns}
          data={products}
        />
      </div>
    </div>
  );
};

export default ThongKe;
