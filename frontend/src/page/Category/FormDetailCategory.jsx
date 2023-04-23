import {
	Button,
	Dialog,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { removeEmpty } from "common";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { categoryActions } from "Redux/Actions";
import * as yup from "yup";
import queryString from "query-string";
import DetailParamInfo from "component/DetailParamInfo";
import { FormStateEnum } from "enum/StatusEnum";
const FormDetailCategory = ({
	isOpen,
	detailCategory,
	formState,
	handleClose,
}) => {
	const dispatch = useDispatch();

	console.log(detailCategory);
	const dataDetail =
		formState !== FormStateEnum.Add
			? detailCategory
			: detailCategory
			? { parentId: detailCategory.id, specs: detailCategory.specs }
			: {
					name: "",
					parentId: "",
					specs: [],
			  };
	const formSchema = yup.object({
		name: yup.string().required("Bạn phải điền tên sản phẩm"),
	});

	const handleSubmit = (data) => {
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});
		if (formState === FormStateEnum.Add) {
			dispatch(
				categoryActions.createCategory(removeEmpty(data), {
					success: (data) => {
						handleClose();
						dispatch(
							categoryActions.getCategories(
								queryString.stringify({ populate: "childrentIds", level: 0 })
							)
						);
					},
					failed: (err) => {
						console.log(err);
					},
				})
			);
		} else {
			const { id, ...payload } = data;
			payload.childrentIds = payload.childrentIds.map((item) => item.id);
			dispatch(
				categoryActions.updateCategory(id, removeEmpty(payload), {
					success: (data) => {
						handleClose();
						dispatch(
							categoryActions.getCategories(
								queryString.stringify({ populate: "childrentIds", level: 0 })
							)
						);
					},
					failed: (err) => {
						console.log(err);
					},
				})
			);
		}
	};
	return (
		<Dialog open={isOpen} onClose={handleClose} fullWidth>
			<Box p={3}>
				<Formik
					initialValues={dataDetail}
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
					}) => {
						return (
							<>
								<Box mb={2}>
									<TextField
										fullWidth
										variant="outlined"
										label="Tên danh mục"
										name="name"
										value={values.name}
										onChange={handleChange}
										onBlur={handleBlur}
										error={errors.name && touched.name}
										helperText={errors.name && touched.name}
									></TextField>
								</Box>
								<Box mb={2}>
									<Typography variant="h5">Các trường sản phẩm</Typography>
									{values?.specs?.length > 0 &&
										values.specs.map((item, idx) => (
											<DetailParamInfo
												key={idx}
												idx={idx}
												optionsData={values.specs}
												data={item}
												fieldSet={"specs"}
												setFieldValue={setFieldValue}
											></DetailParamInfo>
										))}
								</Box>
								<Box position={"relative"} mb={2} minHeight={30}>
									<Box position={"absolute"} bottom={0} right={0}>
										<IconButton
											onClick={() => {
												setFieldValue(
													"specs",
													values?.specs
														? [...values?.specs, { name: "", unit: "" }]
														: [{ name: "", unit: "" }]
												);
											}}
										>
											<AddCircleIcon />
										</IconButton>
									</Box>
								</Box>
								<Button onClick={handleSubmit} variant="contained">
									{formState === FormStateEnum.Add ? "Thêm" : "Cập nhật"}
								</Button>
							</>
						);
					}}
				</Formik>
			</Box>
		</Dialog>
	);
};

export default FormDetailCategory;
