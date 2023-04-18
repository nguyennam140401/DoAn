import type { NextPage } from "next";
import { useEffect } from "react";
import Loading from "../components/Loading";
import ProductItemList from "../components/ProductItemList";
import { ProductItemListModel } from "../features/product/model";
import { useGetProductsQuery } from "../features/product/productSlice";
import { useAppSelector } from "../hooks";
import MainLayout from "../layouts/MainLayout";
import { AppState } from "../store";
import Slider from "react-slick";
import { arrService } from "../common/data";
import { Service } from "../common/model";
const Home: NextPage = () => {
	const { data, error, isLoading } = useGetProductsQuery({});
	const authenReducer = useAppSelector(
		(state: AppState) => state.authenReducer
	);
	const settings = {
		dots: true,
		infinite: true,
		arrow: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<MainLayout>
			<>
				<Slider {...settings}>
					<div className="h-64">
						<img
							className="object-cover h-full w-full"
							title="banner"
							src="/assets/image/banner.png"
						/>
					</div>
					<div className="h-64">
						<img
							className="object-cover h-full w-full"
							title="banner"
							src="/assets/image/banner.png"
						/>
					</div>
					<div className="h-64">
						<img
							className="object-cover h-full w-full"
							title="banner"
							src="/assets/image/banner.png"
						/>
					</div>
					<div className="h-64">
						<img
							className="object-cover h-full w-full"
							title="banner"
							src="/assets/image/banner.png"
						/>
					</div>
					<div className="h-64">
						<img
							className="object-cover h-full w-full"
							title="banner"
							src="/assets/image/banner.png"
						/>
					</div>
					<div className="h-64">
						<img
							className="object-cover h-full w-full"
							title="banner"
							src="/assets/image/banner.png"
						/>
					</div>
				</Slider>
				<div className="my-2">
					<div className="grid grid-cols-1 gap-2 p-6 sm:grid-cols-5">
						{arrService &&
							arrService.map((service: Service, idx: number) => (
								<div className="flex gap-2 items-center" key={idx}>
									<div className="h-12 w-12">
										<img src={service.img} alt={service.title} />
									</div>
									<div className="">
										<p className="font-600">{service.title}</p>
										<p className="">{service.des}</p>
									</div>
								</div>
							))}
					</div>
				</div>
				<section className="py-10 bg-gray-100">
					<div className="grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{data?.results &&
							data.results.map((item: ProductItemListModel, idx: number) => (
								<ProductItemList data={item} key={idx} />
							))}
					</div>
				</section>
			</>
		</MainLayout>
	);
};

export default Home;
