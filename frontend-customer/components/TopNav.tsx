import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AppState } from "../store";
import Input from "./Input";
import { useRouter } from "next/router";
import { logoutSuccess } from "../features/authen/authenSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
type Props = {};
const Style = styled.div`
	.avatar {
		position: relative;
		.avatar-options {
			display: none;
		}
		&:hover {
			.avatar-options {
				display: block;
			}
		}
		&::before {
			content: "";
			width: 100%;
			height: 10px;
			background-color: transparent;
			position: absolute;
			left: 0;
			top: 100%;
		}
	}
`;
function TopNav({}: Props) {
	const quantityProductInCart = useAppSelector((state: AppState) =>
		state.cart.reduce((pre, current) => (pre += current.quantity), 0)
	);
	const authenReducer = useAppSelector(
		(state: AppState) => state.authenReducer
	);
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
	];
	const arrMenuAuthen = [
		{
			name: "Order",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
					/>
				</svg>
			),
			handle: () => {
				router.push("/user/orders");
			},
		},

		{
			name: "Wishlist",
			icon: (
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
			),
			handle: () => {
				router.push("/user/wishlist");
			},
		},
		{
			name: "Logout",
			icon: (
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
			),
			handle: () => {
				handleLogout();
			},
		},
	];
	const dispatch = useAppDispatch();
	const router = useRouter();
	const handleLogout = () => {
		dispatch(logoutSuccess());
		router.push("/");
	};
	return (
		<Style className="px-4 flex justify-between">
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

				{authenReducer.isLoggedIn ? (
					<div className="h-10 avatar w-10 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')]">
						<div className="avatar-options drop-down w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-1">
							<ul>
								{arrMenuAuthen.map((item, idx) => (
									<li
										onClick={item.handle}
										key={idx}
										className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400"
									>
										{item.icon}

										<span>{item.name}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				) : (
					<Link href="/authen/SignIn">Đăng nhập</Link>
				)}

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
		</Style>
	);
}

export default TopNav;
