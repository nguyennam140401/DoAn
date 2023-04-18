import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Status } from "../common/enum";
import { ResponseResult } from "../common/model";
import { addNotification } from "../features/application/applicationSlice";
import { useCreateOrderMutation } from "../features/order/orderApi";
import Input from "./Input";
import Loading from "./Loading";
import PopUp from "./PopUp";
type Props = {
	listProduct: Array<any>;
	handleClose: Function;
	isOpen: Boolean;
	discountVoucher: String;
};

export default function FormPayment({
	listProduct,
	handleClose,
	isOpen,
	discountVoucher,
}: Props) {
	const [createOrder, { isLoading, isError, isSuccess, error }] =
		useCreateOrderMutation();
	const dispatch = useDispatch();
	const formSchema = yup.object().shape({
		buyerName: yup.string().required("Tên người nhận hàng không được để trống"),
		address: yup.string().required("Địa chỉ nhận hàng không được để trống"),
		phoneNumber: yup
			.string()
			.required("Số điện thoại người nhận không được để trống")
			.matches(
				/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
				"Số điện thoại không đúng định dạng"
			),
		note: yup.string(),
	});
	const initalValue = {
		buyerName: "",
		address: "",
		note: "",
		phoneNumber: "",
	};
	const submit = async ({ ...payload }: any) => {
		const res: any = await createOrder({
			...payload,
			products: listProduct.map((item) => ({
				...item,
				productId: item.productId.id,
			})),
			discountId: discountVoucher,
		});
		if (res.data) {
			dispatch(
				addNotification({
					title: "Thành công",
					description:
						res?.error?.data?.message || "Đơn hàng đã được tạo thành công",
					status: Status.Success,
				})
			);
			handleClose(true);
		} else {
			dispatch(
				addNotification({
					title: res?.error?.message || "Thất bại",
					description: res?.error?.data?.message || "Có lỗi xảy ra",
					status: Status.Danger,
				})
			);
		}
	};
	return (
		<PopUp isOpen={isOpen} onClose={handleClose}>
			<div className="w-full flex items-center justify-center">
				{isLoading && <Loading />}
				<div className="w-full py-8">
					<div>
						<h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
							Thanh toán
						</h2>

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
										label="Tên người nhận"
										placeholder="Tên người nhận"
										name="buyerName"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.buyerName}
										helpertext={
											touched.buyerName && errors.buyerName
												? errors.buyerName
												: null
										}
										error={errors.buyerName !== "" && touched.buyerName}
									></Input>
									<Input
										label="Địa chỉ người nhận"
										placeholder="Địa chỉ người nhận"
										name="address"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.address}
										helpertext={
											touched.address && errors.address ? errors.address : null
										}
										error={errors.address !== "" && touched.address}
									></Input>
									<Input
										label="Số điện thoại người nhận"
										placeholder="Số điện thoại người nhận"
										name="phoneNumber"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.phoneNumber}
										helpertext={
											touched.phoneNumber && errors.phoneNumber
												? errors.phoneNumber
												: null
										}
										error={errors.phoneNumber !== "" && touched.phoneNumber}
									></Input>

									<Input
										label="Ghi chú"
										placeholder="Ghi chú"
										name="note"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.note}
										helpertext={
											touched.note && errors.note ? errors.note : null
										}
										error={errors.note !== "" && touched.note}
									></Input>
									<div className="my-4 flex items-center justify-end space-x-4">
										<button
											type="submit"
											onClick={() => handleSubmit()}
											className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase"
										>
											Thanh toán
										</button>
									</div>
								</>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</PopUp>
	);
}
