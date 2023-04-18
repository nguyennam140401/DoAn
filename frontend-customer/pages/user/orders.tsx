import Image from "next/image";
import { title } from "process";
import React, { useState } from "react";
import { formatPrice } from "../../common/commonFunction";
import { EnumStatusOrder } from "../../common/enum";
import { API_URL_BASE, orderPath } from "../../constant/apiPath";
import { useGetOrderByIdQuery } from "../../features/order/orderApi";
import MainLayout from "../../layouts/MainLayout";
import { OrderModel } from "../../features/order/model";
import { axiosClient } from "../../common/axiosClient";

type Props = {};

const UserOrders = (props: Props) => {
	const [tabActive, setTabActive] = useState(EnumStatusOrder.Pending);
	const { data, isLoading, error, refetch } = useGetOrderByIdQuery({
		status: tabActive,
		populate: "userId,products.productId",
	});
	const listStatusOrder = [
		{ name: "Đang chờ duyệt", index: EnumStatusOrder.Pending },
		{ name: "Đã duyệt", index: EnumStatusOrder.Approved },
		{ name: "Đang giao", index: EnumStatusOrder.Shipping },
		{ name: "Thành công", index: EnumStatusOrder.Success },
		{ name: "Từ chối", index: EnumStatusOrder.Reject },
		{ name: "Đơn hủy", index: EnumStatusOrder.Cancel },
	];
	const updateOrder = (order: OrderModel, status: EnumStatusOrder) => {
		const body = { ...order, status: status };
		axiosClient.patch(orderPath, body).then((res) => {
			console.log(res);
			refetch();
		});
	};
	if (isLoading) return <p>Loading.....</p>;
	return (
		<MainLayout>
			<div className="flex justify-center">
				<ul className="flex mb-3">
					{listStatusOrder.map((item: any, index) => (
						<li
							onClick={() => setTabActive(item.index)}
							key={index}
							className={`px-4 py-2 cursor-pointer border-b-2 ${
								tabActive === item.index && "border-blue-500"
							}`}
						>
							{item.name}
						</li>
					))}
				</ul>
			</div>
			<div className="list-order px-8">
				{data?.results?.length > 0 ? (
					data?.results.map((item: any, idx: number) => (
						<div className="bg-white p-2 mb-4 relative">
							<div className="button-action absolute top-3 right-3">
								{tabActive === EnumStatusOrder.Pending && (
									<span
										className="cursor-pointer"
										title="Hủy đơn hàng"
										onClick={() => updateOrder(item, EnumStatusOrder.Cancel)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 cursor-pointer"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</span>
								)}
								{tabActive === EnumStatusOrder.Shipping && (
									<div className="flex gap-2">
										<span
											className="cursor-pointer"
											onClick={() => updateOrder(item, EnumStatusOrder.Success)}
										>
											Đã nhận được hàng
										</span>
										<span
											className="cursor-pointer"
											onClick={() => updateOrder(item, EnumStatusOrder.Cancel)}
										>
											Trả hàng
										</span>
									</div>
								)}
								{tabActive === EnumStatusOrder.Success && (
									<div className="flex gap-2">
										<span className="cursor-pointer">Đánh giá sản phẩm</span>
									</div>
								)}
								{tabActive === EnumStatusOrder.Approved && (
									<span className="cursor-pointer">
										Người gửi đang chuẩn bị hàng
									</span>
								)}
								{tabActive === EnumStatusOrder.Reject && (
									<span className="cursor-pointer">Liên hệ người bán</span>
								)}
							</div>
							{item.products.map((productDetail: any, i: number) => {
								return (
									<div key={idx} className="product-item mb-4">
										<div className="flex gap-2 mb-2">
											<div className="boxImg">
												<img
													width="150px"
													height="150px"
													alt={productDetail.name}
													src={
														API_URL_BASE +
														"/" +
														productDetail.productId.images[0]
													}
												></img>
											</div>
											<div className="productInfo">
												<p>{productDetail.productId.name}</p>
												<p>x{productDetail.quantity}</p>
												{productDetail.option && (
													<span
														className="cursor-pointer"
														key={idx}
														className={`bg-gray-500 mr-2 px-1 py-0.5 cursor-pointer`}
													>
														{productDetail.option.name}
													</span>
												)}
												<p className="price">
													{formatPrice(
														productDetail.option
															? productDetail.option.price
															: productDetail.productId.price
													)}
												</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					))
				) : (
					<p className="text-center mt-6">Không có dữ liệu</p>
				)}
			</div>
		</MainLayout>
	);
};

export default UserOrders;
