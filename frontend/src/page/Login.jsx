import {
	Button,
	Card,
	Dialog,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AccountActions from "../Redux/Actions/Account.actions";
const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const loginSchema = Yup.object({
		email: Yup.string()
			.required("Email không được để trống")
			.email("Email sai định dạng"),
		password: Yup.string()
			.required("Mật khẩu không được để trống")
			.min(8, "Mật khẩu cần ít nhất 8 kí tự")
			.matches(/\d/, "Mật khẩu cần ít nhất 1 kí tự số và  kí tự chữ")
			.matches(/[a-zA-Z]/, "Mật khẩu cần ít nhất 1 kí tự số và  kí tự chữ"),
	});
	const formData = {
		email: "",
		password: "",
	};
	const submit = async (data) => {
		await dispatch(
			AccountActions.accountLogin(data, {
				success: (res) => {
					localStorage.setItem("token", res.tokens.access.token);
					localStorage.setItem("role", res.user.role);
					localStorage.setItem("refreshtoken", res.tokens.refresh.token);
					localStorage.setItem("id", res.user.id);
					navigate("/");
				},
				failed: (res) => {},
			})
		);
	};
	return (
		<Paper>
			<Dialog open={true}>
				<Card sx={{ padding: 5 }}>
					<Formik
						initialValues={formData}
						onSubmit={submit}
						validationSchema={loginSchema}
					>
						{({
							touched,
							errors,
							handleChange,
							values,
							handleBlur,
							handleSubmit,
						}) => (
							<>
								<Typography mb={2} alignItems={"center"}>
									{t("CommonI18n.Login")}
								</Typography>
								<TextField
									fullWidth
									placeholder={t("CommonI18n.Form.UserName")}
									label={t("CommonI18n.Form.UserName")}
									name="email"
									variant="outlined"
									onChange={handleChange}
									error={errors.email && touched.email}
									value={values.email}
									onBlur={handleBlur}
									helperText={errors.email}
									className="mb-4"
								></TextField>
								<TextField
									fullWidth
									placeholder={t("CommonI18n.Form.Password")}
									label={t("CommonI18n.Form.Password")}
									type={"password"}
									name="password"
									variant="outlined"
									onChange={handleChange}
									error={errors.password && touched.password}
									value={values.password}
									onBlur={handleBlur}
									helperText={errors.password}
									className="mb-4"
								></TextField>
								<div className="text-center">
									<Button
										variant="contained"
										type="submit"
										onClick={handleSubmit}
									>
										{t("CommonI18n.Login")}
									</Button>
								</div>
							</>
						)}
					</Formik>
				</Card>
			</Dialog>
		</Paper>
	);
};

export default Login;
