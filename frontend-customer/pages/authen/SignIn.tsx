import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Status } from "../../common/enum";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import { addNotification } from "../../features/application/applicationSlice";
import { useLoginMutation } from "../../features/authen/authenApi";
import { loginSuccess } from "../../features/authen/authenSlice";
type Props = {};

export default function SignIn({}: Props) {
	const [signIn, { isLoading, isError, isSuccess, error }] = useLoginMutation();
	const router = useRouter();
	const dispatch = useDispatch();
	const formSchema = yup.object().shape({
		email: yup
			.string()
			.required("Email không được để trống")
			.email("Email không đúng định dạng"),
		password: yup
			.string()
			.required("Mật khẩu không được để trống")
			.min(8, "Mật khẩu cần ít nhất 8 kí tự")
			.matches(/\d/, "Mật khẩu cần ít nhất 1 kí tự số và  kí tự chữ")
			.matches(/[a-zA-Z]/, "Mật khẩu cần ít nhất 1 kí tự số và  kí tự chữ"),
	});
	const initalValue = {
		email: "",
		password: "",
	};
	const submit = async ({ ...payload }: any) => {
		const res: any = await signIn(payload);
		if (!res.error) {
			dispatch(loginSuccess(res.data));
			dispatch(
				addNotification({
					title: "Thành công",
					description: res?.error?.data?.message || "Đăng nhập thành công",
					status: Status.Success,
				})
			);
			router.push("/");
		} else {
			dispatch(
				addNotification({
					title: "Thất bại",
					description: res?.error?.data?.message || "Đăng nhập thất bại",
					status: Status.Danger,
				})
			);
		}
	};
	return (
		<div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
			{isLoading && <Loading />}
			<div className="w-full py-8">
				<div className="flex items-center justify-center space-x-2">
					<svg
						className="h-16 w-16 text-blue-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							stroke-linejoin="round"
							strokeWidth="2"
							d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
						></path>
					</svg>
					<h1 className="text-3xl font-bold text-blue-600 tracking-wider">
						Template
					</h1>
				</div>
				<div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">
					<h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
						Đăng nhập
					</h2>
					<p className="text-center text-sm text-gray-600 mt-2">
						Bạn chưa có tài khoản?{" "}
						<Link
							href="/authen/SignUp"
							className="text-blue-600 hover:text-blue-700 hover:underline"
							title="Sign In"
						>
							Đăng ký ngay
						</Link>
					</p>

					<Formik
						initialValues={initalValue}
						onSubmit={submit}
						validationSchema={formSchema}
					>
						{({
							values,
							touched,
							errors,
							handleChange,
							handleBlur,
							handleSubmit,
						}) => (
							<>
								<Input
									label="Email"
									placeholder="Email"
									name="email"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
									helpertext={
										touched.email && errors.email ? errors.email : null
									}
									error={errors.email !== "" && touched.email}
								></Input>
								<Input
									type={"password"}
									label="Mật khẩu"
									placeholder="Mật khẩu"
									name="password"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									helpertext={
										touched.password && errors.password ? errors.password : null
									}
									error={errors.password !== "" && touched.password}
								></Input>

								<div className="my-4 flex items-center justify-end space-x-4">
									<button
										type="submit"
										onClick={() => handleSubmit()}
										className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase"
									>
										Đăng nhập
									</button>
								</div>
							</>
						)}
					</Formik>
					<div className="flex items-center justify-between">
						<div className="w-full h-[1px] bg-gray-300"></div>
						<span className="text-sm uppercase mx-6 text-gray-400">Hoặc</span>
						<div className="w-full h-[1px] bg-gray-300"></div>
					</div>

					{/* <div className="text-sm">
                        <a href="#" className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2 bg-gray-100 hover:bg-gray-200 rounded">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 326667 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z" fill="#4285f4"></path><path d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z" fill="#34a853"></path><path d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z" fill="#fbbc04"></path><path d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z" fill="#ea4335"></path></svg>
                            <span>Sign up with Google</span>
                        </a>
                        <a href="#" className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2 bg-gray-100 hover:bg-gray-200 rounded">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 124.8 123.36"><defs><style>.cls-1,.cls-2{fill:none;}.cls-1{clip-rule:evenodd;}.cls-3{clip-path:url(#clip-path);}.cls-4{clip-path:url(#clip-path-2);}.cls-5{fill:#fff;}</style><clipPath id="clip-path" transform="translate(0.69 0.51)"><path className="cls-1" d="M27.75,0H95.13a27.83,27.83,0,0,1,27.75,27.75V94.57a27.83,27.83,0,0,1-27.75,27.74H27.75A27.83,27.83,0,0,1,0,94.57V27.75A27.83,27.83,0,0,1,27.75,0Z"></path></clipPath><clipPath id="clip-path-2" transform="translate(0.69 0.51)"><rect className="cls-2" width="122.88" height="122.31"></rect></clipPath></defs><g className="cls-3"><g className="cls-4"><image width="260" height="257" transform="matrix(0.48, 0, 0, -0.48, 0, 123.36)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAEBCAYAAACexdu5AAAACXBIWXMAABcRAAAXEQHKJvM/AAAEFUlEQVR4Xu3dwXEdIRBFUb4kZ+HwHJbDcxrSeAG+hctVJgDO2cyG9aumoYfX8zzP68evAdzr+fl9jDHG22EdcJGPMcZ4vV6ndcAFPubn+f8q4Aq2DEBmhWDLAAxbBmCzAkGFAKgQgM3qIRxWAVdwygBkVQhyAdBUBDZKAyCaikBmIDxfh2XADda0o50DUFNRhQBoKgIbgQBEIABx7AhEhQBEIACZW4a398My4AYqBCACAYhZBiCrh6BQAFQIwGZOO55WAVewVwDin4pAVlNRIACaisDG689ANBWBeLkJyOoheP0Z8Bw8sNFUBKJCAKKbCEQgAHHsCGQ99npaBtxAaQDEsSMQ045ANBWBqBCAKA2AeA4eiAoBiEAAIhCA6CEAUSEAWcNNcgEwywBs3FQEYpYBiAoByHr9WYUAqBCAzXqXwSkD4KEWYOPqMhDHjkBsGYCYZQCyjh1VCEAXk3QVAT0EYCMQgDh2BLIqBLMMQBXC+2EZcAPTjkD0EICsm4qnZcANlAZAjD8D0VQEoqkIxNVlIEoDIJqKQOY9hNMq4AoqBCB6CEDWL9RMOwIqBGDjbUcgq6noYhJglgHYaCoCWRXC52EZcIP1xyRNRaAK4bAKuIKry0D8IAWIl5uAqBCA+IUakFUh6CoCph2BzbqHYMsAuIcAbGwZgPhBChAVApA17XhaBtxAhQBEIAARCEAEAhCzDEBMOwKxZQAiEIAYbgJilgGILQOQOctwWgVcQQ8BiC0DkPUcvFwA+smql5sALzcBG8NNQGwZgKx/KtoyAO4hABulARBNRSCaikDcQwCiqQjElgHIqhDeD8uAG6xfqKkQADcVgY2mIhBNRSCaikBWhfB5WAbcwCwDEMcLQNax42kZcAMVAhCBAMTFJCDr5Sb3EAA3FYHNPGVQIQBDUxHYuLoMRFMRiKYiEBUCEBeTgDhlADLvIZxWAVfwgxQgtgxANBWBzED4clMR7vZtjOEeArBxUxGIHgIQ/0MAYvwZGLUTD6uAi8xY0EQAhqYisHEPAYimIjDGmEWB8Wcgxp+BOHYEoqkIRFMRGH82C7YMQAw3AfkYY4zH/xDgcnOzoEIAYpYBiKYiEIEAxJYBiAoBiGlHILYMQPxTEYiXm4Dx103F8aa3CDhlADa2DMCwZQD+oUIAxt/jz/9dCNzCb9iBaB4AEQhAzDIAUSEAEQhAnDIAUSEAcTEJiFMGIAIByBpuOqwCrqBCACIQgNgyAFEhAHExCYhAADJvKtoyAEOFAGwEAhCBAEQgAHEPAYgKAYhAACIQgAgEIAIBiEAAIhCACAQgAgGIQAAiEIAIBCACAYhAACIQgAgEIAIBiEAAIhCACAQgAgGIQAAiEIAIBCACAYhAACIQgAgEIAIBiEAAIhCA/AafC2PbZ0osjAAAAABJRU5ErkJggg=="></image></g></g><path className="cls-5" d="M85.36,78.92l2.72-17.76H71V49.63c0-4.86,2.38-9.59,10-9.59H88.8V24.92a94.45,94.45,0,0,0-13.75-1.2c-14,0-23.21,8.5-23.21,23.9V61.16H36.24V78.92h15.6v43.57H71V78.92Z" transform="translate(0.69 0.51)"></path></svg>
                            <span>Sign up with Facebook</span>
                        </a>
                        <a href="#" className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2 bg-gray-100 hover:bg-gray-200 rounded">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.31"><defs><style>.cls-1{fill:#0a66c2;}.cls-1,.cls-2{fill-rule:evenodd;}.cls-2{fill:#fff;}</style></defs><title>linkedin-app</title><path className="cls-1" d="M27.75,0H95.13a27.83,27.83,0,0,1,27.75,27.75V94.57a27.83,27.83,0,0,1-27.75,27.74H27.75A27.83,27.83,0,0,1,0,94.57V27.75A27.83,27.83,0,0,1,27.75,0Z"></path><path className="cls-2" d="M49.19,47.41H64.72v8h.22c2.17-3.88,7.45-8,15.34-8,16.39,0,19.42,10.2,19.42,23.47V98.94H83.51V74c0-5.71-.12-13.06-8.42-13.06s-9.72,6.21-9.72,12.65v25.4H49.19V47.41ZM40,31.79a8.42,8.42,0,1,1-8.42-8.42A8.43,8.43,0,0,1,40,31.79ZM23.18,47.41H40V98.94H23.18V47.41Z"></path></svg>
                            <span>Sign up with LinkedIn</span>
                        </a>
                    </div> */}
				</div>
			</div>
		</div>
	);
}
