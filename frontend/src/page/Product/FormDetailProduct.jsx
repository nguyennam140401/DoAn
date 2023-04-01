import {
	Autocomplete,
	Box,
	Button,
	Dialog,
	FormControl,
	Grid,
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BoxAddImage from "component/BoxAddImage";
import { getBase64 } from "common";
import useDebounce from "hooks/3-useDebounce/useDebounce";
import { removeEmpty } from "common";
import { productActions } from "Redux/Actions";
import { BASE_API } from "Services/ServiceURL";
import { AlertContext } from "context/AlertContext";
import ReactQuill from "react-quill";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-quill/dist/quill.snow.css";
import { FormStateEnum } from "enum/StatusEnum";
const FormDetailProduct = ({
	isOpen,
	detailProduct,
	formState,
	handleClose,
}) => {
	console.log(formState);
	const { showAlert } = useContext(AlertContext);
	const dispatch = useDispatch();
	const { categories } = useSelector((state) => state.categoryReducer);
	const [options, setOptions] = useState([]);
	const [arrImage, setArrImage] = useState([]);
	const [strNameCategory, setStrNameCategory] = useState("");
	const formSchema = yup.object({
		name: yup.string().required("Tên sản phẩm không được để trống"),
		code: yup.string().required("Mã sản phẩm không được để trống"),
		brand: yup.string(),
		description: yup.string().required("Mô tả sản phẩm không được để trống"),
		price: yup.number(),
		release_date: yup.string(),
		specs: yup.array(),
		star: yup.number().default(0),
		review: yup.array().default([]),
		images: yup.array().required("Sản phẩm phải có ít nhất 1 hình ảnh"),
		category: yup.object().required("Loại sản phẩm không được để trống"),
		inventory: yup
			.number()
			.required("Bạn phải nhập số lượng tồn kho của sản phẩm"),
		options: yup.array(),
		priceOrOptions: yup.mixed().when(["price", "options"], {
			is: (price, options) =>
				!price && options.filter((item) => item.price && item.name) === 0,
			then: yup.string().required("Bạn phải nhập giá cho sản phẩm"),
		}),
	});
	const initData = detailProduct
		? detailProduct
		: {
				name: "",
				description: "",
				images: [],
				category: "",
				options: [],
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
		} else {
			setArrImage([]);
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
									disabled={formState === FormStateEnum.View}
									fullWidth
									variant="outlined"
									label="Tên sản phẩm"
									name="name"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.name && touched.name}
									helperText={touched.name && errors.name}
								/>
							</Box>
							<Box mb={2}>
								<TextField
									disabled={formState === FormStateEnum.View}
									fullWidth
									variant="outlined"
									label="Mã sản phẩm"
									name="code"
									value={values.code}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.code && touched.code}
									helperText={touched.code && errors.code}
								/>
							</Box>
							<Box mb={2}>
								{values.options && values.options.length > 0 ? (
									<Grid container rowGap={3}>
										{values.options.map((item, idx) => (
											<Grid item xs={4} key={idx}>
												<Box display={"flex"} alignItems="center">
													<Typography>Lựa chọn {idx + 1}</Typography>
													{formState !== FormStateEnum.View && (
														<IconButton
															onClick={() => {
																const newOptions = [...values.options];
																newOptions.splice(idx, 1);
																setFieldValue("options", newOptions);
															}}
														>
															<DeleteIcon />
														</IconButton>
													)}
												</Box>
												<TextField
													disabled={formState === FormStateEnum.View}
													sx={{ marginBottom: 1 }}
													size="small"
													label="Tên lựa chọn"
													value={item.name}
													onChange={(e) => {
														const newOptions = [...values.options];
														const newVal = item;
														newVal.name = e.target.value;
														newOptions.splice(idx, 1, newVal);
														setFieldValue("options", newOptions);
													}}
												></TextField>

												<TextField
													disabled={formState === FormStateEnum.View}
													sx={{ marginBottom: 1 }}
													size="small"
													label="Giá"
													value={item.price}
													onChange={(e) => {
														const newOptions = values.options;
														const newVal = item;
														newVal.price = e.target.value;
														newOptions.splice(idx, 1, newVal);
														setFieldValue("options", newOptions);
													}}
												></TextField>

												<TextField
													disabled={formState === FormStateEnum.View}
													size="small"
													label="Số lượng hàng "
													value={item.inventory}
													onChange={(e) => {
														const newOptions = values.options;
														const newVal = item;
														newVal.inventory = e.target.value;
														newOptions.splice(idx, 1, newVal);
														setFieldValue("options", newOptions);
													}}
												></TextField>
											</Grid>
										))}
									</Grid>
								) : (
									<>
										<FormControl fullWidth sx={{ m: 1 }}>
											<InputLabel htmlFor="outlined-adornment-amount">
												Giá
											</InputLabel>
											<OutlinedInput
												id="outlined-adornment-amount"
												startAdornment={
													<InputAdornment position="start">$</InputAdornment>
												}
												disabled={formState === FormStateEnum.View}
												type="number"
												label="Giá"
												name="price"
												value={values.price}
												onChange={handleChange}
												onBlur={handleBlur}
												error={errors.price && touched.price}
												helperText={errors.price && touched.price}
											/>
										</FormControl>
										<TextField
											disabled={formState === FormStateEnum.View}
											fullWidth
											variant="outlined"
											label="Số lượng hàng"
											value={values.inventory}
											name="inventory"
											onBlur={handleBlur}
											onChange={handleChange}
										></TextField>
									</>
								)}
								{formState !== FormStateEnum.View && (
									<Button
										variant="outlined"
										sx={{ marginTop: 2 }}
										color="primary"
										onClick={() => {
											const arr = values.options;
											arr.push({ name: "", value: "" });
											setFieldValue("options", arr);
										}}
									>
										Thêm lựa chọn
									</Button>
								)}
							</Box>
							<Box mb={2} display="flex" gap={2} flexWrap="wrap">
								{arrImage?.map((image, index) => (
									<BoxAddImage
										isView={formState === FormStateEnum.View}
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
									{formState !== FormStateEnum.View && (
										<BoxAddImage title="Thêm ảnh"></BoxAddImage>
									)}
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
								<Autocomplete
									disabled={formState === FormStateEnum.View}
									disablePortal
									options={options}
									sx={{ width: 300 }}
									defaultValue={values.category.name}
									onChange={(e, data) => {
										setFieldValue("category", data);
										setFieldValue(
											"specs",
											categories.results.find((item) => item.id === data.value)
												.specs
										);
									}}
									renderInput={(params) => (
										<TextField
											disabled={formState === FormStateEnum.View}
											{...params}
											label="Loại sản phẩm"
										/>
									)}
								/>
							</Box>
							<Box mb={2}>
								<ReactQuill
									readOnly={formState === FormStateEnum.View}
									theme="snow"
									value={values.description}
									onChange={(event) => {
										setFieldValue("description", event);
									}}
								/>
							</Box>
							<Box mb={2}>
								<Typography variant="h5">Thông tin sản phẩm</Typography>
								{values?.specs?.length > 0 &&
									values.specs.map((option, idx) => (
										<DetailParamInfo
											isView={formState === FormStateEnum.View}
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
							{formState !== FormStateEnum.View && (
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
							)}
							<Box mb={2} textAlign="center">
								<Button
									variant="contained"
									onClick={() => {
										if (formState !== FormStateEnum.View) handleSubmit();
										else handleClose();
									}}
								>
									{formState === FormStateEnum.Edit
										? "Cập nhật"
										: formState === FormStateEnum.Add
										? "Thêm"
										: "Đóng"}
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
