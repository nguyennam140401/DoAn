import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { axiosClient } from "../../common/axiosClient";
import { postPath } from "../../constant/apiPath";
import { PostModel } from "../../common/model";
import { formatDate } from "../../common/commonFunction";
import MainLayout from "../../layouts/MainLayout";

type Props = {
	post: PostModel;
};

const PostDetail = ({ post }: Props) => {
	return (
		<MainLayout>
			<h1 className="text-3xl">{post.name}</h1>
			<p className="my-2">Cập nhật lúc: {formatDate(post.updatedDate)}</p>
			<div
				className="description mt-3"
				dangerouslySetInnerHTML={{ __html: post.description }}
			></div>
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { params } = context;
	const id = params?.idPost;
	try {
		const result = await axiosClient.get("/" + postPath + "/" + id);
		return {
			props: {
				post: result.data,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			notFound: true,
		};
	}
};

export default PostDetail;
