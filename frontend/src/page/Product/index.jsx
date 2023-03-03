import { Box, Button, Typography } from "@mui/material";
import CustomTable from "component/CustomTable";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "Redux/Actions";
import LayoutAdmin from "../LayoutAdmin";
import queryString from "query-string";
import FormDetailProduct from "./FormDetailProduct";
import ListActionButtonInTable from "component/ListActionButtonInTable";
import { ConfirmContext } from "context/ConfirmContext";
import { AlertContext } from "context/AlertContext";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { BASE_API } from "Services/ServiceURL";
const Product = () => {
	const dispatch = useDispatch();
	const { products, isGetProducts } = useSelector(
		(state) => state.productReducer
	);
	const { showConfirm } = useContext(ConfirmContext);
	const { showAlert } = useContext(AlertContext);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [currentProduct, setCurrentProduct] = useState(null);
	const viewAction = (e, data) => {
		setCurrentProduct(data);
		setIsOpenModal(true);
	};
	const editAction = (data) => {
		setCurrentProduct(data);
		setIsOpenModal(true);
	};
	const removeAction = (data) => {
		showConfirm(
			"Xác nhận xóa sản phẩm",
			"Bạn có chắc chắn muốn xóa sản phẩm này không?",
			async () => handleRemove(data)
		);
	};
	const handleRemove = (data) => {
		dispatch(
			productActions.deleteProduct(data.id, {
				success: () => {
					handleGetProducts();
					showAlert("success", "Xóa thành công");
				},
				failed: (err) => {
					showAlert("error", err ? err : "Có lỗi xảy ra");
				},
			})
		);
	};
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
		populate: "category",
	});
	const closeFormDetail = (isSubmit = false) => {
		setCurrentProduct(undefined);
		setIsOpenModal(false);
		if (isSubmit) {
			handleGetProducts();
		}
	};
	const handleGetProducts = (data = query) => {
		dispatch(productActions.getProducts(queryString.stringify(data), {}));
	};
	useEffect(() => {
		handleGetProducts();
	}, [dispatch]);

	return (
		<LayoutAdmin>
			<Typography variant="h4">Danh sách sản phẩm</Typography>
			<Box my={2} display="flex" justifyContent={"right"}>
				<Button
					variant="contained"
					onClick={() => {
						setIsOpenModal(true);
					}}
				>
					Thêm mới
				</Button>
			</Box>
			<CustomTable
				data={products.results}
				totalResults={products.totalResults}
				columns={configColumns}
				currentPage={products.page}
				isPending={isGetProducts}
				handleGetData={handleGetProducts}
				populate={"category"}
			></CustomTable>

			<FormDetailProduct
				isOpen={isOpenModal}
				detailProduct={currentProduct}
				handleClose={closeFormDetail}
			/>
		</LayoutAdmin>
	);
};

export default Product;
