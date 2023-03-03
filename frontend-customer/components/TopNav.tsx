import Link from "next/link";
import React, { useEffect } from "react";
import { useGetCartByIdQuery } from "../features/cart/cartAPI";
import { useAppSelector } from "../hooks";
import { AppState } from "../store";
import Input from "./Input";

type Props = {};

function TopNav({}: Props) {
	const quantityProductInCart = useAppSelector((state: AppState) =>
		state.cart.reduce((pre, current) => (pre += current.quantity), 0)
	);
	// useEffect(() => {
	// 	//Lấy thông tin giỏ hàng khi lần đầu vào ứng dụng
	// 	const idUser = "12345";
	// 	useGetCartByIdQuery(idUser);
	// }, []);

	const arrItemInNav = [
		{
			name: "Home",
			url: "/",
		},
		{
			name: "Danh mục 1",
			url: "/",
		},
		{
			name: "Danh mục 2",
			url: "/",
		},
		{
			name: "Danh mục 3",
			url: "/",
		},
		{
			name: "About",
			url: "/",
		},
		{
			name: "Liên hệ",
			url: "/",
		},
		{
			name: "Đăng nhập",
			url: "/",
		},
	];
	return (
		<div className="flex justify-between">
			<div className="flex">
				<div className="px-3 py-2 bg-gray-200">Logo</div>
				<form>
					<Input label="" type="search" placeholder="Nhập tìm kiếm" />
				</form>
			</div>
			<ul className="flex gap-2 flex-end justify-end items-end">
				{arrItemInNav.map((item, idx) => {
					return (
						<li key={idx} className="p-3">
							<Link href={item.url}>{item.name}</Link>
						</li>
					);
				})}
			</ul>
			<div className="flex gap-3 items-center">
				<Link href="/cart">
					<div className="relative scale-75 cursor-pointer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-8 w-8 text-gray-600"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
							/>
						</svg>
						<span className="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">
							{quantityProductInCart}
						</span>
					</div>
				</Link>

				<div className="h-10 w-10 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')]">
					<div className="drop-down  w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3">
						<ul>
							<li className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								</span>
								<span> Setting </span>
							</li>
							<li className="px-3  py-3  text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
										/>
									</svg>
								</span>
								<span> Wishlist </span>
							</li>
							<li className="px-3  py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										/>
									</svg>
								</span>
								<span> Logout </span>
							</li>
						</ul>
					</div>
				</div>
				<div className="sm:hidden cursor-pointer" id="mobile-toggle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							className="dark:stroke-white"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}

export default TopNav;
