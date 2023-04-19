import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import ReviewItem from "../../components/ReviewItem";
import { reviews } from "../../configData/reviews";
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
		axiosClient
			.post(userPath + "/favorite", {
				productId: product.id,
			})
			.then((res) => {
				setIsFavorite(res.data);
			});
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
			<div className="mx-12">
				<div className="flex flex-col md:flex-row">
					<div className="w-full md:w-1/2">
						<img
							src={API_URL_BASE + "/" + product.images[0]}
							alt={product.name}
							className="object-cover w-full h-full"
						/>
					</div>
					<div className="w-full md:w-1/2 p-4">
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
									onClick={() => setQuantity((state) => --state)}
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
									onClick={() => setQuantity((state) => ++state)}
								>
									+
								</button>
							</div>
							{/* <p>
							Có sẵn{" "}
							{product.inventory || product.options[optionIndex].inventory} sản
							phẩm
						</p> */}
						</div>
						<div className="">
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
							<button
								className={`${
									isFavorite ? "bg-red-500" : "bg-gray-500"
								} hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4`}
								onClick={toggleFavoriteProduct}
							>
								{isFavorite ? "Remove from favorites" : "Add to favorites"}
							</button>
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
				<div dangerouslySetInnerHTML={{ __html: product.description }}></div>
				<div className="mt-8">
					<h2 className="text-lg font-semibold mb-4">
						Đánh giá của khách hàng
					</h2>
					{reviews.map((review: ReviewItemList) => (
						<ReviewItem key={review.id} data={review} />
					))}
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
		const result = await axiosClient.get("/" + productPath + "/" + id);
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
