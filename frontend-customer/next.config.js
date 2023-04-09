/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
require("dotenv").config();
module.exports = (phase) => {
	const isDev = phase === PHASE_DEVELOPMENT_SERVER;
	const env = {
		API_URL: process.env.API_URL,
		API_URL_BASE: process.env.API_URL_BASE,
		SECRET_KEY: process.env.SECRET_KEY,
	};

	return {
		env,
		reactStrictMode: true,
		compiler: {
			// Enables the styled-components SWC transform
			styledComponents: true,
		},
	};
};
