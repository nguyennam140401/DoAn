import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const DropdownMenu = ({ menuItem }) => {
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<>
			<ListItemButton onClick={handleClick}>
				<ListItemIcon>{menuItem.icon}</ListItemIcon>
				<ListItemText primary={menuItem.name} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{menuItem.views.map((item, idx) => (
						<ListItemButton
							key={idx}
							sx={{ pl: 4 }}
							component={Link}
							to={"/" + menuItem.path + item.path}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.name} />
						</ListItemButton>
					))}
				</List>
			</Collapse>
		</>
	);
};

export default DropdownMenu;
