import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

function CustomAlert({ type, message }) {
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
				This is a success message!
			</Alert>
		</Snackbar>
	);
}

export default CustomAlert;
