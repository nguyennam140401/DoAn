import React from "react";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";

type Props = {
	children: any;
};

export default function MainLayout({ children }: Props) {
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
