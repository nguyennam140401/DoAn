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
import FormReviewProduct from "../../components/FormReviewProduct";
import { ProductItemDetailModel } from "../../features/product/model";

type Props = {};

const UserOrders = (props: Props) => {
	const [tabActive, setTabActive] = useState(EnumStatusOrder.Pending);
	const { data, isLoading, error, refetch } = useGetOrderByIdQuery({
		status: tabActive,
		populate: "userId,products.productId",
	});
	const [isOpenFormReview, setIsOpenFormReview] = useState(false);
	const [currentProductReview, setCurrentProductReview] =
		useState<ProductItemDetailModel>(null);
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
	const calcTotalPrice = (products: any) => {
		return products.reduce(
			(pre, curr) =>
				pre + curr.quantity * (curr?.option?.price || curr?.productId?.price),
			0
		);
	};
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
						<div className="bg-white mb-4 relative">
							<div className="flex p-3 justify-between bg-gray-400">
								<div>Người nhận: {item.buyerName} </div>
								<div>SĐT người nhận: {item.phoneNumber} </div>
								<div className="mr-9">
									Giá trị đơn hàng : {calcTotalPrice(item.products)}
								</div>
							</div>
							<div className="button-action absolute top-14 right-3">
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
											className="cursor-pointer bg-blue-400 p-2"
											onClick={() => updateOrder(item, EnumStatusOrder.Success)}
										>
											Đã nhận được hàng
										</span>
										<span
											className="cursor-pointer bg-red-400 p-2"
											onClick={() => updateOrder(item, EnumStatusOrder.Cancel)}
										>
											Trả hàng
										</span>
									</div>
								)}

								{tabActive === EnumStatusOrder.Approved && (
									<span className="cursor-pointer bg-green-400 p-2">
										Người gửi đang chuẩn bị hàng
									</span>
								)}
								{tabActive === EnumStatusOrder.Reject && (
									<span className="cursor-pointer">Liên hệ người bán</span>
								)}
							</div>
							{item.products.map((productDetail: any, i: number) => {
								return (
									<div key={idx} className="product-item mb-4 p-3">
										<div className="flex justify-between">
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
															key={idx}
															className={`bg-gray-400 mr-2 px-1 py-0.5 cursor-pointer`}
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
											{tabActive === EnumStatusOrder.Success && (
												<div className="flex gap-2">
													<span
														className="cursor-pointer"
														onClick={() => {
															setIsOpenFormReview(true);
															setCurrentProductReview(productDetail.productId);
														}}
													>
														Đánh giá sản phẩm
													</span>
												</div>
											)}
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
			{isOpenFormReview && (
				<FormReviewProduct
					productData={currentProductReview}
					isOpen={isOpenFormReview}
					handleClose={() => {
						setIsOpenFormReview(false);
					}}
				></FormReviewProduct>
			)}
		</MainLayout>
	);
};

export default UserOrders;
