import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const Home = () => {
  const [data, setData] = useState([]);
  const options = {
    isStacked: true,
    height: 500,
    legend: { position: "top", maxLines: 3 },
    vAxis: { minValue: 0 },
  };
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:9997/thongke");
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Chart
        chartType="AreaChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default Home;
