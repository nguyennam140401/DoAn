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
const Account = () => {
	const dispatch = useDispatch();
	const [isOpenFormDetail, setIsOpenFormDetail] = useState(false);
	const { accounts, isGetAccounts } = useSelector(
		(state) => state.accountReducer
	);
	const { showConfirm } = useContext(ConfirmContext);
	const { showAlert } = useContext(AlertContext);
	const [currentAccount, setCurrentAccount] = useState(null);
	const viewAction = (e, data) => {
		setCurrentAccount(data);
		setIsOpenFormDetail(true);
	};
	const editAction = (data) => {
		setCurrentAccount(data);
		setIsOpenFormDetail(true);
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
			accountActions.getAccounts("", {
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
				<Button variant="contained" onClick={() => setIsOpenFormDetail(true)}>
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
			/>
		</LayoutAdmin>
	);
};

export default Account;
