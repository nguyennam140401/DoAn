import React from "react";
import { products } from "../../configData/product";
import Layout from "../category/layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { axiosClient } from "../../common/axiosClient";
import { productPath } from "../../constant/apiPath";
import { ResponseModel } from "../../common/model";
import { ProductItemListModel } from "../../features/product/model";
import ProductItemList from "../../components/ProductItemList";
import { useRouter } from "next/router";

type Props = { data: ResponseModel<ProductItemListModel> };

export default function Products({ data }: Props) {
	const router = useRouter();
	console.log(router.query);
	return (
		<Layout>
			{router.isFallback ? (
				<>Loading....</>
			) : data.results.length > 0 ? (
				<div className="grid max-w-6xl grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{data.results.map((item: ProductItemListModel, idx: number) => (
						<ProductItemList data={item} key={idx} />
					))}
				</div>
			) : (
				<p className="text-center">Không có sản phẩm</p>
			)}
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { query } = context;
	const { categoryId, brand, sortBy, range, name } = query;
	try {
		const payload = {
			limit: 10,
			page: 1,
			category: categoryId,
			brand: brand,
			price: range,
			sortBy: sortBy,
			name: name ? name : null,
		};
		const result = await axiosClient.get("/" + productPath, {
			params: payload,
		});
		return {
			props: {
				data: result.data,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
