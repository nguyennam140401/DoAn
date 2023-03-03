import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

const { createContext, useState } = require("react");

export const ConfirmContext = createContext();

const initialConfirm = {
	isOpen: false,
	message: "",
	title: "",
	handleAction: () => {},
};
const ConfirmContextProvider = ({ children }) => {
	const [confirm, setConfirm] = useState(initialConfirm);
	const handleClose = () => {
		setConfirm(initialConfirm);
	};
	const showConfirm = (title, message, action) => {
		setConfirm({
			isOpen: true,
			title: title,
			message: message,
			handleAction: async () => {
				await action();
				handleClose();
			},
		});
	};

	const payload = { showConfirm, handleClose };
	return (
		<ConfirmContext.Provider value={payload}>
			{children}
			<Dialog
				open={confirm.isOpen}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{confirm.title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{confirm.message}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Hủy bỏ</Button>
					<Button onClick={confirm.handleAction} variant="contained" autoFocus>
						Đồng ý
					</Button>
				</DialogActions>
			</Dialog>
		</ConfirmContext.Provider>
	);
};

export default ConfirmContextProvider;
