import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
	AppBar,
	Badge,
	Box,
	Grid,
	IconButton,
	InputBase,
	Paper,
	Toolbar,
} from "@mui/material";
import routes from "routes";
import DropdownMenu from "component/DropdownMenu";
import { Link, Navigate } from "react-router-dom";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { accountActions } from "Redux/Actions";
import { checkRole } from "common";
import * as _ from "lodash";
import { AccountCircle } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
const menuId = "primary-search-account-menu";
const mobileMenuId = "primary-search-account-menu-mobile";
export default function LayoutAdmin({ children }) {
	const dispatch = useDispatch();
	const { currentAccount } = useSelector((state) => state.accountReducer);
	const [redirectDefault, setRedirectDefault] = React.useState("/auth/login");
	let dR = "/auth/login";
	React.useEffect(() => {
		document.addEventListener("wheel", function (event) {
			if (document.activeElement.type === "number") {
				document.activeElement.blur();
			}
		});
		dispatch(accountActions.getCurrentAccount(localStorage.getItem("id")));
	}, [window.location.href]);

	const handleRedirectDefault = (routes) => {
		routes.forEach((prop, key) => {
			const validRole = checkRole(currentAccount, prop);
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
		return Navigate("/auth/login");
	}

	return (
		<>
			<Grid container>
				<Grid item xs={2}>
					<List
						className="m-3"
						sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
						component="nav"
						aria-labelledby="nested-list-subheader"
						subheader={
							<ListSubheader component="div" id="nested-list-subheader">
								Admin Dasboard
							</ListSubheader>
						}
					>
						{routes.map((item, idx) =>
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
							<Box sx={{ display: { xs: "none", md: "flex" } }}>
								<IconButton
									size="large"
									aria-label="show 4 new mails"
									color="inherit"
								>
									<Badge badgeContent={4} color="error">
										<MailIcon />
									</Badge>
								</IconButton>
								<IconButton
									size="large"
									aria-label="show 17 new notifications"
									color="inherit"
								>
									<Badge badgeContent={17} color="error">
										<NotificationsIcon />
									</Badge>
								</IconButton>
								<IconButton
									size="large"
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={() => {}}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
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
		</>
	);
}
