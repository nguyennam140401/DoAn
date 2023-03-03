import React from "react";
import { Product } from "../features/product/model";

type Props = {
	product: Product;
};

export default function ProductCard({ product }: Props) {
	return (
		<div className="bg-white shadow-md rounded-lg overflow-hidden">
			<img
				className="w-full h-64 object-cover"
				src={product.imageUrl}
				alt={product.name}
			/>
			<div className="p-4">
				<h2 className="font-bold text-xl mb-2">{product.name}</h2>
				<p className="text-gray-700 text-base">{product.description}</p>
				<div className="flex justify-between mt-4">
					<span className="font-bold text-gray-700">{`$${product.price}`}</span>
					<button className="px-4 py-2 bg-gray-800 text-white rounded-lg uppercase tracking-wide hover:bg-gray-700">
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
}
