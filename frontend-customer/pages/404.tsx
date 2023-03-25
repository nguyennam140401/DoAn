import Link from "next/link";
import React from "react";

type Props = {};

const PageNotFound = (props: Props) => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-white py-48">
			<div className="flex flex-col">
				<span className="text-center font-bold my-10 opacity-30">
					<Link href="/" className="text-blue-600">
						Trở về trang chủ
					</Link>
				</span>

				<div className="flex flex-col items-center">
					<div className="text-indigo-500 font-bold text-9xl">404</div>

					<div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
						Trang này hiện không tồn tại
					</div>

					<div className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8"></div>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
