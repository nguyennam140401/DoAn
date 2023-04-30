import React, { useEffect, useState } from "react";
import { debounce } from "../../common/refreshToken";
import { API_URL_BASE, discountPath } from "../../constant/apiPath";
import {
	useCreateCartMutation,
	useGetCartQuery,
	useRemoveItemMutation,
} from "../../features/cart/cartAPI";
import { formatDate, formatPrice } from "../../common/commonFunction";
import MainLayout from "../../layouts/MainLayout";
import FormPayment from "../../components/FormPayment";
import { addNotification } from "../../features/application/applicationSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Status, TypeDiscountVoucherEnum } from "../../common/enum";
import { setQuantity } from "../../features/cart/cartSlice";
import { AppState } from "../../store";
import { axiosClient } from "../../common/axiosClient";
import { DiscountVoucher } from "../../common/model";

type Props = {};

export default function Cart({}: Props) {
	const quantityProductInCart = useAppSelector(
		(state: AppState) => state.cart.quantity
	);
	const payload = {
		populate: "productId",
	};
	const { data, error, isLoading } = useGetCartQuery(payload);
	const [
		saveCart, // This is the mutation trigger
		{ isLoading: isSaveCart, isSuccess: isSuccesSave }, // This is the destructured mutation result
	] = useCreateCartMutation();
	const [
		removeCart,
		{ isLoading: isRemovingItemCart, isSuccess: isSuccessDeleteCartItem },
	] = useRemoveItemMutation();
	const [listProductInCart, setListProductInCart] = useState<Array<any>>([]);
	const [listOldProductInCart, setListOldProductInCart] = useState<Array<any>>(
		[]
	);
	const [listDiscount, setlistDiscount] = useState([]);
	const [discountVoucher, setDiscountVoucher] = useState<DiscountVoucher>(null);
	const dispatch = useAppDispatch();
	const [isOpenPayment, setIsOpenPayment] = useState(false);
	const handleRemoveProduct = async (productId: any, optionName: string) => {
		const res: any = await removeCart({ id: productId, optionName });
		if (res.data) {
			dispatch(
				addNotification({
					title: "Thành công",
					description: "Xóa thành công",
					status: Status.Success,
				})
			);
			setListProductInCart((state) =>
				state.filter((item) => {
					if (optionName && item.option)
						return !(
							item.productId.id === productId && item.option.name === optionName
						);
					return item.productId.id !== productId;
				})
			);
		} else {
			dispatch(
				addNotification({
					title: "Thất bại",
					description: res?.error?.data?.message || "Có lỗi xảy ra",
					status: Status.Danger,
				})
			);
		}
	};
	const calcTotalPrice = () => {
		return listProductInCart
			.filter((item) => item.isBuy)
			.reduce(
				(pre, curr) =>
					pre + curr.quantity * (curr?.option?.price || curr?.productId?.price),
				0
			);
	};
	const calcDiscountPrice = () => {
		return !discountVoucher
			? 0
			: discountVoucher.type === TypeDiscountVoucherEnum.Price
			? discountVoucher.amount
			: discountVoucher.amount *
			  0.01 *
			  listProductInCart
					.filter((item) => item.isBuy)
					.reduce(
						(pre, curr) =>
							pre +
							curr.quantity * (curr?.option?.price || curr?.productId?.price),
						0
					);
	};
	useEffect(() => {
		if (data && data.products) {
			setListProductInCart(
				[...data?.products.filter((item) => item.productId != null)] || []
			);
			setListOldProductInCart(
				[...data?.products.filter((item) => item.productId != null)] || []
			);
		}
	}, [data]);
	useEffect(() => {
		let timeOut: any;
		if (data) {
			timeOut = setTimeout(() => {
				var newProductWithQuantity = listProductInCart.find(
					(item) =>
						item.quantity !=
						listOldProductInCart.find((x: any) => x._id == item._id).quantity
				);
				if (newProductWithQuantity) {
					var oldProductWithQuantity = listOldProductInCart.find(
						(x: any) => x.productId.id == newProductWithQuantity.productId.id
					);
					if (oldProductWithQuantity !== -1)
						handleChangeProduct(
							oldProductWithQuantity,
							newProductWithQuantity.quantity,
							newProductWithQuantity.option
						);
				}
			}, 400);
		}

		return () => {
			clearTimeout(timeOut);
		};
	}, [listProductInCart]);

	const handleChangeProduct = async (
		product: any,
		quantity: number,
		option: any
	) => {
		const payload = {
			productId: product.productId.id,
			quantity: quantity - product.quantity,
			option,
		};
		const res = await saveCart(payload);
		if (res.data) {
			const newCart = listProductInCart.map((item) =>
				item.productId != product.productId
					? item
					: { ...product, quantity: quantity }
			);
			setListOldProductInCart(newCart);
			dispatch(
				setQuantity(quantityProductInCart + quantity - product.quantity)
			);
		}
	};
	const handleClose = (isSubmitDone = false) => {
		setIsOpenPayment(false);
		if (isSubmitDone) {
			const newArr = listProductInCart.filter((item) => item.isBuy);
			newArr.map((item) => {
				handleRemoveProduct(item.productId.id, item?.option?.name);
			});
			hanelGetDiscount();
			setDiscountVoucher({});
		}
	};
	const handleOpen = () => {
		if (listProductInCart.filter((item) => item.isBuy).length <= 0) {
			dispatch(
				addNotification({
					title: "Vui lòng chọn sản phẩm muốn thanh toán",
					status: Status.Danger,
				})
			);
			return;
		}
		setIsOpenPayment(true);
	};
	useEffect(() => {
		hanelGetDiscount();
	}, []);
	const hanelGetDiscount = () => {
		axiosClient.get(discountPath + "/discountsInDay").then((res) => {
			setlistDiscount(res.data);
		});
	};

	return (
		<MainLayout>
			<div className="bg-gray-100 pt-20">
				<h1 className="mb-10 text-center text-2xl font-bold">Giỏ hàng</h1>
				<div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
					<div className="rounded-lg md:w-2/3">
						{!isLoading && !error && listProductInCart.length > 0 ? (
							listProductInCart.map((item: any, idx: number) => (
								<div
									key={idx}
									className="gap-3 justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start "
								>
									<input
										type="checkbox"
										className="self-center"
										onClick={(e) => {
											const updatedCartItems = listProductInCart.map(
												(productItem) =>
													productItem._id === item._id
														? {
																...productItem,
																isBuy: e.target.checked,
														  }
														: productItem
											);
											setListProductInCart(updatedCartItems);
										}}
									/>
									<img
										src={API_URL_BASE + "/" + item.productId.images[0]}
										alt="product-image"
										className="w-full rounded-lg sm:w-40"
									/>
									<div className="sm:flex sm:w-full sm:justify-between">
										<div className="mt-5 sm:mt-0">
											<h2 className="text-lg font-bold text-gray-900">
												{item.productId.name}
											</h2>
											{item.option && (
												<span
													key={idx}
													className={`bg-gray-500 mr-2 px-1 py-0.5 cursor-pointer`}
												>
													{item.option.name}
												</span>
											)}
										</div>
										<div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
											<div className="flex items-center border-gray-100">
												<span
													onClick={() => {
														if (item.quantity === 1) return;
														const updatedCartItems = listProductInCart.map(
															(productItem) =>
																productItem._id === item._id
																	? {
																			...productItem,
																			quantity: productItem.quantity - 1,
																	  }
																	: productItem
														);
														setListProductInCart(updatedCartItems);
														//handleUpdateCart(item, item.quantity - 1);
													}}
													className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
												>
													-
												</span>
												<input
													className="h-8 w-16 border bg-white text-center text-xs outline-none"
													type="number"
													value={item.quantity}
													onChange={(e) => {
														const updatedCartItems = listProductInCart.map(
															(productItem) =>
																productItem._id === item._id
																	? {
																			...productItem,
																			quantity: e.target.value,
																	  }
																	: productItem
														);
														setListProductInCart(updatedCartItems);
													}}
													name="quantity"
													min="1"
												/>
												<span
													onClick={() => {
														const updatedCartItems = listProductInCart.map(
															(productItem) =>
																productItem._id === item._id
																	? {
																			...productItem,
																			quantity:
																				parseInt(productItem.quantity) + 1,
																	  }
																	: productItem
														);
														setListProductInCart(updatedCartItems);
													}}
													className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
												>
													+
												</span>
											</div>
											<div className="flex items-center space-x-4">
												<p className="text-sm">
													{formatPrice(
														(item?.productId?.price || item?.option?.price) *
															item.quantity
													)}{" "}
													VND
												</p>
												<svg
													onClick={() => {
														handleRemoveProduct(
															item.productId.id,
															item?.option?.name
														);
													}}
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<></>
						)}
					</div>
					<div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
						<div className="mb-2 flex justify-between">
							<p className="text-gray-700">Tổng tiền</p>
							<p className="text-gray-700">{formatPrice(calcTotalPrice())}</p>
						</div>
						<div className="flex justify-between">
							<p className="text-gray-700">Giảm giá</p>
							<p className="text-gray-700">
								{formatPrice(calcDiscountPrice())}
							</p>
						</div>
						<hr className="my-4" />
						<div className="flex justify-between">
							<p className="text-lg font-bold">Tổng thanh toán</p>
							<div className="">
								<p className="mb-1 text-lg font-bold">
									{formatPrice(calcTotalPrice() - calcDiscountPrice())} VND
								</p>
								<p className="text-sm text-gray-700">(Đã bao gồm thuế VAT)</p>
							</div>
						</div>
						<hr className="my-4" />
						<div className="">
							<p>Các mã giảm giá đang có</p>
							<div className="overflow-y-auto h-52">
								{listDiscount.map((item: DiscountVoucher, idx: number) => (
									<>
										<div
											className="flex justify-between items-center"
											key={idx}
										>
											<input
												type="radio"
												name="discount"
												disabled={!listProductInCart.some((item) => item.isBuy)}
												onClick={() => {
													setDiscountVoucher(item);
												}}
											/>
											<div style={{ flex: 1 }} className="mx-2">
												<p>{item.name}</p>
												<p>Hết hạn : {formatDate(item.endDate)}</p>
											</div>
											<div className="w-28">
												<p>
													Giá trị : {item.amount}
													{item.type === TypeDiscountVoucherEnum.Percent
														? "%"
														: "đ"}
												</p>
												<p>Còn lại: {item.quantity}</p>
											</div>
										</div>
										<hr className="mx-2" />
									</>
								))}
							</div>
						</div>
						<button
							onClick={handleOpen}
							className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
						>
							Thanh toán
						</button>
					</div>
				</div>
				{isOpenPayment && (
					<FormPayment
						isOpen={isOpenPayment}
						listProduct={listProductInCart.filter((item) => item.isBuy)}
						handleClose={handleClose}
						discountVoucher={discountVoucher?.id}
					/>
				)}
			</div>
		</MainLayout>
	);
}
