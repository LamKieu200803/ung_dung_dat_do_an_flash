import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Chart } from "react-google-charts";

const ThongKe = () => {
  const [orderData, setOrderData] = useState();
  const [amountData, setAmountData] = useState();
  const data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
  ];
  const [products, setProducts] = useState([]);
  const options = {
    hAxis: { title: "Month", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "50%", height: "70%" },
  };

  const fetchData = async () => {
    try {
      const orderStats = await axios.get("http://localhost:9997/orderstats");
      const amountStats = await axios.get("http://localhost:9997/amountstats");
      const top5Sold = await axios.get("http://localhost:9997/top5sold");

      setOrderData(orderStats.data);
      setAmountData(amountStats.data);
      setProducts(top5Sold.data);

      console.log(orderStats.data);
      console.log(amountStats.data);
      console.log(data);
      console.log(top5Sold.data);
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
  ];

  return (
    <div
      style={{
        marginTop: "50px",
        fontSize: "18px",
        fontWeight: "bold",
        width: "100vw",
      }}
    >
      <div>
        <p style={{ marginLeft: "120px" }}>Thống kê số lượng đơn hàng</p>
        <Chart
          chartType="AreaChart"
          height="400px"
          data={orderData}
          options={options}
        />
      </div>
      <div>
        <p style={{ marginLeft: "120px" }}>Thống kê tổng giá trị</p>
        <Chart
          chartType="AreaChart"
          height="400px"
          data={amountData}
          options={options}
        />
      </div>
      <div style={{ width: "97vw", padding: "30px" }}>
        <p>Top 5 sản phẩm</p>
        <DataTable
          columns={columns}
          data={products}
          pagination
          paginationPerPage={5}
          striped
          subHeader
        />
      </div>
    </div>
  );
};

export default ThongKe;
