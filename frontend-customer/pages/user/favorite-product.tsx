import React from "react";
import { useGetProductsQuery } from "../../features/product/productSlice";
import ProductItemList from "../../components/ProductItemList";
import { ProductItemListModel } from "../../features/product/model";
import MainLayout from "../../layouts/MainLayout";

type Props = {};

const FavoriteProduct = (props: Props) => {
	const {
		data: dataProduct,
		error: errGetProduct,
		isLoading: loadingProduct,
	} = useGetProductsQuery({});
	return (
		<MainLayout>
			<h3 className="mb-3 font-bold">Danh sách sản phẩm yêu thích</h3>
			<div className="grid max-w-6xl grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{dataProduct?.results &&
					dataProduct.results.map((item: ProductItemListModel, idx: number) => (
						<ProductItemList data={item} key={idx} />
					))}
			</div>
		</MainLayout>
	);
};

export default FavoriteProduct;
