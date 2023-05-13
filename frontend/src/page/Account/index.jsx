import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomTable from "component/CustomTable";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accountActions } from "Redux/Actions";
import LayoutAdmin from "../LayoutAdmin";
import ListActionButtonInTable from "component/ListActionButtonInTable";
import FormDetailAccount from "./FormDetailAccount";
import { ConfirmContext } from "context/ConfirmContext";
import { AlertContext } from "context/AlertContext";
import queryString from "query-string";
import { FormStateEnum } from "enum/StatusEnum";
const Account = () => {
	const dispatch = useDispatch();
	const [formState, setFormState] = useState(FormStateEnum.View);
	const [isOpenFormDetail, setIsOpenFormDetail] = useState(false);
	const { accounts, isGetAccounts } = useSelector(
		(state) => state.accountReducer
	);
	const [query, setQuery] = useState({
		page: 1,
		limit: 10,
		populate: "roleId",
	});
	const { showConfirm } = useContext(ConfirmContext);
	const { showAlert } = useContext(AlertContext);
	const [currentAccount, setCurrentAccount] = useState(null);
	const openForm = (formData, formState) => {
		setIsOpenFormDetail(true);
		setCurrentAccount(formData);
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
			"Xác nhận xóa người dùng",
			"Bạn có chắc chắn muốn xóa người dùng này không?",
			async () => handleRemove(data)
		);
	};
	const handleRemove = (data) => {
		dispatch(
			accountActions.deleteAccount(data.id, {
				success: () => {
					handleGetAccounts();
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
			label: "Email",
			id: "email",
		},
		{
			label: "Vai trò",
			id: "role",
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
	const handleGetAccounts = () => {
		dispatch(
			accountActions.getAccounts(queryString.stringify(query), {
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
			await handleGetAccounts();
		};
		handle();
	}, [dispatch]);
	return (
		<LayoutAdmin>
			<Typography variant="h4">Danh sách tài khoản</Typography>
			<Box my={2} display="flex" justifyContent={"right"}>
				<Button
					variant="contained"
					onClick={() => {
						openForm(null, FormStateEnum.Add);
					}}
				>
					Thêm mới
				</Button>
			</Box>
			<CustomTable
				data={accounts.results}
				columns={configColumns}
				isPending={isGetAccounts}
				handleGetData={handleGetAccounts}
				totalResults={accounts.totalResults}
				currentPage={accounts.page}
			></CustomTable>
			<FormDetailAccount
				isOpen={isOpenFormDetail}
				handleClose={() => {
					setIsOpenFormDetail(false);
					setCurrentAccount(null);
				}}
				data={currentAccount}
				formState={formState}
			/>
		</LayoutAdmin>
	);
};

export default Account;
