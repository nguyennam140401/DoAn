import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState } from "react";
import ReviewItem from "../../components/ReviewItem";
import { reviews } from "../../configData/reviews";
import { ProductItemDetailModel } from "../../features/product/model";
import { ReviewItemList } from "../../features/review/model";
import { axiosClient } from "../../common/axiosClient";
import { API_URL_BASE, productPath } from "../../constant/apiPath";
import MainLayout from "../../layouts/MainLayout";
import { addProduct } from "../../features/cart/cartSlice";
import { ProductCart } from "../../features/cart/modal";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../hooks";

type ProductDetailPageProps = {
	product: ProductItemDetailModel;
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
	const [quantity, setQuantity] = useState(1);
	const [isFavorite, setIsFavorite] = useState(false);
	const [rating, setRating] = useState(0);
	const dispatch = useAppDispatch();
	return (
		<MainLayout>
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
					<p className="text-gray-700 font-bold mb-2">{product.price}</p>
					<div className="flex items-center mb-4">
						<span className="mr-2">Số lượng:</span>
						<div className="flex">
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
					</div>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							console.log(product, quantity);
							const payload: ProductCart = {
								id: product.id,
								name: product.name,
								price: product.price,
								quantity: quantity,
							};
							dispatch(addProduct(payload));
						}}
					>
						Thêm vào giỏ hàng
					</button>
					<button
						className={`${
							isFavorite ? "bg-red-500" : "bg-gray-500"
						} hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4`}
						onClick={() => setIsFavorite(!isFavorite)}
					>
						{isFavorite ? "Remove from favorites" : "Add to favorites"}
					</button>
				</div>
			</div>
			<div dangerouslySetInnerHTML={{ __html: product.description }}></div>
			<div className="mt-8">
				<h2 className="text-lg font-semibold mb-4">Reviews</h2>
				{reviews.map((review: ReviewItemList) => (
					<ReviewItem key={review.id} data={review} />
				))}
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
