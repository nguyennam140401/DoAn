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
		<div>
			<TopNav />
			<div className="container mx-auto py-6 px-4">
				<>{children}</>
			</div>
			<Footer />
		</div>
	);
}
