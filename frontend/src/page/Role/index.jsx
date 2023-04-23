import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomTable from "component/CustomTable";
import ListActionButtonInTable from "component/ListActionButtonInTable";
import { AlertContext } from "context/AlertContext";
import { ConfirmContext } from "context/ConfirmContext";
import LayoutAdmin from "page/LayoutAdmin";
import queryString from "query-string";
import React, { useContext } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleActions } from "Redux/Actions";
import { initialQuery } from "utils/initData";
import FormDetailRole from "./FormDetailRole";

const Role = () => {
	const { showAlert } = useContext(AlertContext);
	const { showConfirm } = useContext(ConfirmContext);
	const dispatch = useDispatch();
	const [currentRole, setCurrentRole] = useState();
	const { roles, isGetRoles } = useSelector((state) => state.roleReducer);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isEditModal, setIsEditModal] = useState(true);
	const closeFormDetail = () => {
		setIsOpenModal(false);
		setCurrentRole(undefined);
		setIsEditModal(true);
	};
	const handleGetRoles = () => {
		dispatch(roleActions.getRoles(queryString.stringify(initialQuery)));
	};
	const viewAction = (data) => {
		setIsOpenModal(true);
		setCurrentRole(data);
		setIsEditModal(false);
	};
	const editAction = (data) => {
		setIsOpenModal(true);
		setCurrentRole(data);
	};
	const removeAction = (data) => {
		showConfirm(
			"Xác nhận xóa phân quyền",
			"Bạn có chắc chắn muốn xóa phân quyền này không?",
			async () => handleRemove(data)
		);
	};
	const handleRemove = (data) => {
		dispatch(
			roleActions.deleteRole(data.id, {
				success: () => {
					handleGetRoles();
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
			label: "Tên quyền",
			id: "name",
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
	return (
		<LayoutAdmin>
			<Typography variant="h4">Danh sách phân quyền</Typography>
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
				data={roles.results}
				totalResults={roles.totalResults}
				columns={configColumns}
				currentPage={roles.page}
				isPending={isGetRoles}
				handleGetData={handleGetRoles}
				populate={"category"}
			></CustomTable>
			<FormDetailRole
				isOpen={isOpenModal}
				detailRole={currentRole}
				handleClose={closeFormDetail}
				isEdit={isEditModal}
			/>
		</LayoutAdmin>
	);
};

export default Role;
