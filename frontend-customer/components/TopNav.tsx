import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AppState } from "../store";
import Input from "./Input";
import { useRouter } from "next/router";
import { logoutSuccess } from "../features/authen/authenSlice";
import { useGetCategoriesQuery } from "../features/category/categoryApi";
import { useGetCartQuery } from "../features/cart/cartAPI";
import { setQuantity } from "../features/cart/cartSlice";
type Props = {
	category?: any;
};
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
	.nav-item {
		position: relative;
		::after {
			position: absolute;
			bottom: 0;
			left: 0;
			content: "";
			height: 2px;
			width: 0px;
			background-color: #1950e6;
		}

		.child-menu {
			position: absolute;
			display: none;
			top: 100%;
			left: 0;
			background-color: #fff;
			padding: 20px;
			width: 300px;
			z-index: 10000000;
		}
		:hover {
			.child-menu {
				display: block;
			}
			::after {
				width: 50%;
				transition: 0.2s;
			}
		}
		&.acitve {
			::after {
				width: 50%;
			}
		}
	}
`;
function TopNav(props: Props) {
	const quantityProductInCart = useAppSelector(
		(state: AppState) => state.cart.quantity
	);
	const router = useRouter();
	const [inputSearch, setInputSearch] = useState("");
	const handleFindProduct = (e) => {
		e.preventDefault();
		router.push({ pathname: "/products", query: { name: inputSearch } });
	};
	const {
		data: dataCart,
		error: errCart,
		isLoading: loadingCart,
		isSuccess: successLoadCart,
	} = useGetCartQuery({});
	useEffect(() => {
		if (successLoadCart)
			dispatch(
				setQuantity(
					dataCart?.products?.reduce((pre, curr) => pre + curr.quantity, 0) || 0
				)
			);
	}, [successLoadCart]);

	const {
		data: listCategory,
		error,
		isLoading,
	} = useGetCategoriesQuery({
		populate: "childrentIds.childrentIds.childrentIds",
	});

	const authenReducer = useAppSelector(
		(state: AppState) => state.authenReducer
	);
	const arrItemInNav = listCategory
		? [
				...listCategory?.results?.map((item: any) => ({
					...item,
					url: "/category/" + item.id,
				})),
		  ]
		: [];
	const arrMenuAuthen = [
		{
			name: "Đơn hàng",
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
			name: "Yêu thích",
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
				router.push("/user/favorite-product");
			},
		},
		{
			name: "Đăng xuất",
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
	const handleLogout = () => {
		dispatch(logoutSuccess());
		router.push("/");
	};
	return (
		<Style className="px-4 py-2 flex justify-between bg-white">
			<div className="flex flex-1">
				<Link href="/" className="box-img w-16 h-16">
					<img
						src="/assets/image/logo.jpg"
						alt="Logo"
						className="w-full h-full"
					/>
				</Link>
				<form onSubmit={handleFindProduct}>
					<div className="ml-4">
						<Input
							label=""
							onChange={(e) => {
								setInputSearch(e.target.value);
							}}
							type="search"
							placeholder="Tìm kiếm sản phẩm"
						/>
					</div>
				</form>
			</div>
			<ul className="flex gap-2 flex-end justify-end items-center">
				{arrItemInNav
					.filter((item) => item.level === 0)
					.map((item, idx) => {
						return (
							<li
								key={idx}
								className={`p-3 relative nav-item ${
									router.query.categoryId == item.id ? "active" : ""
								} `}
							>
								<Link href={item.url}>{item.name}</Link>
								{item.childrentIds.length > 0 && (
									<ul className="child-menu">
										{item.childrentIds.map((childMenu: any, i: number) => (
											<li
												className={`nav-item w-max ${
													router.query.categoryId == childMenu.id
														? "active"
														: ""
												}`}
												key={i}
											>
												<Link href={"/category/" + childMenu.id}>
													{childMenu.name}
												</Link>
											</li>
										))}
									</ul>
								)}
							</li>
						);
					})}
				<li className="p-3 nav-item">
					<Link href="/tin-tuc">Bài viết</Link>
				</li>
			</ul>

			<div className="flex gap-3 items-center flex-1 justify-end">
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
						<div className="avatar-options z-50 drop-down w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-1">
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

const NavMenu = (item: any) => {
	return (
		<>
			<li className="p-3 relative">
				<Link href={item.url}>{item.name}</Link>
				{item.childrentIds.length > 0 && (
					<ul>
						{item.childrentIds.map((item: any, idx: number) => (
							<NavMenu item></NavMenu>
						))}
					</ul>
				)}
			</li>
		</>
	);
};
export default TopNav;
