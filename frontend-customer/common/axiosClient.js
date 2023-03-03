import axios from "axios";
import { API_URL } from "../constant/apiPath";

export const axiosClient = axios.create({
	baseURL: API_URL,
	timeout: 15000,
});
