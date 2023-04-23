import type { NextPage } from "next";
import { useEffect, useState } from "react";
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
import { axiosClient } from "../common/axiosClient";
import { overviewPath } from "../constant/apiPath";
import Link from "next/link";
const Home: NextPage = () => {
	const authenReducer = useAppSelector(
		(state: AppState) => state.authenReducer
	);
	const [dataOverview, setDataOverview] = useState<any>([]);
	const settings = {
		dots: true,
		infinite: true,
		arrow: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	useEffect(() => {
		axiosClient
			.get(overviewPath + "/overviewUser")
			.then((res) => {
				console.log(res);
				setDataOverview(res.data);
			})
			.catch((err) => setDataOverview([]));
	}, []);

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
					<div className="grid grid-cols-1 gap-2 sm:grid-cols-5 my-6">
						{arrService &&
							arrService.map((service: Service, idx: number) => (
								<div className="flex gap-6 p-3 items-center bg-white" key={idx}>
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
				<div className="category-product">
					{dataOverview.length > 0 &&
						dataOverview
							.filter((item) => item.products.length > 0)
							.map((item, idx) => (
								<div key={idx} className="mb-12">
									<div className="flex justify-between">
										<div className="text-3xl  inline-block mb-6 relative have-hr-center">
											{item.name}
										</div>
										<Link href={"/category/" + item._id}>Xem thêm</Link>
									</div>
									<div className="grid gap-8 max-w-6xl grid-cols-1 gap-6sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
										{item.products &&
											item.products.map(
												(item: ProductItemListModel, idx: number) => (
													<ProductItemList data={item} key={idx} />
												)
											)}
									</div>
								</div>
							))}
				</div>
			</>
		</MainLayout>
	);
};

export default Home;
