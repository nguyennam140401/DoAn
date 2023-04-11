import Link from "next/link";
import React from "react";

type Props = {};

export default function Footer({}: Props) {
	return (
		<footer className="relative bg-blueGray-200 pt-8 pb-6">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap text-left lg:text-left">
					<div className="w-full lg:w-6/12 px-4">
						<h4 className="text-3xl fonat-semibold text-blueGray-700">
							Liên kết với chúng tôi
						</h4>
						<h5 className="text-lg mt-0 mb-2 text-blueGray-600">
							Liên kết tài khoản giúp bạn thuận tiện hơn
						</h5>
						<div className="mt-6 lg:mb-0 mb-6">
							<button
								className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
								type="button"
							>
								<i className="fab fa-twitter"></i>
							</button>
							<button
								className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
								type="button"
							>
								<i className="fab fa-facebook-square"></i>
							</button>
							<button
								className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
								type="button"
							>
								<i className="fab fa-dribbble"></i>
							</button>
							<button
								className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
								type="button"
							>
								<i className="fab fa-github"></i>
							</button>
						</div>
					</div>
					<div className="w-full lg:w-6/12 px-4">
						<div className="flex flex-wrap items-top mb-6">
							<div className="w-full lg:w-4/12 px-4 ml-auto">
								<span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
									Các liên kết
								</span>
								<ul className="list-unstyled">
									<li>
										<a
											className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
											href="#"
										>
											Về chúng tôi
										</a>
									</li>
									<li>
										<a
											className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
											href="#"
										>
											Blog
										</a>
									</li>
									<li>
										<a
											className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
											href="#"
										>
											Github
										</a>
									</li>
								</ul>
							</div>
							<div className="w-full lg:w-4/12 px-4">
								<span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
									Điều khoản và chính sách
								</span>
								<ul className="list-unstyled">
									<li>
										<a
											className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
											href="#"
										>
											Điều khoản 1
										</a>
									</li>
									<li>
										<a
											className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
											href="#"
										>
											Điều khoản 2
										</a>
									</li>
									<li>
										<a
											className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
											href="#"
										>
											Chính sách 1
										</a>
									</li>
									<li>
										<a
											className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
											href="#"
										>
											Chính sách 2
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<hr className="my-6 border-blueGray-300" />
				<div className="flex flex-wrap items-center md:justify-between justify-center">
					<div className="w-full md:w-4/12 px-4 mx-auto text-center">
						<div className="text-sm text-blueGray-500 font-semibold py-1">
							Copyright © <span id="get-current-year">2023 </span>- Nguyễn Văn
							Nam - 2019605470 .
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
