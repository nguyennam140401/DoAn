import {
	Button,
	Dialog,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Switch,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React, { useContext } from "react";
import { listRole } from "./roleData";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { roleActions } from "Redux/Actions";
import { AlertContext } from "context/AlertContext";
import { StatusColorEnum } from "enum/StatusEnum";
import queryString from "query-string";
import { initialQuery } from "utils/initData";

const FormDetailRole = ({
	isOpen,
	handleClose,
	detailRole = { name: "", permission: [] },
	isEdit = true,
}) => {
	const { showAlert } = useContext(AlertContext);
	const dispatch = useDispatch();
	const objectSchema = yup.object({
		name: yup.string().required("Tên quyền không được để trống"),
		permission: yup.array(),
	});
	const submit = (data) => {
		if (!data.id) {
			dispatch(
				roleActions.createRole(data, {
					success: () => {
						showAlert(StatusColorEnum.Success, "Thêm quyền thành công");
						dispatch(roleActions.getRoles(queryString.stringify(initialQuery)));
						handleClose();
					},
					failed: (err) => {
						showAlert(StatusColorEnum.Failed, "Thêm quyền thất bại : " + err);
					},
				})
			);
		} else {
			const { id, ...payload } = data;
			dispatch(
				roleActions.updateRole(id, payload, {
					success: () => {
						showAlert(StatusColorEnum.Success, "Cập nhật quyền thành công");
						dispatch(roleActions.getRoles(queryString.stringify(initialQuery)));
						handleClose();
					},
					failed: (err) => {
						showAlert(
							StatusColorEnum.Failed,
							"Cập nhật quyền thất bại : " + err
						);
					},
				})
			);
		}
	};
	return (
		<Dialog maxWidth={"md"} open={isOpen} onClose={handleClose}>
			<Box p={3}>
				<Formik
					onSubmit={submit}
					initialValues={detailRole}
					validationSchema={objectSchema}
				>
					{({
						values,
						handleBlur,
						handleChange,
						handleSubmit,
						errors,
						touched,
						setFieldValue,
					}) => (
						<>
							<Box mb={2}>
								<TextField
									fullWidth
									label="Tên quyền"
									value={values.name}
									name="name"
									onBlur={handleBlur}
									onChange={handleChange}
									helperText={touched.name && errors.name}
									error={touched.name && errors.name}
									disabled={!isEdit}
								></TextField>
							</Box>
							<Box mb={2}>
								{Object.keys(listRole).map((item, idx) => (
									<Box key={idx}>
										<RoleDetail
											data={listRole[item]}
											formData={values}
											isEdit={isEdit}
										></RoleDetail>
									</Box>
								))}
							</Box>
							<Box mb={2}>
								{isEdit && (
									<Button variant="contained" onClick={handleSubmit}>
										{detailRole.id ? "Cập nhật" : "Thêm mới"}
									</Button>
								)}
							</Box>
						</>
					)}
				</Formik>
			</Box>
		</Dialog>
	);
};

const RoleDetail = ({ data, formData, isEdit }) => {
	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">{data.name}</FormLabel>
			<FormGroup aria-label="position" row>
				{data?.roles.length > 0 &&
					data?.roles.map((role, idx) => (
						<FormControlLabel
							key={idx}
							value="top"
							control={
								<Switch
									disabled={!isEdit}
									color="primary"
									defaultChecked={
										formData.permission.indexOf(role.value) !== -1
									}
									onChange={() => {
										if (formData.permission.indexOf(role.value) === -1) {
											formData.permission.push(role.value);
										} else {
											formData.permission.splice(
												formData.permission.indexOf(role.value),
												1
											); //deleting
										}
									}}
								/>
							}
							label={role.name}
							labelPlacement="top"
						/>
					))}
			</FormGroup>
		</FormControl>
	);
};
export default FormDetailRole;
