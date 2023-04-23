import SendIcon from "@mui/icons-material/Send";
import Account from "page/Account";
import Brand from "page/Brand";
import Category from "page/Category";
import Dashboard from "page/Dashboard";
import Discount from "page/Discount";
import Order from "page/Order";
import Post from "page/Post";
import Product from "page/Product";
import Role from "page/Role";

const routes = [
	{
		collapse: false,
		name: "Dashboard",
		icon: <SendIcon />,
		path: "/",
		component: <Dashboard />,
	},
	{
		collapse: false,
		name: "Quản lý danh mục",
		icon: <SendIcon />,
		path: "/category",
		component: <Category />,
	},
	{
		collapse: false,
		name: "Quản lý người dùng",
		icon: <SendIcon />,
		path: "/account",
		component: <Account />,
	},
	{
		collapse: false,
		name: "Quản lý sản phẩm",
		icon: <SendIcon />,
		path: "/products",
		component: <Product />,
	},
	{
		collapse: false,
		name: "Quản lý đơn hàng",
		icon: <SendIcon />,
		path: "/orders",
		component: <Order />,
	},
	{
		collapse: false,
		name: "Quản lý phân quyền",
		icon: <SendIcon />,
		path: "/roles",
		component: <Role />,
	},
	{
		collapse: true,
		name: "Quản lý chung",
		icon: <SendIcon />,
		path: "common",
		views: [
			{
				path: "/brand",
				name: "Quản lý nhà sản xuất",
				icon: <SendIcon />,
				component: <Brand />,
			},
			{
				path: "/discount",
				name: "Quản lý phiếu giảm giá",
				icon: <SendIcon />,
				component: <Discount />,
			},
			{
				path: "/post",
				name: "Quản lý bài viết",
				icon: <SendIcon />,
				component: <Post />,
			},
		],
	},
	{
		collapse: false,
		name: "KJhonf child menu",
		icon: <SendIcon />,
		path: "/noChild",
		component: () => <p>No child nhé</p>,
	},
];

export default routes;
