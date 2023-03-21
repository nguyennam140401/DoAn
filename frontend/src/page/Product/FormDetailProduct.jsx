import {
	Box,
	Button,
	Dialog,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import DetailParamInfo from "component/DetailParamInfo";
import { Formik } from "formik";
import queryString from "query-string";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "Redux/Actions";
import * as yup from "yup";
import Select from "react-select";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BoxAddImage from "component/BoxAddImage";
import { getBase64 } from "common";
import useDebounce from "hooks/3-useDebounce/useDebounce";
import { removeEmpty } from "common";
import { productActions } from "Redux/Actions";
import { BASE_API } from "Services/ServiceURL";
import { AlertContext } from "context/AlertContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const FormDetailProduct = ({ isOpen, detailProduct, isEdit, handleClose }) => {
	const { showAlert } = useContext(AlertContext);
	const dispatch = useDispatch();
	const { categories } = useSelector((state) => state.categoryReducer);
	const [options, setOptions] = useState([]);
	const [arrImage, setArrImage] = useState([]);
	const [strNameCategory, setStrNameCategory] = useState("");
	const formSchema = yup.object({
		name: yup.string().required("Tên sản phẩm không được để trống"),
		brand: yup.string(),
		description: yup.string().required("Mô tả sản phẩm không được để trống"),
		price: yup.number().required("Giá sản phẩm"),
		release_date: yup.string(),
		specs: yup.array(),
		star: yup.number().default(0),
		review: yup.array().default([]),
		images: yup.array().required("Sản phẩm phải có ít nhất 1 hình ảnh"),
		category: yup.object().required("Loại sản phẩm không được để trống"),
	});
	const initData = detailProduct
		? detailProduct
		: {
				name: "",
				description: "",
				images: [],
				category: "",
		  };
	useDebounce(
		() => {
			handleGetCategories(strNameCategory);
		},
		500,
		[strNameCategory]
	);
	useEffect(() => {
		handleGetCategories();
	}, []);

	useEffect(() => {
		if (detailProduct) {
			setArrImage(detailProduct.images);
		}
	}, [detailProduct, isOpen]);

	useEffect(() => {
		setOptions(
			categories.results.map((item) => ({
				value: item.id,
				label: item.name,
			}))
		);
	}, [categories]);
	const submit = (data) => {
		data.category = data?.category?.id || data?.category?.value;
		const { id, ...payload } = data;
		!detailProduct
			? dispatch(
					productActions.createProduct(payload, {
						success: (res) => {
							showAlert("success", "Thêm sản phẩm thành công");
							handleClose(true);
						},
						error: (err) => {
							console.log(err);
						},
					})
			  )
			: dispatch(
					productActions.updateProduct(id, payload, {
						success: (res) => {
							showAlert("success", "Cập nhật sản phẩm thành công");
							handleClose(true);
						},
						error: (err) => {
							console.log(err);
						},
					})
			  );
	};

	const handleGetCategories = (name) => {
		const payload = {
			name: name,
			populate: "childrentIds",
		};
		dispatch(
			categoryActions.getCategories(queryString.stringify(removeEmpty(payload)))
		);
	};
	return (
		<Dialog
			maxWidth="lg"
			open={isOpen}
			onClose={() => {
				handleClose();
				setArrImage([]);
			}}
			fullWidth
		>
			<Box p={3}>
				<Formik
					initialValues={initData}
					onSubmit={submit}
					validationSchema={formSchema}
				>
					{({
						handleChange,
						handleBlur,
						values,
						handleSubmit,
						errors,
						touched,
						setFieldValue,
					}) => (
						<>
							<Box mb={2}>
								<TextField
									fullWidth
									variant="outlined"
									label="Tên sản phẩm"
									name="name"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.name && touched.name}
									helperText={errors.name && touched.name}
								/>
							</Box>
							<Box mb={2}>
								<FormControl fullWidth sx={{ m: 1 }}>
									<InputLabel htmlFor="outlined-adornment-amount">
										Giá
									</InputLabel>
									<OutlinedInput
										id="outlined-adornment-amount"
										startAdornment={
											<InputAdornment position="start">$</InputAdornment>
										}
										type="number"
										label="Giá"
										name="price"
										value={values.price}
										onChange={handleChange}
										onBlur={handleBlur}
										error={errors.price && touched.price}
										//helperText={errors.price && touched.price}
									/>
								</FormControl>
							</Box>
							<Box mb={2} display="flex" gap={2} flexWrap="wrap">
								{arrImage?.map((image, index) => (
									<BoxAddImage
										handleRemove={() => {
											arrImage.splice(index, 1);
											setFieldValue("images", arrImage);
										}}
										key={index}
										src={
											image.includes("base64") ? image : BASE_API + "/" + image
										}
										alt="ảnh sản phẩm"
									/>
								))}
								<label htmlFor="imageProduct">
									<BoxAddImage title="Thêm ảnh"></BoxAddImage>
								</label>
								<input
									type={"file"}
									hidden
									name="images"
									accept=".png,.img,.jpg,.jpeg,.gif"
									id="imageProduct"
									onChange={(e) => {
										const newImage = e.target.files[0];
										getBase64(newImage, (result) => {
											setArrImage((state) => [...state, result]);
											setFieldValue(
												"images",
												values?.images
													? [...values.images, e.target.files[0]]
													: [e.target.files[0]]
											);
										});
									}}
								/>
							</Box>
							<Box mb={2}>
								<Select
									options={options}
									defaultValue={
										detailProduct
											? options.find(
													(item) => item.value === detailProduct?.category?.id
											  )
											: null
									}
									onInputChange={(data) => {
										setStrNameCategory(data);
									}}
									onChange={(data) => {
										setFieldValue("category", data);
										setFieldValue(
											"specs",
											categories.results.find((item) => item.id === data.value)
												.specs
										);
									}}
								/>
							</Box>
							<Box mb={2}>
								<ReactQuill
									theme="snow"
									value={values.description}
									onChange={(event) => {
										setFieldValue("description", event);
									}}
								/>
							</Box>
							<Box mb={2}>
								<Typography variant="h5">Các trường sản phẩm</Typography>
								{values?.specs?.length > 0 &&
									values.specs.map((option, idx) => (
										<DetailParamInfo
											key={idx}
											isSetValueProduct={true}
											idx={idx}
											optionsData={values.specs}
											data={option}
											setFieldValue={setFieldValue}
											fieldSet="specs"
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

							<Box mb={2} textAlign="center">
								<Button
									variant="contained"
									onClick={() => {
										handleSubmit();
									}}
								>
									{detailProduct ? "Cập nhật" : "Thêm"}
								</Button>
							</Box>
						</>
					)}
				</Formik>
			</Box>
		</Dialog>
	);
};

export default FormDetailProduct;
