import type { NextPage } from "next";
import ProductItemList from "../components/ProductItemList";
import { ProductItemListModel } from "../features/product/model";
import { useGetProductsQuery } from "../features/product/productSlice";
import MainLayout from "../layouts/MainLayout";

const Home: NextPage = () => {
	const { data, error, isLoading } = useGetProductsQuery({});
	return (
		<MainLayout>
			<section className="py-10 bg-gray-100">
				<div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{data?.results &&
						data.results.map((item: ProductItemListModel, idx: number) => (
							<ProductItemList data={item} key={idx} />
						))}
				</div>
			</section>
		</MainLayout>
	);
};

export default Home;
