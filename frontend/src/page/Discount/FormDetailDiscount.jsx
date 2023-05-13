import {
	Button,
	Dialog,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { removeEmpty } from "common";
import { AlertContext } from "context/AlertContext";
import { FormStateEnum } from "enum/StatusEnum";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { discountActions } from "Redux/Actions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as yup from "yup";
const FormDetailDiscount = ({
	isOpen,
	data = null,
	handleClose,
	formState,
}) => {
	const { showAlert } = useContext(AlertContext);
	const dispatch = useDispatch();

	const formSchema = yup.object({
		name: yup.string().required("Tên phiếu giảm giá không được để trống"),
		quantity: yup
			.number()
			.required("Số lượng phiếu giảm giá không được để trống"),
		amount: yup.number().required("Giá trị phiếu giảm giá không được để trống"),
		type: yup.number(),
		fromDate: yup
			.date()
			.required("Ngày bắt đầu có hiệu lực không được để trống"),
		endDate: yup.date().required("Ngày kết thúc hiệu lực không được để trống"),
	});
	const initialData = data || {
		name: "",
		fromDate: "",
		type: 0,
		endDate: "",
	};

	const handleResetDiscount = () => {
		dispatch(discountActions.getDiscounts(""));
	};
	const handleSubmit = (dataForm) => {
		console.log(dataForm);
		const { id, ...payload } = dataForm;
		if (!data) {
			dispatch(
				discountActions.createDiscount(removeEmpty(payload), {
					success: () => {
						showAlert("success", "Thêm thành công");
						handleClose();
						handleResetDiscount();
					},
					failed: (err) => {
						showAlert("error", err || "Có lỗi xảy ra");
					},
				})
			);
		} else {
			dispatch(
				discountActions.updateDiscount(data.id, removeEmpty(payload), {
					success: () => {
						showAlert("success", "Sửa thành công");
						handleClose();
						handleResetDiscount();
					},
					failed: (err) => {
						showAlert("error", err || "Có lỗi xảy ra");
					},
				})
			);
		}
	};
	const optionsValue = [
		{ name: "Theo %", value: 0 },
		{ name: "Theo giá tiền", value: 1 },
	];
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
							<Box mb={2}>
								<Typography variant="h5">
									{formState === FormStateEnum.Add
										? "Thêm"
										: formState === FormStateEnum.Edit
										? "Cập nhật"
										: "Chi tiết"}{" "}
									phiếu giảm giá
								</Typography>
							</Box>
							<Box mb={2}>
								<TextField
									disabled={formState === FormStateEnum.View}
									fullWidth
									variant="outlined"
									label="Tên phiếu giảm giá"
									placeholder="Tên phiếu giảm giá"
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
									disabled={formState === FormStateEnum.View}
									fullWidth
									variant="outlined"
									label="Số lượng phiếu giảm giá"
									placeholder="Số lượng phiếu giảm giá"
									name="quantity"
									type="number"
									value={values.quantity}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.quantity && touched.quantity}
									helperText={touched.quantity && errors.quantity}
								></TextField>
							</Box>

							<Box mb={2} display={"flex"} alignItems={"center"}>
								<TextField
									disabled={formState === FormStateEnum.View}
									fullWidth
									variant="outlined"
									label="Giá trị phiếu giảm giá"
									placeholder="Giá trị phiếu giảm giá"
									name="amount"
									type="number"
									value={values.amount}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.amount && touched.amount}
									helperText={touched.amount && errors.amount}
								></TextField>

								<FormControl sx={{ m: 1, width: 300 }}>
									<InputLabel id="demo-multiple-name-label">
										Giảm giá theo
									</InputLabel>
									<Select
										disabled={formState === FormStateEnum.View}
										labelId="demo-multiple-name-label"
										id="demo-multiple-name"
										value={values.type}
										name="type"
										onChange={handleChange}
										onBlur={handleBlur}
										error={errors.type && touched.type}
										helperText={touched.type && errors.type}
										input={<OutlinedInput label="Giảm giá theo" />}
									>
										{optionsValue.map((item, idx) => (
											<MenuItem key={idx} value={item.value}>
												{item.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
							<Box mb={2}>
								<Grid container>
									<Grid item xs={6}>
										<Typography>Ngày có hiệu lực</Typography>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DatePicker
												//value={values.fromDate}
												onChange={(data) => setFieldValue("fromDate", data.$d)}
											/>
										</LocalizationProvider>
									</Grid>
									<Grid item xs={6}>
										<Typography>Ngày hết hạn</Typography>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DatePicker
												// value={values.endDate}
												onChange={(data) => setFieldValue("endDate", data.$d)}
											/>
										</LocalizationProvider>
									</Grid>
								</Grid>
							</Box>
							<Button
								onClick={
									formState === FormStateEnum.View ? handleClose : handleSubmit
								}
								variant="contained"
							>
								{formState === FormStateEnum.Edit
									? "Cập nhật"
									: formState === FormStateEnum.Add
									? "Thêm"
									: "Đóng"}
							</Button>
						</>
					)}
				</Formik>
			</Box>
		</Dialog>
	);
};

export default FormDetailDiscount;
