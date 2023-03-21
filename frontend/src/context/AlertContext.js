import StatusColorEnum from "enum/StatusEnum";

const { createContext, useState, useEffect } = require("react");

export const AlertContext = createContext();

const initialAlert = {
	isOpen: false,
	status: StatusColorEnum.Success,
	message: "",
};
const AlertContextProvider = ({ children }) => {
	const [alert, setAlert] = useState(initialAlert);
	useEffect(() => {
		if (alert.isOpen === false) return;
	}, [alert]);
	const handleClose = () => {
		setAlert(initialAlert);
	};
	const showAlert = (status, message) => {
		setAlert({ isOpen: true, status: status, message: message });
	};

	const payload = { showAlert, alert, handleClose };
	return (
		<AlertContext.Provider value={payload}>{children}</AlertContext.Provider>
	);
};

export default AlertContextProvider;
