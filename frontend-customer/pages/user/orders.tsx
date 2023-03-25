import React, { useState } from "react";
import { useGetOrderByIdQuery } from "../../features/order/orderApi";
import MainLayout from "../../layouts/MainLayout";

type Props = {};

const UserOrders = (props: Props) => {
	const [tabActive, setTabActive] = useState(0);
	const { data, isLoading, error } = useGetOrderByIdQuery({
		status: tabActive,
	});
	const listStatusOrder = [
		{ name: "Đang chờ duyệt", index: 0 },
		{ name: "Đã duyệt", index: 1 },
		{ name: "Đang giao", index: 2 },
		{ name: "Thành công", index: 3 },
		{ name: "Trả về", index: 4 },
	];
	return (
		<MainLayout>
			<div className="flex justify-center">
				<ul className="flex">
					{listStatusOrder.map((item, index) => (
						<li
							onClick={() => setTabActive(item.index)}
							key={index}
							className={`px-4 py-2 cursor-pointer border-b-2 ${
								tabActive === item.index && "border-blue-500"
							}`}
						>
							{item.name}
						</li>
					))}
				</ul>
				<div className="list-order"></div>
			</div>
		</MainLayout>
	);
};

export default UserOrders;
