import React, { ReactNode, useState } from "react";
import { useGetBrandsQuery } from "../../features/brand/brandAPI";
import { useGetProductsQuery } from "../../features/product/productSlice";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import * as queryString from "querystring";
interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	const {
		data: dataBrand,
		error: errorBrand,
		isLoading: loadingBrand,
	} = useGetBrandsQuery({});
	const router = useRouter();
	const listPriceOptions = [
		{ min: 0, max: 1000000 },
		{ min: 1000000, max: 5000000 },
		{ min: 6000000, max: 10000000 },
		{ min: 11000000, max: 20000000 },
		{ min: 0, max: 1000000 },
	];
	const addParamBrand = (brand: any) => {
		const currentPath = router.asPath;
		const query: any = queryString.parse(currentPath.split("?")[1]);
		if (query.brand != brand.id) query.brand = brand.id;
		else {
			delete query.brand;
		}
		router.push(currentPath.split("?")[0] + "?" + queryString.stringify(query));
	};
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
											checked={brand.id === router.query.brand}
											value={brand.id}
											type="checkbox"
											className="appearance-none checked:bg-blue-500 "
											onChange={() => {
												addParamBrand(brand);
											}}
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
				{children}
			</div>
			<div className="mt-5 flex justify-center mx-auto">
				<ul className="flex">
					<li>
						<a
							href="#"
							className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							Previous
						</a>
					</li>
					<li>
						<a
							href="#"
							className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							1
						</a>
					</li>
					<li>
						<a
							href="#"
							className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							2
						</a>
					</li>
					<li>
						<a
							href="#"
							aria-current="page"
							className="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
						>
							3
						</a>
					</li>
					<li>
						<a
							href="#"
							className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							4
						</a>
					</li>
					<li>
						<a
							href="#"
							className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							5
						</a>
					</li>
					<li>
						<a
							href="#"
							className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							Next
						</a>
					</li>
				</ul>
			</div>
		</MainLayout>
	);
}
