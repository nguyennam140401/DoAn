import {
	Box,
	Button,
	Collapse,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Skeleton,
	Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "Redux/Actions";
import LayoutAdmin from "../LayoutAdmin";
import queryString from "query-string";
import FormDetailCategory from "./FormDetailCategory";
import { Add, Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
import { AlertContext } from "context/AlertContext";
import { ConfirmContext } from "context/ConfirmContext";
const Category = () => {
	const { showAlert } = useContext(AlertContext);
	const { showConfirm } = useContext(ConfirmContext);
	const dispatch = useDispatch();
	const { categories, isGetCategories } = useSelector(
		(state) => state.categoryReducer
	);
	const [currentCategory, setCurrentCategory] = useState(null);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const query = {
		populate: "childrentIds.childrentIds.childrentIds",
		level: 0,
	};
	useEffect(() => {
		handleGetCategories();
	}, [dispatch]);
	const handleGetCategories = (params = query) => {
		dispatch(categoryActions.getCategories(queryString.stringify(params)));
	};
	const openFormDetail = (category = undefined) => {
		setIsOpenModal(true);
		setCurrentCategory(category);
	};
	const closeFormDetail = () => {
		setIsOpenModal(false);
		setCurrentCategory(null);
	};
	const handleRemove = (id) => {
		console.log(id, "oke");
		showConfirm(
			"Xác nhận xóa phân quyền",
			"Bạn có chắc chắn muốn xóa phân quyền này không?",
			() => {
				dispatch(
					categoryActions.deleteCategory(id, {
						success: () => {
							handleGetCategories();
							showAlert("success", "Xóa thành công");
						},
						failed: (err) => {
							showAlert("error", err ? err : "Có lỗi xảy ra");
						},
					})
				);
			}
		);
	};
	const handleAdd = () => {};
	return (
		<LayoutAdmin>
			<Typography variant="h4">Danh mục sản phẩm</Typography>
			<Box justifyContent={"flex-end"} display={"flex"} my={2}>
				<Button
					variant="contained"
					onClick={() => {
						openFormDetail();
					}}
				>
					Thêm mới
				</Button>
			</Box>

			<List>
				{isGetCategories ? (
					<ListCategoryLoading></ListCategoryLoading>
				) : categories.results.length > 0 ? (
					categories.results.map((item, idx) => (
						<RowCategory
							openDetail={openFormDetail}
							data={item}
							key={idx}
							removeAction={handleRemove}
							addAction={handleAdd}
						></RowCategory>
					))
				) : (
					<Typography textAlign={"center"}>Không có dữ liệu</Typography>
				)}
			</List>
			<FormDetailCategory
				isOpen={isOpenModal}
				detailCategory={currentCategory}
				handleClose={closeFormDetail}
			></FormDetailCategory>
		</LayoutAdmin>
	);
};

const ListCategoryLoading = () => {
	return (
		<>
			<Skeleton width={700} height={30}></Skeleton>
			<Skeleton width={700} height={30}></Skeleton>
			<Skeleton width={700} height={30}></Skeleton>
			<Skeleton width={700} height={30}></Skeleton>
			<Skeleton width={700} height={30}></Skeleton>
		</>
	);
};

const RowCategory = ({ data, openDetail, removeAction, addAction }) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => {
		setIsOpen((state) => !state);
	};
	return (
		<>
			<ListItemButton>
				{data?.childrentIds?.length <= 0 ? (
					<></>
				) : isOpen ? (
					<IconButton onClick={toggleOpen}>
						<ExpandLess />
					</IconButton>
				) : (
					<IconButton onClick={toggleOpen}>
						<ExpandMore />
					</IconButton>
				)}
				<ListItemText
					onDoubleClick={() => {
						openDetail(data);
					}}
					primary={data?.name}
				/>
				<IconButton onClick={addAction}>
					<Add />
				</IconButton>
				<IconButton
					onClick={() => {
						removeAction(data.id);
					}}
				>
					<Delete />
				</IconButton>
			</ListItemButton>
			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{data?.childrentIds?.length > 0 &&
						data?.childrentIds.map((item, idx) => (
							<Box ml={4} key={idx}>
								<RowCategory
									data={item}
									openDetail={openDetail}
									sx={{ ml: 4 }}
									removeAction={removeAction}
									addAction={addAction}
								>
									<ListItemText key={idx} primary={item.name} />
								</RowCategory>
							</Box>
						))}
				</List>
			</Collapse>
		</>
	);
};
export default Category;
