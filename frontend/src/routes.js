import SendIcon from "@mui/icons-material/Send";
import Account from "page/Account";
import Brand from "page/Brand";
import Category from "page/Category";
import Dashboard from "page/Dashboard";
import Order from "page/Order";
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
				path: "/child2",
				name: "Child 2 nè",
				icon: <SendIcon />,
				component: () => <p>Child 2 nè</p>,
			},
			{
				path: "/child3",
				name: "Child 3 nè",
				component: () => <p>Child 3 nè</p>,
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
