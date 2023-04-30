import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
	AppBar,
	Box,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	Paper,
	Toolbar,
	Typography,
} from "@mui/material";
import routes from "routes";
import DropdownMenu from "component/DropdownMenu";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { accountActions } from "Redux/Actions";
import { checkRole } from "common";
import * as _ from "lodash";
import { AccountCircle } from "@mui/icons-material";
import MoreIcon from "@mui/icons-material/MoreVert";
import styled from "styled-components";
const menuId = "primary-search-account-menu";
const mobileMenuId = "primary-search-account-menu-mobile";

const Styled = styled.div`
	height: 100vh;
	overflow-y: scroll;
`;
const settings = ["Đăng xuất"];
export default function LayoutAdmin({ children }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentAccount } = useSelector((state) => state.accountReducer);
	const [redirectDefault, setRedirectDefault] = React.useState("/auth/login");
	let dR = "/auth/login";
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	React.useEffect(() => {
		document.addEventListener("wheel", function (event) {
			if (document.activeElement.type === "number") {
				document.activeElement.blur();
			}
		});
		dispatch(
			accountActions.getCurrentAccount(localStorage.getItem("id"), "", {
				success: (res) => {
					localStorage.setItem("user", JSON.stringify(res.data));
				},
				failed: (err) => console.log("err: " + err),
			})
		);
	}, [window.location.href]);
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		navigate("/login");
		localStorage.clear();
	};
	const handleRedirectDefault = (routes) => {
		routes.forEach((prop, key) => {
			const validRole = checkRole(prop);
			if (prop.redirect || prop.children || !validRole) {
				return null;
			}
			if (dR === "/auth/login" && prop.layout && prop.path) {
				dR = prop.layout + prop.path;
				setRedirectDefault(prop.layout + prop.path);
			}
			if (prop.collapse) {
				handleRedirectDefault(prop.views);
			}
		});
	};

	React.useEffect(() => {
		if (!_.isEmpty(currentAccount)) {
			handleRedirectDefault([...routes]);
		}
	}, [currentAccount]);

	if (
		!localStorage.getItem("token") ||
		localStorage.getItem("token") === "" ||
		!localStorage.getItem("refreshtoken") ||
		localStorage.getItem("refreshtoken") === "" ||
		!localStorage.getItem("id") ||
		localStorage.getItem("id") === ""
	) {
		// setRedirectDefault("/auth/login");
		navigate("/login");
	}
	return (
		<Styled>
			{currentAccount && (
				<Grid container>
					<Grid item xs={2}>
						<List
							className="m-3"
							sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
							component="nav"
							aria-labelledby="nested-list-subheader"
							subheader={
								<ListSubheader component="div" id="nested-list-subheader">
									Quản lý cửa hàng
								</ListSubheader>
							}
						>
							{routes
								.filter((item) => checkRole(item))
								.map((item, idx) =>
									item.collapse ? (
										<DropdownMenu key={idx} menuItem={item}></DropdownMenu>
									) : (
										<ListItemButton key={idx} component={Link} to={item.path}>
											<ListItemIcon>{item.icon}</ListItemIcon>
											<ListItemText primary={item.name} />
										</ListItemButton>
									)
								)}
						</List>
					</Grid>
					<Grid item xs={10} className="flex-1">
						<AppBar position="static">
							<Toolbar>
								<Box sx={{ flexGrow: 1 }} />
								<Box
									sx={{ display: { xs: "none", md: "flex" } }}
									alignItems={"center"}
								>
									<Typography>
										{JSON.parse(localStorage.getItem("user"))?.name}
									</Typography>
									<IconButton
										size="large"
										edge="end"
										aria-label="account of current user"
										aria-controls={menuId}
										aria-haspopup="true"
										onClick={handleOpenUserMenu}
										color="inherit"
									>
										<AccountCircle />
									</IconButton>
									<Menu
										sx={{ mt: "45px" }}
										id="menu-appbar"
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={Boolean(anchorElUser)}
										onClose={handleCloseUserMenu}
									>
										{settings.map((setting) => (
											<MenuItem key={setting} onClick={handleLogout}>
												<Typography textAlign="center">{setting}</Typography>
											</MenuItem>
										))}
									</Menu>
								</Box>

								<Box sx={{ display: { xs: "flex", md: "none" } }}>
									<IconButton
										size="large"
										aria-label="show more"
										aria-controls={mobileMenuId}
										aria-haspopup="true"
										onClick={() => {}}
										color="inherit"
									>
										<MoreIcon />
									</IconButton>
								</Box>
							</Toolbar>
						</AppBar>
						<Paper elevation={0} square="false" sx={{ padding: 2 }}>
							{children}
						</Paper>
					</Grid>
				</Grid>
			)}
		</Styled>
	);
}
