import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../features/product/productSlice";
import ProductItemList from "../../components/ProductItemList";
import { ProductItemListModel } from "../../features/product/model";
import MainLayout from "../../layouts/MainLayout";
import { axiosClient } from "../../common/axiosClient";
import { authenPath, userPath } from "../../constant/apiPath";

type Props = {};

const FavoriteProduct = (props: Props) => {
	const [dataProduct, setDataProduct] = useState([]);
	useEffect(() => {
		const handle = async () => {
			const res = await axiosClient.get(userPath + "/favorite");
			if (res) {
				console.log(res.status == 200);
				setDataProduct(res.data);
			}
		};
		handle();
	}, []);

	return (
		<MainLayout>
			<h3 className="mb-3 font-bold">Danh sách sản phẩm yêu thích</h3>
			<div className="grid max-w-6xl grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{dataProduct &&
					dataProduct.map((item: ProductItemListModel, idx: number) => (
						<ProductItemList data={item} key={idx} />
					))}
			</div>
		</MainLayout>
	);
};

export default FavoriteProduct;
