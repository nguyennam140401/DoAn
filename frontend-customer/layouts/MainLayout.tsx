import React, { useEffect } from "react";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import { checkAuthen } from "../features/authen/authenSlice";
import { useAppDispatch } from "../hooks";
import { GetServerSideProps } from "next";
import { axiosClient } from "../common/axiosClient";
import { categoryPath } from "../constant/apiPath";

type Props = {
	children: any;
};

export default function MainLayout({ children }: Props) {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(checkAuthen());
	}, []);

	return (
		<div>
			<TopNav />
			<div className="container mx-auto my-6 py-6">
				<>{children}</>
			</div>
			<Footer />
		</div>
	);
}
