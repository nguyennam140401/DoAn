import React, { useState } from "react";
import { Product, ProductItemListModel } from "../features/product/model";
import { useGetProductsQuery } from "../features/product/productSlice";
import ProductItemList from "../components/ProductItemList";
import MainLayout from "./MainLayout";
import { useGetBrandsQuery } from "../features/brand/brandAPI";

interface ProductListProps {
	products: Array<Product>;
}

export default function FilterProductsLayout({ products }: ProductListProps) {
	const {
		data: dataProduct,
		error: errGetProduct,
		isLoading: loadingProduct,
	} = useGetProductsQuery({});
	const {
		data: dataBrand,
		error: errorBrand,
		isLoading: loadingBrand,
	} = useGetBrandsQuery({});

	const listPriceOptions = [
		{ min: 0, max: 1000000 },
		{ min: 1000000, max: 5000000 },
		{ min: 6000000, max: 10000000 },
		{ min: 11000000, max: 20000000 },
		{ min: 0, max: 1000000 },
	];
	return (
		<MainLayout>
			<div className="grid grid-cols-12 gap-4">
				<div className="md:col-span-3">
					<form className="bg-white rounded-md px-5 py-2">
						<div className="border-1 padding-3 mb-2 text-center text-lg">
							Lọc sản phẩm
						</div>
						<div className="filter">
							<p className="text-uppercase text-lg text-md pb-2 border-b">
								Hãng sản xuất
							</p>
							{dataBrand?.results.length > 0 &&
								dataBrand.results.map((brand: any, idx: number) => (
									<div key={idx} className="flex mb-1 items-center gap-3">
										<input
											type="checkbox"
											className="appearance-none checked:bg-blue-500 "
										/>
										<p key={idx}>{brand.name}</p>
									</div>
								))}
						</div>
						<div className="filter">
							<p className="mt-2 text-uppercase text-lg text-md pb-2 border-b">
								Lọc theo giá
							</p>
							{listPriceOptions.map((priceOptions: any, idx: any) => (
								<div key={idx} className="flex mb-1 items-center gap-3">
									<input
										type="checkbox"
										className="appearance-none checked:bg-blue-500 "
									/>
									<p key={idx}>
										{priceOptions.min}-{priceOptions.max}
									</p>
								</div>
							))}
						</div>
					</form>
				</div>
				<div className="md:col-span-9">
					<div className="grid max-w-6xl grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{dataProduct?.results &&
							dataProduct.results.map(
								(item: ProductItemListModel, idx: number) => (
									<ProductItemList data={item} key={idx} />
								)
							)}
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
