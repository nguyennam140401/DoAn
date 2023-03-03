import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../features/product/model";

interface ProductListProps {
	products: Product[];
}

export default function FilterProductsLayout({ products }: ProductListProps) {
	const [minPrice, setMinPrice] = useState<number>();
	const [maxPrice, setMaxPrice] = useState<number>();
	const [searchText, setSearchText] = useState<string>("");

	const filteredProducts = products.filter((product) => {
		return (
			(minPrice === undefined || product.price >= minPrice) &&
			(maxPrice === undefined || product.price <= maxPrice) &&
			(searchText === "" ||
				product.name.toLowerCase().includes(searchText.toLowerCase()))
		);
	});

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex items-center justify-between mb-4">
				<div className="flex-grow">
					<label htmlFor="search" className="sr-only">
						Tìm kiếm sản phẩm
					</label>
					<div className="relative rounded-md shadow-sm">
						<input
							type="text"
							name="search"
							id="search"
							className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
							placeholder="Tìm kiếm sản phẩm"
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg
								className="h-5 w-5 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M8.25 1.5a6.75 6.75 0 015.306 10.979l4.58 4.58a1.25 1.25 0 01-1.768 1.768l-4.58-4.58A6.75 6.75 0 118.25 1.5zm0 3a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>
				</div>
				<div className="ml-4">
					<label htmlFor="price" className="sr-only">
						Lọc theo giá
					</label>
					<select
						id="price"
						name="price"
						className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
						value={maxPrice}
						onChange={(e) => setMaxPrice(parseInt(e.target.value))}
					>
						<option value="">Tất cả giá</option>
						<option value="100">Dưới 100đ</option>
						<option value="250"> Dưới 250đ</option>
						<option value="500">Dưới 500đ</option>
						<option value="1000">Dưới 1000đ</option>
					</select>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{filteredProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
