import React from "react";
import Chart from "react-apexcharts";

function Home() {
  const data = {
    options: {
      chart: {
        id: "Spline",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [23, 34, 12, 54, 32, 43, 56, 29, 38], // Série de dados 1
      },
      {
        name: "series-2",
        data: [42, 65, 34, 72, 26, 52, 46, 58, 39], // Série de dados 2
      },
      // Adicione mais séries aqui, se necessário
    ],
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={data.options}
            series={data.series}
            type="line"
            width="500"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
