import React from "react";
import { useSelector } from "react-redux";
import LayoutAdmin from "./LayoutAdmin";

const Dashboard = () => {
	const { currentAccount } = useSelector((state) => state.accountReducer);
	return (
		<LayoutAdmin>
			<p>Dashboard</p>
		</LayoutAdmin>
	);
};

export default Dashboard;
