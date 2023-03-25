import { Box, IconButton } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import BlockIcon from "@mui/icons-material/Block";
const ListActionButtonInTable = ({
	data,
	viewAction,
	editAction,
	removeAction,
	confirmAction,
	rejectAction,
}) => {
	return (
		<Box>
			{viewAction && (
				<IconButton onClick={() => viewAction(data)} title="Xem">
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
			{confirmAction && (
				<IconButton onClick={() => confirmAction(data)}>
					<DoneIcon />
				</IconButton>
			)}
			{rejectAction && (
				<IconButton onClick={() => rejectAction(data)} title="Từ chối">
					<BlockIcon />
				</IconButton>
			)}
		</Box>
	);
};

export default ListActionButtonInTable;
