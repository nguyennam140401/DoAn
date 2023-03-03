import { Box, IconButton } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const ListActionButtonInTable = ({
	data,
	viewAction,
	editAction,
	removeAction,
}) => {
	return (
		<Box>
			{viewAction && (
				<IconButton onClick={() => viewAction(data)}>
					<RemoveRedEyeIcon />
				</IconButton>
			)}
			{editAction && (
				<IconButton onClick={() => editAction(data)}>
					<EditIcon />
				</IconButton>
			)}
			{removeAction && (
				<IconButton onClick={() => removeAction(data)}>
					<DeleteIcon />
				</IconButton>
			)}
		</Box>
	);
};

export default ListActionButtonInTable;
