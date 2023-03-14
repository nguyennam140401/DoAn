import React, { useEffect, useState } from "react";
import { debounce } from "../../common/refreshToken";
import { API_URL_BASE } from "../../constant/apiPath";
import {
	useCreateCartMutation,
	useGetCartQuery,
	useRemoveItemQuery,
} from "../../features/cart/cartAPI";
import { formatPrice } from "../../common/commonFunction";
import MainLayout from "../../layouts/MainLayout";

type Props = {};

export default function Cart({}: Props) {
	const { data, error, isLoading } = useGetCartQuery();
	const [
		saveCart, // This is the mutation trigger
		{ isLoading: isSaveCart, isSuccess: isSuccesSave }, // This is the destructured mutation result
	] = useCreateCartMutation();
	const [listProductInCart, setListProductInCart] = useState([]);
	const handleRemoveProduct = async (productId) => {
		const res = await handleRemove(productId);
	};
	useEffect(() => {
		setListProductInCart(data?.products || []);
	}, [data]);

	const handleChangeProduct = async (product: any, quantity: number) => {
		const payload = {
			productId: product.productId.id,
			quantity: quantity - product.quantity,
		};
		const res = await saveCart(payload);
		if (isSuccesSave) {
		}
	};
	return (
		<MainLayout>
			<div className="h-screen bg-gray-100 pt-20">
				<h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
				<div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
					<div className="rounded-lg md:w-2/3">
						{!isLoading && !error && listProductInCart.length > 0 ? (
							listProductInCart.map((item: any, idx: number) => (
								<div
									key={idx}
									className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
								>
									<img
										src={API_URL_BASE + "/" + item.productId.images[0]}
										alt="product-image"
										className="w-full rounded-lg sm:w-40"
									/>
									<div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
										<div className="mt-5 sm:mt-0">
											<h2 className="text-lg font-bold text-gray-900">
												{item.productId.name}
											</h2>
											<p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
										</div>
										<div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
											<div className="flex items-center border-gray-100">
												<span
													onClick={() => {
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
														//handleChangeProduct(item, item.quantity - 1);
													}}
													className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
												>
													-
												</span>
												<input
													className="h-8 w-16 border bg-white text-center text-xs outline-none"
													type="number"
													value={item.quantity}
													onChange={debounce((e) => {
														handleChangeProduct(item, e.target.value);
													}, 500)}
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
																			quantity: productItem.quantity + 1,
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
													{formatPrice(item.productId.price * item.quantity)}{" "}
													VND
												</p>
												<svg
													onClick={() => {
														handleRemoveProduct(item.productId.id);
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
							<p className="text-gray-700">
								{formatPrice(
									listProductInCart.reduce(
										(pre, curr) => pre + curr.quantity * curr.productId.price,
										0
									)
								)}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-gray-700">Giảm giá</p>
							<p className="text-gray-700">{formatPrice(0)}</p>
						</div>
						<hr className="my-4" />
						<div className="flex justify-between">
							<p className="text-lg font-bold">Tổng thanh toán</p>
							<div className="">
								<p className="mb-1 text-lg font-bold">
									{formatPrice(
										listProductInCart.reduce(
											(pre, curr) => pre + curr.quantity * curr.productId.price,
											0
										)
									)}{" "}
									VND
								</p>
								<p className="text-sm text-gray-700">(Đã bao gồm thuế VAT)</p>
							</div>
						</div>
						<button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
							Thanh toán
						</button>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
