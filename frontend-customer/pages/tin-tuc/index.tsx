import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { axiosClient } from "../../common/axiosClient";
import { API_URL_BASE, postPath } from "../../constant/apiPath";
import { PostModel, ResponseModel } from "../../common/model";
import Link from "next/link";
import { formatDate } from "../../common/commonFunction";

type Props = {
	data: ResponseModel<PostModel>;
};

const Posts = (props: Props) => {
	const { data } = props;
	console.log(data);
	return (
		<MainLayout>
			<section className="bg-white ">
				<div className="container px-6 py-10 mx-auto">
					<div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-1">
						{data.results.length > 0 ? (
							data.results.map((post: PostModel, idx: number) => (
								<div className="lg:flex" key={idx}>
									<img
										className="object-cover w-full h-32 rounded-lg lg:w-64"
										src={API_URL_BASE + "/" + post.image}
										alt=""
									/>

									<div className="flex flex-col justify-between py-6 lg:mx-6">
										<Link
											href={"tin-tuc/" + post.id}
											className="text-xl font-semibold text-gray-800 hover:underline "
										>
											{post.name}
										</Link>

										<span className="text-sm text-gray-500 dark:text-gray-300">
											Ngày cập nhật: {formatDate(post.updatedDate)}
										</span>
									</div>
								</div>
							))
						) : (
							<>Không có bài viết</>
						)}
					</div>
				</div>
			</section>
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	try {
		const result = await axiosClient.get("/" + postPath);
		return {
			props: {
				data: result.data,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			notFound: true,
		};
	}
};
export default Posts;
