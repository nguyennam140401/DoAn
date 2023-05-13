import React, { useEffect } from "react";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";
import { checkAuthen } from "../features/authen/authenSlice";
import { useAppDispatch } from "../hooks";

type Props = {
	children: any;
};

export default function MainLayout({ children }: Props) {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(checkAuthen());
	}, []);

	return (
		<div className="bg-gray-100">
			<TopNav />
			<div className="w-full bg-gray-100 px-12 my-6">
				<>{children}</>
			</div>
			<Footer />
		</div>
	);
}
