import { Box, IconButton, Typography } from "@mui/material";
import CustomTable from "component/CustomTable";
import { AlertContext } from "context/AlertContext";
import { ConfirmContext } from "context/ConfirmContext";
import LayoutAdmin from "page/LayoutAdmin";
import queryString from "query-string";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "Redux/Actions";
import FormDetailOrder from "./FormDetailOrder";
import CircleIcon from "@mui/icons-material/Circle";
import i18next from "i18next";
import { StatusColorEnum, StatusEnum } from "enum/StatusEnum";
import BlockIcon from "@mui/icons-material/Block";
import DoneIcon from "@mui/icons-material/Done";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const Order = () => {
	const dispatch = useDispatch();
	const { orders, isGetOrders } = useSelector((state) => state.orderReducer);
	const [listOrder, setListOrder] = useState([]);
	useEffect(() => {
		setListOrder(orders.results);
	}, [orders]);

	const { showConfirm } = useContext(ConfirmContext);
	const { showAlert } = useContext(AlertContext);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [currentOrder, setCurrentOrder] = useState(null);
	const viewAction = (data) => {
		setCurrentOrder(data);
		setIsOpenModal(true);
	};
	const updateOrder = (order, status) => {
		const body = { ...order, status: status };
		dispatch(
			orderActions.updateOrder("", body, {
				success: (res) => {
					const newListItem = listOrder.map((item) => {
						if (item.id === res.id) {
							item.status = res.status;
						}
						return item;
					});
					setListOrder(newListItem);
					dispatch(showAlert("success", "Cập nhật trạng thái thành công"));
				},
				failed: (err) => {
					console.log(err);
				},
			})
		);
	};
	const configColumns = [
		{ label: "Người nhận", id: "buyerName" },
		{ label: "Điện thoại", id: "phoneNumber" },
		{ label: "Số sản phẩm", id: "products.length" },
		{
			label: "Giá trị đơn hàng",
			Cell: ({ data }) => (
				<>
					{data.products.reduce(
						(pre, curr) => pre + curr.quantity * curr.productId.price,
						0
					)}
				</>
			),
		},
		{
			label: "Trạng thái",
			id: "status",
			Cell: (rowData) => (
				<>
					<CircleIcon
						color={
							rowData.data.status === 0
								? StatusColorEnum.Pending
								: rowData.data.status === 1
								? StatusColorEnum.Failed
								: StatusColorEnum.Success
						}
						fontSize="small"
						scale="0.5"
					/>
					{i18next.t("CommonI18n.StatusConfirm." + rowData.data.status)}
				</>
			),
		},
		{
			label: "Hành động",
			Cell: ({ data }) => (
				<Box>
					<IconButton onClick={() => viewAction(data)} title="Xem">
						<RemoveRedEyeIcon />
					</IconButton>
					{data.status == StatusEnum.Pending && (
						<>
							<IconButton
								onClick={() => {
									updateOrder(data, StatusEnum.Reject);
								}}
							>
								<BlockIcon color="error" />
							</IconButton>
							<IconButton
								onClick={() => {
									console.log(data);
									updateOrder(data, StatusEnum.Approved);
								}}
							>
								<DoneIcon color="success" />
							</IconButton>
						</>
					)}
					{data.status == StatusEnum.Approved && (
						<>
							<IconButton
								onClick={() => {
									updateOrder(data, StatusEnum.Shipping);
								}}
							>
								<LocalShippingIcon color="info" />
							</IconButton>
						</>
					)}
				</Box>
			),
		},
	];
	const [query, setQuery] = useState({
		page: 1,
		populate: "products.productId.category,discountId",
	});
	const closeFormDetail = (isSubmit = false) => {
		setCurrentOrder(undefined);
		setIsOpenModal(false);
		if (isSubmit) {
			handleGetOrders();
		}
	};
	const handleGetOrders = (data = query) => {
		dispatch(orderActions.getOrders(queryString.stringify(data), {}));
	};
	useEffect(() => {
		handleGetOrders();
	}, []);

	return (
		<LayoutAdmin>
			<Typography variant="h4">Danh sách đơn hàng</Typography>
			<CustomTable
				data={listOrder}
				totalResults={orders.totalResults}
				columns={configColumns}
				currentPage={orders.page}
				isPending={isGetOrders}
				handleGetData={handleGetOrders}
				populate={"category"}
			></CustomTable>

			<FormDetailOrder
				isOpen={isOpenModal}
				detailOrder={currentOrder}
				handleClose={closeFormDetail}
				handleReload={handleGetOrders}
			/>
		</LayoutAdmin>
	);
};

export default Order;
