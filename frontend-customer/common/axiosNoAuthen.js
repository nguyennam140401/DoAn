import axios from "axios";
import { API_URL } from "../constant/apiPath";

export const axiosNoAuthen = axios.create({
	baseURL: API_URL,
	timeout: 15000,
});

export default {
	axiosNoAuthen,
};
