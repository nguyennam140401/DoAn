import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import Alert from "../components/Alert";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
			<Alert />
		</Provider>
	);
}

export default MyApp;
