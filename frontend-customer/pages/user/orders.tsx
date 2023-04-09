import Image from "next/image";
import { title } from "process";
import React, { useState } from "react";
import { formatPrice } from "../../common/commonFunction";
import { EnumStatusOrder } from "../../common/enum";
import { API_URL_BASE } from "../../constant/apiPath";
import { useGetOrderByIdQuery } from "../../features/order/orderApi";
import MainLayout from "../../layouts/MainLayout";

type Props = {};

const UserOrders = (props: Props) => {
	const [tabActive, setTabActive] = useState(EnumStatusOrder.Pending);
	const { data, isLoading, error } = useGetOrderByIdQuery({
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
								)}
								{tabActive === EnumStatusOrder.Shipping && (
									<>
										<p>Đã nhận được hàng</p>
										<p>Trả hàng</p>
									</>
								)}
								{tabActive === EnumStatusOrder.Success && <p>iTrả hàng</p>}
								{tabActive === EnumStatusOrder.Approved && (
									<p>Người gửi đang chuẩn bị hàng</p>
								)}
								{tabActive === EnumStatusOrder.Cancel && <p>Đặt mua lại</p>}
								{tabActive === EnumStatusOrder.Reject && (
									<p>Liên hệ người bán</p>
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
														"http://localhost:5000" +
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
