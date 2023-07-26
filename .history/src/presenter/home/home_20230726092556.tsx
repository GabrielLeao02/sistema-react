import React, { Component } from "react";
import Chart from "react-apexcharts";

const data = {
	options: {
		chart: {
			id: "Spline"
		},
		xaxis: {
			categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
		}
	},
	series: [
		{
			name: "series-1",
			data: [{
				data: [23, 34, 12, 54, 32, ... , 43]
			  }]
		}
	]
};

function Home() {


	return (
		<div className="app">
			<div className="row">
				<div className="mixed-chart">
					<Chart
						options={data.options}
						series={data}
						type="line"
						width="500"
					/>
				</div>
			</div>
		</div>
	);

}

export default Home;