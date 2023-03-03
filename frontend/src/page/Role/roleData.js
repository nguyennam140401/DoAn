export const listRole = {
	product: {
		name: "Quản lý sản phẩm",
		roles: [
			{ name: "Thêm, sửa sản phẩm", value: "manage_product" },
			{ name: "Xóa sản phẩm", value: "delete_product" },
			{ name: "Lấy sản phẩm", value: "get_product" },
		],
	},
	category: {
		name: "Quản lý danh mục",
		roles: [
			{ name: "Thêm, sửa danh mục", value: "manage_category" },
			{ name: "Xóa danh mục", value: "delete_category" },
			{ name: "Lấy danh mục", value: "get_category" },
		],
	},
	user: {
		name: "Quản lý người dùng",
		roles: [
			{ name: "Thêm, sửa người dùng", value: "manage_user" },
			{ name: "Xóa người dùng", value: "delete_user" },
			{ name: "Lấy người dùng", value: "get_user" },
		],
	},
	order: {
		name: "Quản lý đơn hàng",
		roles: [{ name: "Quản lý đơn hàng", value: "manage_order" }],
	},
};
