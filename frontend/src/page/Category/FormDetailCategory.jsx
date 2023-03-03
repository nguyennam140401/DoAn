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
const FormDetailCategory = ({
	isOpen,
	detailCategory = {
		name: "",
		parentId: "",
		specs: [],
	},
	isEdit = true,
	handleClose,
}) => {
	const dispatch = useDispatch();
	var { categories } = useSelector((state) => state.categoryReducer);
	const [options, setOptions] = useState([]);
	useEffect(() => {
		setOptions(
			categories.results.map((item) => ({ value: item.id, label: item.name }))
		);
	}, [categories]);
	const formSchema = yup.object({
		name: yup.string().required("Bạn phải điền tên sản phẩm"),
	});
	const initialData = detailCategory;
	const handleSubmit = (data) => {
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});
		dispatch(
			categoryActions.createCategory(removeEmpty(data), {
				success: (data) => {
					handleClose();
					dispatch(
						categoryActions.getCategories(
							queryString.stringify({ populate: "childrentIds" })
						)
					);
				},
				failed: (err) => {
					console.log(err);
				},
			})
		);
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
							<Box mb={2}>
								<Select
									theme={(theme) => ({
										...theme,
										borderRadius: 0,
										colors: {
											...theme.colors,
											primary25: "hotpink",
											primary: "black",
										},
										zIndex: 10,
									})}
									options={options}
									onChange={(data) => {
										setFieldValue("parentId", data.value);
									}}
								/>
							</Box>
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
								Thêm
							</Button>
						</>
					)}
				</Formik>
			</Box>
		</Dialog>
	);
};

export default FormDetailCategory;
