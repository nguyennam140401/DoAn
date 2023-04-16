import { Box, Button, Dialog, Grid, Typography } from "@mui/material";
import CustomTable from "component/CustomTable";
import { StatusEnum } from "enum/StatusEnum";
import React from "react";
import { useDispatch } from "react-redux";
import { orderActions } from "Redux/Actions";
import { BASE_API } from "Services/ServiceURL";

const FormDetailOrder = ({
	isOpen,
	detailOrder,
	isEdit,
	handleClose,
	handleReload,
}) => {
	const dispatch = useDispatch();
	const configColumns = [
		{ label: "Tên sản phẩm", id: "name" },
		{
			label: "Hình ảnh",
			Cell: ({ data }) => (
				<img
					src={`${BASE_API}/${data.images[0]}`}
					alt={data.name}
					width={70}
					height={70}
					style={{ objectFit: "contain" }}
					loading="lazy"
				/>
			),
		},
		{ label: "Danh mục", id: "category.name" },
		{ label: "Số lượng", id: "quantity" },
	];
	const updateOrder = (status) => {
		const body = { ...detailOrder, status: status };
		dispatch(
			orderActions.updateOrder("", body, {
				success: (res) => {
					console.log(res);
					handleReload();
					handleClose();
				},
				failed: (err) => {
					console.log(err);
				},
			})
		);
	};
	return (
		<Dialog
			maxWidth="lg"
			open={isOpen}
			onClose={() => {
				handleClose();
			}}
			fullWidth
		>
			{detailOrder && (
				<Box p={3}>
					<Typography variant="h5" mb={3}>
						Chi tiết đơn hàng{" "}
					</Typography>
					<Box mb={2}>
						<Grid container>
							<Grid item md={6} xs={12}>
								<Typography>
									Tên người nhận: {detailOrder.buyerName}{" "}
								</Typography>
							</Grid>
							<Grid item md={6} xs={12}>
								<Typography>
									Số điện thoại: {detailOrder.phoneNumber}{" "}
								</Typography>
							</Grid>
							<Grid item md={6} xs={12}>
								<Typography>
									Số sản phẩm: {detailOrder.products.length}{" "}
								</Typography>
							</Grid>
							<Grid item md={6} xs={12}>
								<Typography>
									Trạng thái:{" "}
									{detailOrder.status == StatusEnum.Pending
										? "Đang chờ duyệt"
										: detailOrder.status == StatusEnum.Approved
										? "Đã xác nhận"
										: detailOrder.status == StatusEnum.Shipping
										? "Đang giao hàng"
										: detailOrder.status == StatusEnum.Success
										? "Giao hàng thành công"
										: "Đơn hàng đã bị hủy"}
								</Typography>
							</Grid>

							<Grid mt={3} item xs={12}>
								<CustomTable
									data={detailOrder.products.map((item) => ({
										...item.productId,
										quantity: item.quantity,
									}))}
									totalResults={detailOrder.products.length}
									columns={configColumns}
									isPending={false}
									populate={"category"}
								></CustomTable>
							</Grid>
						</Grid>
						<Box mt={4} gap={2} display={"flex"} justifyContent={"flex-end"}>
							{detailOrder.status == StatusEnum.Pending && (
								<>
									<Button
										variant="contained"
										onClick={() => {
											updateOrder(StatusEnum.Approved);
										}}
									>
										Nhận{" "}
									</Button>
									<Button
										variant="contained"
										onClick={() => {
											updateOrder(StatusEnum.Reject);
										}}
										color="error"
									>
										Từ chối{" "}
									</Button>
								</>
							)}
							{detailOrder.status == StatusEnum.Approved && (
								<>
									<Button
										variant="contained"
										onClick={() => {
											updateOrder(StatusEnum.Shipping);
										}}
									>
										Điều chuyển{" "}
									</Button>
								</>
							)}
						</Box>
					</Box>
				</Box>
			)}
		</Dialog>
	);
};

export default FormDetailOrder;
