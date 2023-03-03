import "./App.css";
import routes from "routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "page/Login";
import { Provider as StoreProvider } from "react-redux";
import store from "Store";
import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { AlertContext } from "context/AlertContext";
const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	...routes
		.filter((item) => !item.collapse)
		.map((item) => ({
			path: item.path,
			element: item.component,
			icon: item.icon,
		})),
	...routes
		.filter((item) => item.collapse)
		.map((item) =>
			item.views.map((childItem) => ({
				path: item.path + childItem.path,
				element: childItem.component,
				icon: item.icon,
			}))
		)
		.reduce((initial, current) => initial.concat(current), []),
]);
function App() {
	const { alert, handleClose: handleCloseAlert } = useContext(AlertContext);
	return (
		<StoreProvider store={store}>
			<Snackbar
				open={alert.isOpen}
				autoHideDuration={3000}
				onClose={handleCloseAlert}
			>
				<Alert
					onClose={handleCloseAlert}
					severity={alert.status}
					sx={{ width: "100%" }}
				>
					{alert.message}
				</Alert>
			</Snackbar>
			<RouterProvider router={router} />
		</StoreProvider>
	);
}

export default App;
