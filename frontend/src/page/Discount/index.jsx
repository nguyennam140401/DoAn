import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomTable from "component/CustomTable";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { discountActions } from "Redux/Actions";
import LayoutAdmin from "../LayoutAdmin";
import ListActionButtonInTable from "component/ListActionButtonInTable";
import FormDetailDiscount from "./FormDetailDiscount";
import { ConfirmContext } from "context/ConfirmContext";
import { AlertContext } from "context/AlertContext";
import { FormStateEnum } from "enum/StatusEnum";
import { formatDate } from "common";
import queryString from "query-string";
const Discount = () => {
	const dispatch = useDispatch();
	const [isOpenFormDetail, setIsOpenFormDetail] = useState(false);
	const { discounts, isGetDiscounts } = useSelector(
		(state) => state.discountReducer
	);
	const { showConfirm } = useContext(ConfirmContext);
	const { showAlert } = useContext(AlertContext);
	const [currentDiscount, setCurrentDiscount] = useState(null);
	const [formState, setFormState] = useState(FormStateEnum.View);

	const openForm = (formData = null, formState = FormStateEnum.Add) => {
		setCurrentDiscount(formData);
		setIsOpenFormDetail(true);
		setFormState(formState);
	};

	const viewAction = (data) => {
		openForm(data, FormStateEnum.View);
	};
	const editAction = (data) => {
		openForm(data, FormStateEnum.Edit);
	};
	const removeAction = (data) => {
		showConfirm(
			"Xác nhận xóa phiếu giảm giá",
			"Bạn có chắc chắn muốn xóa phiếu giảm giá này không?",
			async () => handleRemove(data)
		);
	};
	const handleRemove = (data) => {
		dispatch(
			discountActions.deleteDiscount(data.id, {
				success: () => {
					handleGetDiscounts();
					showAlert("success", "Xóa thành công");
				},
				failed: (err) => {
					showAlert("error", err ? err : "Có lỗi xảy ra");
				},
			})
		);
	};
	const configColumns = [
		{
			label: "Tên",
			id: "name",
		},
		{
			label: "Số lượng",
			id: "quantity",
		},
		{
			label: "Giá trị",
			id: "quantity",
			Cell: ({ data }) => <>{data.amount}</>,
		},
		{
			label: "Thời hạn",
			id: "quantity",
			Cell: ({ data }) => (
				<>
					{formatDate(data.fromDate)} - {formatDate(data.endDate)}
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
	const handleGetDiscounts = (payload) => {
		dispatch(
			discountActions.getDiscounts(queryString.stringify(payload), {
				success: (res) => {
					console.log(res);
				},
				failed: (err) => {
					console.log(err);
				},
			})
		);
	};
	React.useEffect(() => {
		const handle = async function () {
			await handleGetDiscounts();
		};
		handle();
	}, [dispatch]);
	return (
		<LayoutAdmin>
			<Typography variant="h4">Danh sách phiếu giảm giá</Typography>
			<Box my={2} display="flex" justifyContent={"right"}>
				<Button
					variant="contained"
					onClick={() => {
						openForm();
					}}
				>
					Thêm mới
				</Button>
			</Box>
			<CustomTable
				data={discounts.results}
				columns={configColumns}
				isPending={isGetDiscounts}
				handleGetData={handleGetDiscounts}
				totalResults={discounts.totalResults}
				currentPage={discounts.page}
			></CustomTable>
			<FormDetailDiscount
				isOpen={isOpenFormDetail}
				handleClose={() => {
					setIsOpenFormDetail(false);
					setCurrentDiscount(null);
				}}
				formState={formState}
				data={currentDiscount}
			/>
		</LayoutAdmin>
	);
};

export default Discount;
