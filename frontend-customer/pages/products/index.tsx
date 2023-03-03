import React from "react";
import { products } from "../../configData/product";
import FilterProductsLayout from "../../layouts/FilterProductsLayout";

type Props = {};

export default function Products({}: Props) {
	return <FilterProductsLayout products={products}></FilterProductsLayout>;
}
