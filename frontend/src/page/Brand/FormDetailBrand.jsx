import { Button, Dialog, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { removeEmpty } from "common";
import { AlertContext } from "context/AlertContext";
import { FormStateEnum } from "enum/StatusEnum";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { brandActions } from "Redux/Actions";
import * as yup from "yup";
const FormDetailBrand = ({ isOpen, data = null, handleClose, formState }) => {
	console.log(data);
	const { showAlert } = useContext(AlertContext);
	const dispatch = useDispatch();

	const formSchema = yup.object({
		name: yup.string().required("Tên hãng sản xuất không được để trống"),
		description: yup
			.string()
			.required("Mô tả cho hãng sản xuất không được để trống"),
	});
	const initialData = data || {
		name: "",
		description: "",
	};
	const getDataUser = (data) => {
		return {
			name: data.name,
			description: data.description,
		};
	};
	const handleResetBrand = () => {
		dispatch(brandActions.getBrands(""));
	};
	const handleSubmit = (user) => {
		const payload = getDataUser(user);
		if (!data) {
			dispatch(
				brandActions.createBrand(removeEmpty(payload), {
					success: () => {
						showAlert("success", "Thêm thành công");
						handleClose();
						handleResetBrand();
					},
					failed: (err) => {
						showAlert("error", err || "Có lỗi xảy ra");
					},
				})
			);
		} else {
			dispatch(
				brandActions.updateBrand(data.id, removeEmpty(payload), {
					success: () => {
						showAlert("success", "Sửa thành công");
						handleClose();
						handleResetBrand();
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
					}) => (
						<>
							<Box mb={2}>
								<Typography variant="h5">
									{formState === FormStateEnum.Add
										? "Thêm"
										: formState === FormStateEnum.Edit
										? "Cập nhật"
										: "Chi tiết"}{" "}
									hãng sản xuất
								</Typography>
							</Box>
							<Box mb={2}>
								<TextField
									disabled={formState === FormStateEnum.View}
									fullWidth
									variant="outlined"
									label="Tên hãng"
									placeholder="Tên hãng"
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
									disabled={formState === FormStateEnum.View}
									variant="outlined"
									label="Mô tả"
									placeholder="Mô tả"
									name="description"
									value={values.description}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.description && touched.description}
									helperText={touched.description && errors.description}
									multiline
									rows={5}
									maxRows={5}
								></TextField>
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

export default FormDetailBrand;
