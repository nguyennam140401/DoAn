import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomTable from "component/CustomTable";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "Redux/Actions";
import LayoutAdmin from "../LayoutAdmin";
import ListActionButtonInTable from "component/ListActionButtonInTable";
import FormDetailPost from "./FormDetailPost";
import { ConfirmContext } from "context/ConfirmContext";
import { AlertContext } from "context/AlertContext";
import { FormStateEnum } from "enum/StatusEnum";
import { formatDate } from "common";
const Post = () => {
	const dispatch = useDispatch();
	const [isOpenFormDetail, setIsOpenFormDetail] = useState(false);
	const { posts, isGetPosts } = useSelector((state) => state.postReducer);
	const { showConfirm } = useContext(ConfirmContext);
	const { showAlert } = useContext(AlertContext);
	const [currentPost, setCurrentPost] = useState(null);
	const [formState, setFormState] = useState(FormStateEnum.View);

	const openForm = (formData = null, formState = FormStateEnum.Add) => {
		setCurrentPost(formData);
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
			"Xác nhận xóa bài viết",
			"Bạn có chắc chắn muốn xóa bài viết này không?",
			async () => handleRemove(data)
		);
	};
	const handleRemove = (data) => {
		dispatch(
			postActions.deletePost(data.id, {
				success: () => {
					handleGetPosts();
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
			label: "Ngày cập nhật",
			id: "createdDate",
			Cell: ({ data }) => formatDate(data.updatedDate),
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
	const handleGetPosts = () => {
		dispatch(
			postActions.getPosts("", {
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
			await handleGetPosts();
		};
		handle();
	}, [dispatch]);
	return (
		<LayoutAdmin>
			<Typography variant="h4">Danh sách bài viết</Typography>
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
				data={posts.results}
				columns={configColumns}
				isPending={isGetPosts}
				handleGetData={handleGetPosts}
				totalResults={posts.totalResults}
				currentPage={posts.page}
			></CustomTable>
			<FormDetailPost
				isOpen={isOpenFormDetail}
				handleClose={() => {
					setIsOpenFormDetail(false);
					setCurrentPost(null);
				}}
				formState={formState}
				data={currentPost}
			/>
		</LayoutAdmin>
	);
};

export default Post;
