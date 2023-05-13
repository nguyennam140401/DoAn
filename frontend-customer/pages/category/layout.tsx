import React, { ReactNode, useEffect, useState } from "react";
import { useGetBrandsQuery } from "../../features/brand/brandAPI";
import { useGetProductsQuery } from "../../features/product/productSlice";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import * as queryString from "querystring";
import styled from "styled-components";
import Slider from "rc-slider";

interface Props {
	children: ReactNode;
}
const Styled = styled.div`
	.price-filter {
		position: relative;
		.price-child {
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			z-index: 1000;
			display: none;
			color: black !important;
		}
		:hover {
			.price-child {
				display: block;
			}
		}
	}
`;
export default function Layout({ children }: Props) {
	const {
		data: dataBrand,
		error: errorBrand,
		isLoading: loadingBrand,
	} = useGetBrandsQuery({});

	const router = useRouter();
	const currentPage = router.query.page || 1;
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(3000000);

	const addParamBrand = (brand: any) => {
		const currentPath = router.asPath;
		const query: any = queryString.parse(currentPath.split("?")[1]);
		if (query.brand != brand.id) query.brand = brand.id;
		else {
			delete query.brand;
		}
		router.push(currentPath.split("?")[0] + "?" + queryString.stringify(query));
	};
	const addOrder = (item: any) => {
		const currentPath = router.asPath;
		const query: any = queryString.parse(currentPath.split("?")[1]);
		query.sortBy = item;
		router.push(currentPath.split("?")[0] + "?" + queryString.stringify(query));
	};
	const handleFilterPrice = (isClear = false) => {
		const currentPath = router.asPath;
		const query: any = queryString.parse(currentPath.split("?")[1]);
		query.range = minPrice + "_" + maxPrice;
		if (isClear) {
			router.push(currentPath.split("?")[0]);
			return;
		}
		router.push(currentPath.split("?")[0] + "?" + queryString.stringify(query));
	};
	return (
		<MainLayout>
			<Styled className="grid grid-cols-12 gap-4">
				<div className="md:col-span-3">
					<div className="bg-white rounded-md px-5 py-2">
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
											id={brand.id}
											type="checkbox"
											className=""
											onChange={() => {
												addParamBrand(brand);
											}}
										/>
										<label htmlFor={brand.id} key={idx}>
											{brand.name}
										</label>
									</div>
								))}
						</div>
						<div className="filter">
							<p className="mt-2 text-uppercase text-lg text-md pb-2 border-b mb-5">
								Lọc theo giá
							</p>
							{/* 
							<div className="px-5">
								<Slider
									className="my-5"
									range
									allowCross={false}
									defaultValue={[0, 70]}
									onChange={(value) => console.log(value)}
								/>
							</div> */}
							<div className="flex justify-between">
								<input
									value={minPrice}
									onChange={(e) => {
										setMinPrice(parseInt(e.target.value));
									}}
									type="number"
									className="hidden-control w-20 text-xs h-7 border p-1"
								/>
								<input
									value={maxPrice}
									onChange={(e) => {
										setMaxPrice(parseInt(e.target.value));
									}}
									type="text"
									className="hidden-control w-20 text-xs h-7 border p-1"
								/>
							</div>
							<div className="text-center mt-2">
								<button
									className="text-white bg-red-600 rounded px-8 py-1 mr-3 "
									onClick={() => {
										handleFilterPrice(true);
									}}
								>
									Bỏ lọc
								</button>
								<button
									className="text-white bg-blue-600 rounded px-8 py-1 "
									onClick={() => {
										handleFilterPrice();
									}}
								>
									Lọc
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="md:col-span-9">
					<div className="flex py-3 items-center gap-3">
						<p className="uppercase font-bold">Sắp xếp theo</p>
						<div
							className={` cursor-pointer px-2 py-1 ${
								router.query.sortBy?.includes("name")
									? "bg-blue-700 text-white"
									: "bg-white"
							}`}
							onClick={() => {
								addOrder("name");
							}}
						>
							Theo tên
						</div>
						<div
							className={`  cursor-pointer px-2 py-1 w-44 relative price-filter ${
								router.query.sortBy?.includes("price")
									? "bg-blue-700 text-white"
									: "bg-white"
							}`}
						>
							<div className="absolute price-child">
								<div
									className={`bg-white hover:text-blue-600 cursor-pointer px-2 py-1 `}
									onClick={() => {
										addOrder("price:esc");
									}}
								>
									Từ thấp đến cao
								</div>
								<div
									className="bg-white hover:text-blue-600 cursor-pointer px-2 py-1"
									onClick={() => {
										addOrder("price:desc");
									}}
								>
									Từ cao đến thấp
								</div>
							</div>
							{router.query.sortBy?.includes("price") &&
							router.query.sortBy?.includes("desc")
								? "Từ cao đến thấp"
								: router.query.sortBy?.includes("price") &&
								  router.query.sortBy?.includes("esc")
								? "Từ thấp đến cao"
								: "Giá"}
						</div>
					</div>
					{children}
				</div>
			</Styled>
			<div className="mt-5 flex justify-center mx-auto">
				<ul className="flex">
					<li>
						<a
							href="#"
							className="bg-white border border-gray-300 text-gray-500 hover:bg-blue-100 hover:text-blue-700 ml-0 rounded-l-lg leading-tight py-2 px-3 "
						>
							Trước
						</a>
					</li>
					{Array.from({ length: 5 }, (_, idx) => idx + 1).map((item, idx) => (
						<li>
							<a
								key={idx}
								href="#"
								className={`${
									currentPage === idx + 1
										? "bg-blue-400 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
										: "bg-white text-gray-500 hover:bg-blue-100 hover:text-blue-700"
								}  border border-gray-300 leading-tight py-2 px-3 `}
							>
								{item}
							</a>
						</li>
					))}

					<li>
						<a
							href="#"
							className="bg-white border border-gray-300 text-gray-500 hover:bg-blue-100 hover:text-blue-700 rounded-r-lg leading-tight py-2 px-3 "
						>
							Sau
						</a>
					</li>
				</ul>
			</div>
		</MainLayout>
	);
}
