import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomTable from "component/CustomTable";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { brandActions } from "Redux/Actions";
import LayoutAdmin from "../LayoutAdmin";
import ListActionButtonInTable from "component/ListActionButtonInTable";
import FormDetailBrand from "./FormDetailBrand";
import { ConfirmContext } from "context/ConfirmContext";
import { AlertContext } from "context/AlertContext";
import { FormStateEnum } from "enum/StatusEnum";
import queryString from "query-string";
const Brand = () => {
	const dispatch = useDispatch();
	const [isOpenFormDetail, setIsOpenFormDetail] = useState(false);
	const { brands, isGetBrands } = useSelector((state) => state.brandReducer);
	const { showConfirm } = useContext(ConfirmContext);
	const { showAlert } = useContext(AlertContext);
	const [currentBrand, setCurrentBrand] = useState(null);
	const [formState, setFormState] = useState(FormStateEnum.View);

	const openForm = (formData = null, formState = FormStateEnum.Add) => {
		setCurrentBrand(formData);
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
			"Xác nhận xóa hãng sản xuất",
			"Bạn có chắc chắn muốn xóa hãng sản xuất này không?",
			async () => handleRemove(data)
		);
	};
	const handleRemove = (data) => {
		dispatch(
			brandActions.deleteBrand(data.id, {
				success: () => {
					handleGetBrands();
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
			label: "Mô tả",
			id: "description",
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
		populate: "",
	});
	const handleGetBrands = (data = query) => {
		dispatch(
			brandActions.getBrands(queryString.stringify(data), {
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
			await handleGetBrands();
		};
		handle();
	}, [dispatch]);
	return (
		<LayoutAdmin>
			<Typography variant="h4">Danh sách hãng sản xuất</Typography>
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
				data={brands.results}
				columns={configColumns}
				isPending={isGetBrands}
				handleGetData={handleGetBrands}
				totalResults={brands.totalResults}
				currentPage={brands.page}
				queryProps={query}
			></CustomTable>
			<FormDetailBrand
				isOpen={isOpenFormDetail}
				handleClose={() => {
					setIsOpenFormDetail(false);
					setCurrentBrand(null);
				}}
				formState={formState}
				data={currentBrand}
			/>
		</LayoutAdmin>
	);
};

export default Brand;
