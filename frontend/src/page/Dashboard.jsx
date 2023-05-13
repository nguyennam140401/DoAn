import React, { useEffect } from "react";
import LayoutAdmin from "./LayoutAdmin";
import { Box, Card, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { axiosClient } from "Services/axiosClient";
import { overview } from "Services/ServiceURL";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatPrice } from "common";
import { StatusEnum } from "enum/StatusEnum";
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

const Dashboard = () => {
	const labels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"];
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Thống kê đơn hàng",
			},
		},
		scales: {
			y: {
				min: 0,
			},
		},
	};

	const [configChart, setConfigChart] = useState({
		labels: [],
		datasets: [
			{
				fill: true,
				label: "Số đơn mua",
				data: [],
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	});
	const [dataTotal, setDataTotal] = useState({});
	useEffect(() => {
		axiosClient.get(overview + "/overviewDashBoard").then((res) => {
			setDataTotal(res.data);
			const arrMonth = [
				...new Set(
					res.data.allOrder.map((item) => {
						let x = new Date(item.createdAt);
						return x.getMonth() + 1;
					})
				),
			].sort();

			setConfigChart({
				labels: arrMonth.map((item) => "Tháng " + item),
				datasets: [
					{
						fill: true,
						label: "Số đơn mua",
						data: arrMonth.map(
							(item) =>
								res.data.allOrder.filter((order) => {
									let x = new Date(order.createdAt);
									return x.getMonth() === item - 1;
								}).length
						),
						borderColor: "rgb(53, 162, 235)",
						backgroundColor: "rgba(53, 162, 235, 0.5)",
					},
					{
						fill: true,
						label: "Số đơn thành công",
						data: arrMonth.map(
							(item) =>
								res.data.allOrder.filter((order) => {
									let x = new Date(order.createdAt);
									return (
										order.status == StatusEnum.Success &&
										x.getMonth() === item - 1
									);
								}).length
						),
						borderColor: "rgb(20, 223, 30)",
						backgroundColor: "rgba(129, 238, 153, 0.5)",
					},
					{
						fill: true,
						label: "Số đơn bị hủy",
						data: arrMonth.map(
							(item) =>
								res.data.allOrder.filter((order) => {
									let x = new Date(order.createdAt);
									return (
										order.status == StatusEnum.Cancel &&
										x.getMonth() === item - 1
									);
								}).length
						),
						borderColor: "rgb(189, 61, 11)",
						backgroundColor: "rgba(218, 107, 34, 0.5)",
					},
				],
			});
		});
	}, []);
	console.log(configChart);
	return (
		<LayoutAdmin>
			<Grid container spacing={3}>
				<Grid item xs={3}>
					<Card>
						<Box p={3}>
							<Typography>Số sản phẩm</Typography>
							<Typography variant="h4" mt={2}>
								{dataTotal.totalProduct}
							</Typography>
						</Box>
					</Card>
				</Grid>
				<Grid item xs={3}>
					<Card>
						<Box p={3}>
							<Typography>Số người dùng</Typography>
							<Typography variant="h4" mt={2}>
								{dataTotal.totalUser}
							</Typography>
						</Box>
					</Card>
				</Grid>
				<Grid item xs={3}>
					<Card>
						<Box p={3}>
							<Typography>Số đơn hàng</Typography>
							<Typography variant="h4" mt={2}>
								{dataTotal.totalOrder}
							</Typography>
						</Box>
					</Card>
				</Grid>
				<Grid item xs={3}>
					<Card>
						<Box p={3}>
							<Typography>Tổng doanh thu</Typography>
							<Typography variant="h4" mt={2} className="price">
								{formatPrice(dataTotal.totalRevenue)}
							</Typography>
						</Box>
					</Card>
				</Grid>
			</Grid>
			<Grid container spacing={3} mt={4}>
				<Grid item xs={9}>
					<Card>
						<Line options={options} data={configChart} />
					</Card>
				</Grid>
				<Grid item xs={3}>
					<Card>
						<Box p={3}>
							<Typography>Top 5 sản phẩm bán chạy nhất</Typography>
							<hr style={{ margin: "15px 0px" }}></hr>
							<Grid container spacing={2}>
								<Grid item xs={10}>
									<Typography mb={1}>Tên sản phẩm</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography mb={1}>SL</Typography>
								</Grid>
							</Grid>
							<hr style={{ margin: "0 15px" }}></hr>
							{dataTotal.listProductHot &&
								dataTotal.listProductHot.map((item, idx) => (
									<div key={idx}>
										<Grid container spacing={2} key={idx}>
											<Grid item xs={10}>
												<Typography mb={1}>{item.name}</Typography>
											</Grid>
											<Grid item xs={2}>
												<Typography mb={1}>{item.soldQuantity}</Typography>
											</Grid>
										</Grid>
										<hr style={{ margin: "0 15px" }}></hr>
									</div>
								))}
						</Box>
					</Card>
				</Grid>
			</Grid>
		</LayoutAdmin>
	);
};

export default Dashboard;
