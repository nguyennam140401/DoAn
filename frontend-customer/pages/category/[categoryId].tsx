import React, { useState } from "react";
import { Product, ProductItemListModel } from "../../features/product/model";
import { useGetBrandsQuery } from "../../features/brand/brandAPI";
import { useGetProductsQuery } from "../../features/product/productSlice";
import Layout from "./layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { axiosClient } from "../../common/axiosClient";
import { productPath } from "../../constant/apiPath";
import { ResponseModel } from "../../common/model";
import ProductItemList from "../../components/ProductItemList";
import { useRouter } from "next/router";

interface ProductListProps {
	data: ResponseModel<Product>;
}

export default function CategoryProduct({ data }: ProductListProps) {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	return (
		<Layout>
			<div className="md:col-span-9">
				{data.results.length > 0 ? (
					<div className="grid max-w-6xl grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{data.results.map((item: ProductItemListModel, idx: number) => (
							<ProductItemList data={item} key={idx} />
						))}
					</div>
				) : (
					<p className="text-center">Không có sản phẩm</p>
				)}
			</div>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { query } = context;
	const { categoryId, brand } = query;
	try {
		const payload = {
			limit: 10,
			page: 1,
			category: categoryId,
			brand: brand,
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
