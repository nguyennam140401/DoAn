import { RolePermission } from "enum/RoleEnum";

export const listRole = {
	product: {
		name: "Quản lý sản phẩm",
		roles: [
			{
				name: "Thêm, sửa sản phẩm",
				value: RolePermission.PRODUCT.MANAGE_PRODUCT,
			},
			{ name: "Xóa sản phẩm", value: RolePermission.PRODUCT.DELETE_PRODUCT },
			{ name: "Lấy sản phẩm", value: RolePermission.PRODUCT.GET_PRODUCTS },
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
	discount: {
		name: "Quản lý mã giảm giá",
		roles: [{ name: "Tạo mã giảm giá", value: "manage_discount" }],
	},
	post: {
		name: "Quản lý bài viết",
		roles: [{ name: "Quản lý bài viết", value: "manage_post" }],
	},
};
