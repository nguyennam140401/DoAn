import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import ReviewItem from "../../components/ReviewItem";
import { ProductItemDetailModel, Spec } from "../../features/product/model";
import { ReviewItemList } from "../../features/review/model";
import { axiosClient } from "../../common/axiosClient";
import { API_URL_BASE, productPath, userPath } from "../../constant/apiPath";
import MainLayout from "../../layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useCreateCartMutation } from "../../features/cart/cartAPI";
import { formatPrice } from "../../common/commonFunction";
import { Status } from "../../common/enum";
import { addNotification } from "../../features/application/applicationSlice";
import { setQuantity as setQuantityStore } from "../../features/cart/cartSlice";
import { AppState } from "../../store";
import { axiosNoAuthen } from "../../common/axiosNoAuthen";
type ProductDetailPageProps = {
	product: ProductItemDetailModel;
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
	console.log(product);
	const quantityProductInCart = useAppSelector(
		(state: AppState) => state.cart.quantity
	);

	const [quantity, setQuantity] = useState(1);
	const [optionIndex, setOptionIndex] = useState(0);
	const [isFavorite, setIsFavorite] = useState(false);
	const dispatch = useAppDispatch();
	const [
		saveCart, // This is the mutation trigger
		{ isLoading: isSaveCart }, // This is the destructured mutation result
	] = useCreateCartMutation();
	const handleAddCart = async (data: any) => {
		console.log(data);
		if (product.options.length > 0) {
			data.option = product.options[optionIndex];
		}
		const res: any = await saveCart(data);
		if (res.data) {
			dispatch(
				addNotification({
					title: "Thành công",
					description: "Thêm vào giỏ hàng thành công",
					status: Status.Success,
				})
			);
			dispatch(setQuantityStore(quantityProductInCart + data.quantity));
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
	useEffect(() => {
		const user: string = localStorage.getItem("user") || "";
		if (user) {
			axiosClient
				.post(userPath + "/favorite", {
					productId: product.id,
				})
				.then((res) => {
					setIsFavorite(res.data);
				});
		}
	}, [product]);

	const toggleFavoriteProduct = async () => {
		const user: string = localStorage.getItem("user") || "";
		if (user) {
			const res = await axiosClient.patch(userPath + "/favorite", {
				productId: product.id,
			});
			setIsFavorite(res.data);
		}
	};
	return (
		<MainLayout>
			<div className="mx-32">
				<div className="flex flex-col gap-7 md:flex-row bg-white">
					<div className="w-full md:w-1/3">
						<img
							src={API_URL_BASE + "/" + product.images[0]}
							alt={product.name}
							className="object-cover w-full h-full"
						/>
					</div>
					<div className="w-full md:w-2/3 p-4">
						<h2 className="text-2xl font-bold mb-2">{product.name}</h2>

						{product.options &&
							product.options.length > 0 &&
							product.options.map((item, idx) => (
								<span
									onClick={() => {
										setOptionIndex(idx);
									}}
									key={idx}
									className={`bg-gray-${
										optionIndex === idx ? "500" : "200"
									} mr-2 px-1 py-0.5 cursor-pointer`}
								>
									{item.name}
								</span>
							))}
						<p className="text-gray-700 font-bold my-2 text-2xl price">
							{formatPrice(
								product?.options[optionIndex]?.price || product.price
							)}
						</p>
						<div className="flex items-center mb-4">
							<span className="mr-2">Số lượng:</span>
							<div className="flex mx-2">
								<button
									className="border border-gray-400 w-8 h-8"
									onClick={() => {
										if (quantity == 0) return;
										setQuantity((state) => --state);
									}}
								>
									-
								</button>
								<input
									type="number"
									min={1}
									max={10}
									value={quantity}
									onChange={(e) => setQuantity(parseInt(e.target.value))}
									className="w-20 h-8 px-2 py-1 border border-gray-400 text-gray-700 focus:outline-none focus:border-blue-500"
								/>
								<button
									className="border border-gray-400 w-8 h-8"
									onClick={() => {
										const maxQuantity =
											product.inventory ||
											product.options[optionIndex].inventory;
										if (quantity >= maxQuantity) return;
										setQuantity((state) => ++state);
									}}
								>
									+
								</button>
							</div>
							<p>
								Có sẵn{" "}
								{product.inventory || product.options[optionIndex].inventory}{" "}
								sản phẩm
							</p>
						</div>
						<div className="mb-2">Đã bán: {product.soldQuantity || 0}</div>
						<div className="">
							<button
								className="bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={() => {
									const payload = {
										productId: product.id,
										quantity: quantity,
									};
									handleAddCart(payload);
								}}
							>
								Thêm vào giỏ hàng
							</button>

							{isFavorite ? (
								<svg
									onClick={toggleFavoriteProduct}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="red"
									className="w-6 h-6"
								>
									<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
								</svg>
							) : (
								<svg
									onClick={toggleFavoriteProduct}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
									/>
								</svg>
							)}
						</div>

						<div className="product_spec">
							<p className="my-4 font-bold">Thông số sản phẩm</p>
							{product.specs && product.specs.length > 0 ? (
								product.specs.map((spec: Spec, idx: number) => (
									<div className="flex ml-2">
										<p>
											{spec.name} : {spec.value} {spec.unit}
										</p>
									</div>
								))
							) : (
								<>Chưa có thông tin</>
							)}
						</div>
					</div>
				</div>
				<div className="bg-white mt-8 p-5">
					<div className="text-xl font-bold mb-3">Đánh giá sản phẩm</div>
					<div dangerouslySetInnerHTML={{ __html: product.description }}></div>
				</div>
				<div className="mt-8 bg-white p-5">
					<h2 className="text-lg font-semibold mb-4">
						Đánh giá của khách hàng
					</h2>
					{product.review && product.review.length > 0 ? (
						product.review.map((review: ReviewItemList) => (
							<ReviewItem key={review.id} data={review} />
						))
					) : (
						<>Sản phẩm chưa có đánh giá</>
					)}
				</div>
			</div>
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { params } = context;
	const id = params?.idProduct;
	try {
		const result = await axiosNoAuthen.get("/" + productPath + "/" + id, {
			params: {
				populate: "review.userId",
			},
		});
		return {
			props: {
				product: result.data,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			notFound: true,
		};
	}
};

export default ProductDetailPage;
