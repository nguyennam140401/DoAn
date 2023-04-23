import { Button, Dialog, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getBase64 } from "common";
import { removeEmpty } from "common";
import BoxAddImage from "component/BoxAddImage";
import { AlertContext } from "context/AlertContext";
import { FormStateEnum } from "enum/StatusEnum";
import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { postActions } from "Redux/Actions";
import { BASE_API } from "Services/ServiceURL";
import * as yup from "yup";
const FormDetailPost = ({ isOpen, data = null, handleClose, formState }) => {
	const { showAlert } = useContext(AlertContext);
	const dispatch = useDispatch();
	const [arrImage, setArrImage] = useState(null);
	const formSchema = yup.object({
		name: yup.string().required("Tên bài viết không được để trống"),
		description: yup
			.string()
			.required("Mô tả cho bài viết không được để trống"),
	});
	const initialData = data || {
		name: "",
		images: null,
		description: "",
	};
	const handleResetPost = () => {
		dispatch(postActions.getPosts(""));
	};
	const handleSubmit = (post) => {
		const payload = post;
		if (!Array.isArray(payload.images)) payload.images = [payload.images];
		if (!data) {
			dispatch(
				postActions.createPost(removeEmpty(payload), {
					success: () => {
						showAlert("success", "Thêm thành công");
						handleClose();
						handleResetPost();
					},
					failed: (err) => {
						showAlert("error", err || "Có lỗi xảy ra");
					},
				})
			);
		} else {
			dispatch(
				postActions.updatePost(data.id, removeEmpty(payload), {
					success: () => {
						showAlert("success", "Sửa thành công");
						handleClose();
						handleResetPost();
					},
					failed: (err) => {
						showAlert("error", err || "Có lỗi xảy ra");
					},
				})
			);
		}
	};
	useEffect(() => {
		if (data) {
			setArrImage(data.image);
		} else {
			setArrImage(null);
		}
	}, [data, isOpen]);
	return (
		<Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="lg">
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
								<TextField
									disabled={formState === FormStateEnum.View}
									fullWidth
									variant="outlined"
									label="Tên bài viết"
									placeholder="Tên bài viết"
									name="name"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.name && touched.name}
									helperText={touched.name && errors.name}
								></TextField>
							</Box>
							<Box mb={2} display="flex" gap={2} flexWrap="wrap">
								{arrImage && (
									<BoxAddImage
										isView={formState === FormStateEnum.View}
										src={
											arrImage.includes("base64")
												? arrImage
												: BASE_API + "/" + arrImage
										}
										alt="ảnh sản phẩm"
									/>
								)}

								<label htmlFor="imageProduct">
									{formState !== FormStateEnum.View && (
										<BoxAddImage name="Chọn ảnh bài viết"></BoxAddImage>
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
											setArrImage(result);
											setFieldValue("images", e.target.files[0]);
										});
									}}
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

export default FormDetailPost;
