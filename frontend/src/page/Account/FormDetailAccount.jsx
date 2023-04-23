import { Autocomplete, Button, Dialog, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { removeEmpty } from "common";
import { AlertContext } from "context/AlertContext";
import { FormStateEnum } from "enum/StatusEnum";
import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { accountActions } from "Redux/Actions";
import { axiosClient } from "Services/axiosClient";
import { roles } from "Services/ServiceURL";
import * as yup from "yup";
const FormDetailAccount = ({
	isOpen,
	data = null,
	isEdit = true,
	formState,
	handleClose,
}) => {
	const { showAlert } = useContext(AlertContext);
	const dispatch = useDispatch();
	const [arrRole, setArrRole] = useState([]);
	useEffect(() => {
		const paramGetRole = {
			limit: 100,
		};
		axiosClient
			.get(roles, { params: paramGetRole })
			.then((res) => setArrRole(res.data.results));
	}, []);

	const formSchema = yup.object({
		email: yup
			.string()
			.email("Không đúng định dạng email")
			.required("Email không được để trống"),
		name: yup.string().required("Tên tài khoản không được để trống"),
		role: yup.string().default("user").required("Quyền không được để trống"),
		password: !data
			? yup
					.string()
					.required("Mật khẩu không được để trống")
					.matches(
						"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$",
						"Mật khẩu phải gồm ít nhất 8 kus tự với ít nhất 1 chữ cái hoa, thường, 1 số , 1 kí tự đặc biệt "
					)
					.oneOf([yup.ref("confirmPassword")], "Mật khẩu không khớp")
			: yup
					.string()
					.matches(
						"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$",
						"Mật khẩu phải gồm ít nhất 8 kus tự với ít nhất 1 chữ cái hoa, thường, 1 số , 1 kí tự đặc biệt "
					),
		confirmPassword: !data
			? yup
					.string()
					.required("Mật khẩu không được để trống")
					.oneOf([yup.ref("password")], "Mật khẩu không khớp")
			: yup.string().oneOf([yup.ref("password")], "Mật khẩu không khớp"),
	});
	const initialData = data || {
		email: "",
		name: "",
		role: "",
		roleId: "",
		password: "",
		confirmPassword: "",
	};
	const getDataUser = (data) => {
		return {
			email: data.email,
			name: data.name,
			role: data.role,
			roleId: data.roleId,
			password: data.password,
		};
	};
	const handleResetAccount = () => {
		dispatch(accountActions.getAccounts(""));
	};
	const handleSubmit = (user) => {
		const payload = getDataUser(user);
		if (!data) {
			dispatch(
				accountActions.createAccount(removeEmpty(payload), {
					success: () => {
						showAlert("success", "Thêm thành công");
						handleClose();
						handleResetAccount();
					},
					failed: (err) => {
						showAlert("error", err || "Có lỗi xảy ra");
					},
				})
			);
		} else {
			dispatch(
				accountActions.updateAccount(data.id, removeEmpty(payload), {
					success: () => {
						showAlert("success", "Sửa thành công");
						handleClose();
						handleResetAccount();
					},
					failed: (err) => {
						showAlert("error", err || "Có lỗi xảy ra");
					},
				})
			);
		}
	};
	return (
		<Dialog open={isOpen} onClose={handleClose} fullWidth>
			<Box p={3}>
				<Formik
					initialValues={initialData}
					onSubmit={handleSubmit}
					validationSchema={formSchema}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						setFieldValue,
					}) => (
						<>
							{/* <Box mb={2}>
								<Select
									defaultInputValue={values.role}
									options={options}
									onChange={(data) => {
										setFieldValue("role", data.value);
									}}
								/>
							</Box> */}
							<Box mb={2}>
								<Autocomplete
									fullWidth
									disabled={formState === FormStateEnum.View}
									disablePortal
									options={arrRole.map((item) => ({
										label: item.name,
										value: item.id,
									}))}
									defaultValue={values.role}
									onChange={(e, data) => {
										console.log(data);
										setFieldValue("role", data.label);
										setFieldValue("roleId", data.value);
									}}
									renderInput={(params) => (
										<TextField
											disabled={formState === FormStateEnum.View}
											{...params}
											label="Phân quyền"
										/>
									)}
								/>
							</Box>
							<Box mb={2}>
								<TextField
									fullWidth
									variant="outlined"
									label="Tên tài khoản"
									placeholder="Tên tài khoản"
									name="name"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.name && touched.name}
									helperText={touched.name && errors.name}
								></TextField>
							</Box>
							<Box mb={2}>
								<TextField
									fullWidth
									variant="outlined"
									label="Email"
									placeholder="Email"
									name="email"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.email && touched.email}
									helperText={touched.email && errors.email}
								></TextField>
							</Box>
							<Box mb={2}>
								<TextField
									fullWidth
									variant="outlined"
									label="Mật khẩu"
									placeholder="Mật khẩu"
									name="password"
									type="password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.password && touched.password}
									helperText={touched.password && errors.password}
								></TextField>
							</Box>
							<Box mb={2}>
								<TextField
									fullWidth
									variant="outlined"
									label="Xác nhận mật khẩu"
									placeholder="Xác nhận mật khẩu"
									name="confirmPassword"
									value={values.confirmPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.confirmPassword && touched.confirmPassword}
									helperText={touched.confirmPassword && errors.confirmPassword}
									type="password"
								></TextField>
							</Box>
							<Button onClick={handleSubmit} variant="contained">
								{data ? "Cập nhật" : "Thêm"}
							</Button>
						</>
					)}
				</Formik>
			</Box>
		</Dialog>
	);
};

export default FormDetailAccount;
