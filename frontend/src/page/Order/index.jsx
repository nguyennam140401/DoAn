import { Box, Button, Typography } from "@mui/material";
import CustomTable from "component/CustomTable";
import ListActionButtonInTable from "component/ListActionButtonInTable";
import { AlertContext } from "context/AlertContext";
import { ConfirmContext } from "context/ConfirmContext";
import LayoutAdmin from "page/LayoutAdmin";
import queryString from "query-string";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "Redux/Actions";
import { BASE_API } from "Services/ServiceURL";
import FormDetailOrder from "./FormDetailOrder";
import CircleIcon from "@mui/icons-material/Circle";
import i18next from "i18next";
import { StatusColorEnum } from "enum/StatusEnum";

const Order = () => {
	const dispatch = useDispatch();
	const { orders, isGetOrders } = useSelector((state) => state.orderReducer);
	const { showConfirm } = useContext(ConfirmContext);
	const { showAlert } = useContext(AlertContext);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [currentOrder, setCurrentOrder] = useState(null);
	const viewAction = (data) => {
		setCurrentOrder(data);
		setIsOpenModal(true);
	};
	const editAction = (data) => {
		setCurrentOrder(data);
		setIsOpenModal(true);
	};
	const removeAction = (data) => {
		showConfirm(
			"Xác nhận xóa đơn hàng",
			"Bạn có chắc chắn muốn xóa đơn hàng này không?",
			async () => handleRemove(data)
		);
	};
	const handleRemove = (data) => {
		dispatch(
			orderActions.deleteOrder(data.id, {
				success: () => {
					handleGetOrders();
					showAlert("success", "Xóa thành công");
				},
				failed: (err) => {
					showAlert("error", err ? err : "Có lỗi xảy ra");
				},
			})
		);
	};
	const configColumns = [
		{ label: "Người nhận", id: "buyerName" },
		{ label: "Điện thoại", id: "phoneNumber" },
		{ label: "Số sản phẩm", id: "products.length" },
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
				<ListActionButtonInTable
					data={data}
					viewAction={viewAction}
					editAction={editAction}
					removeAction={removeAction}
				></ListActionButtonInTable>
			),
		},
	];
	const [query, setQuery] = useState({
		page: 1,
		populate: "products.productId",
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
	}, [dispatch]);

	return (
		<LayoutAdmin>
			<Typography variant="h4">Danh sách đơn hàng</Typography>
			<CustomTable
				data={orders.results}
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
